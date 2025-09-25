
// import { ParsedMidi } from '../types/midi';
// declare const Tone: any;

// export const parseMidiFile = (file: File): Promise<ParsedMidi> => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       try {
//         const arrayBuffer = e.target?.result as ArrayBuffer;
//         if (!arrayBuffer) {
//           throw new Error("Could not read file buffer");
//         }
//         const midi = new Tone.Midi(arrayBuffer);
        
//         const duration = midi.duration;

//         const parsedMidi: ParsedMidi = {
//           fileName: file.name,
//           header: {
//               ...midi.header,
//               // Tone.js might not provide all header details in the same structure
//               // so we adapt it. We can add more details if needed.
//               name: midi.header.name || file.name,
//           },
//           tracks: midi.tracks.map((track: any, index: number) => ({
//             ...track,
//             notes: track.notes.map((note: any) => ({
//               ...note,
//               track: index,
//             })),
//           })),
//           duration: duration,
//         };
//         resolve(parsedMidi);
//       } catch (err) {
//         reject(err);
//       }
//     };

//     reader.onerror = (e) => {
//       reject(new Error('Error reading file.'));
//     };

//     reader.readAsArrayBuffer(file);
//   });
// };


//-----------------------------above is original before chatGPT edit----------------------------








import { Midi } from "@tonejs/midi";
import { ParsedMidi } from "../types/midi";

export const parseMidiFile = (file: File): Promise<ParsedMidi> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        if (!arrayBuffer) throw new Error("Could not read file buffer");

        const midi = new Midi(arrayBuffer);

        const parsedMidi: ParsedMidi = {
          fileName: file.name,
          header: {
            name: midi.header.name || file.name,
            tempos: midi.header.tempos,
            timeSignatures: midi.header.timeSignatures,
          },
          tracks: midi.tracks.map((track, index) => ({
            name: track.name,
            instrument: track.instrument,
            notes: track.notes.map((note) => ({
              ...note,
              track: index,
            })),
            channel: track.channel,
          })),
          duration: midi.duration,
        };

        resolve(parsedMidi);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = () => reject(new Error("Error reading file."));
    reader.readAsArrayBuffer(file);
  });
};
