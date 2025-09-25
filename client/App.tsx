//
//import React, { useState, useCallback } from 'react';
//import { MidiPlayer } from './pages/MidiPlayer';
//import { FileUpload } from './components/FileUpload';
//import { ParsedMidi } from './types/midi';
//import { parseMidiFile } from './lib/midiParser';
//import { Header } from './components/Header';
//import { Footer } from './components/Footer';
//
//const App: React.FC = () => {
//  const [midiFile, setMidiFile] = useState<ParsedMidi | null>(null);
//  const [error, setError] = useState<string | null>(null);
//  const [isLoading, setIsLoading] = useState<boolean>(false);
//
//  const handleFileAccepted = useCallback(async (file: File) => {
//    setIsLoading(true);
//    setError(null);
//    try {
//      const parsedMidi = await parseMidiFile(file);
//      setMidiFile(parsedMidi);
//    } catch (e) {
//      setError('Failed to parse MIDI file. Please ensure it is a valid .mid or .midi file.');
//      console.error(e);
//    } finally {
//      setIsLoading(false);
//    }
//  }, []);
//  
//  const handleReset = useCallback(() => {
//    setMidiFile(null);
//    setError(null);
//  }, []);
//
//  return (
//    <div className="flex flex-col h-screen bg-gray-900 text-gray-200 font-sans">
//      <Header onReset={midiFile ? handleReset : undefined} />
//      <main className="flex-grow flex flex-col items-center justify-center p-4 overflow-hidden">
//        {!midiFile ? (
//          <FileUpload onFileAccepted={handleFileAccepted} isLoading={isLoading} error={error} />
//        ) : (
//          <MidiPlayer midiData={midiFile} fileName={midiFile.fileName} />
//        )}
//      </main>
//      <Footer />
//    </div>
//  );
//};
//
//export default App;
































// import React, { useState, useCallback } from 'react';
// import { MidiPlayer } from './pages/MidiPlayer';
// import { FileUpload } from './components/FileUpload';
// import { ParsedMidi } from './types/midi';
// import { parseMidiFile } from './lib/midiParser';
// import { Header } from './components/Header';
// import { Footer } from './components/Footer';

// const API_BASE_URL = 'http://localhost:8081/api/midi';

// const App: React.FC = () => {
//   const [midiFile, setMidiFile] = useState<ParsedMidi | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const handleFileAccepted = useCallback(async (file: File) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       // Create a FormData object to send the file to the backend
//       const formData = new FormData();
//       formData.append('file', file);

//       // Make the POST request to the backend's upload endpoint
//       const response = await fetch(`${API_BASE_URL}/upload`, {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to upload file to backend.');
//       }

//       // The backend saves the file and returns its metadata.
//       // Now, parse the MIDI file on the client-side for visualization.
//       const parsedMidi = await parseMidiFile(file);
//       parsedMidi.fileName = file.name; // Use the original file name
//       setMidiFile(parsedMidi);

//     } catch (e) {
//       setError('Failed to upload or parse MIDI file.');
//       console.error(e);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   const handleReset = useCallback(() => {
//     setMidiFile(null);
//     setError(null);
//   }, []);

//   return (
//     <div className="flex flex-col h-screen bg-gray-900 text-gray-200 font-sans">
//       <Header onReset={midiFile ? handleReset : undefined} />
//       <main className="flex-grow flex flex-col items-center justify-center p-4 overflow-hidden">
//         {!midiFile ? (
//           <FileUpload onFileAccepted={handleFileAccepted} isLoading={isLoading} error={error} />
//         ) : (
//           <MidiPlayer midiData={midiFile} fileName={midiFile.fileName} />
//         )}
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default App;



//------------------------------------after chatGPT edit------------------------------------




import React, { useState, useCallback } from 'react';
import { MidiPlayer } from './pages/MidiPlayer';
import { FileUpload } from './components/FileUpload';
import { ParsedMidi } from './types/midi';
import { parseMidiFile } from './lib/midiParser';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const API_BASE_URL = 'http://localhost:8081/api/midi';

const App: React.FC = () => {
  const [midiFile, setMidiFile] = useState<ParsedMidi | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileAccepted = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);

    try {
      // Prepare form data for upload
      const formData = new FormData();
      formData.append('file', file);

      // Upload to backend
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file to backend.');
      }

      // Backend returns file metadata
      const savedMeta = await response.json();

      // Fetch file back from backend (ensures we use stored copy)
      const downloadResp = await fetch(`${API_BASE_URL}/files/${savedMeta.id}/download`);
      if (!downloadResp.ok) {
        throw new Error('Failed to download file from backend.');
      }

      const arrayBuffer = await downloadResp.arrayBuffer();
      const downloadedFile = new File([arrayBuffer], savedMeta.filename, {
        type: savedMeta.contentType || 'audio/midi',
      });

      // Parse MIDI for visualization
      const parsedMidi = await parseMidiFile(downloadedFile);
      parsedMidi.fileName = savedMeta.filename;
      setMidiFile(parsedMidi);

    } catch (e) {
      console.error(e);
      setError('Failed to upload or parse MIDI file.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setMidiFile(null);
    setError(null);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-200 font-sans">
      <Header onReset={midiFile ? handleReset : undefined} />
      <main className="flex-grow flex flex-col items-center justify-center p-4 overflow-hidden">
        {!midiFile ? (
          <FileUpload onFileAccepted={handleFileAccepted} isLoading={isLoading} error={error} />
        ) : (
          <MidiPlayer midiData={midiFile} fileName={midiFile.fileName} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
