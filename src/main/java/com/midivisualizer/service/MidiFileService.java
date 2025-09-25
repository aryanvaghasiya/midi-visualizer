// package com.midivisualizer.service;

// import com.midivisualizer.model.MidiFile;
// import com.midivisualizer.model.MidiFileRepository;
// import org.apache.commons.io.FilenameUtils;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.stereotype.Service;
// import org.springframework.web.multipart.MultipartFile;

// import java.io.File;
// import java.io.IOException;
// import java.util.List;
// import java.util.Optional;

// @Service
// public class MidiFileService {

//     private final MidiFileRepository repository;

//     @Value("${upload.dir:uploads}")
//     private String uploadDir;

//     public MidiFileService(MidiFileRepository repository) {
//         this.repository = repository;
//     }

//     public MidiFile saveFile(MultipartFile file) throws IOException {
//         File dir = new File(uploadDir);
//         if (!dir.exists()) dir.mkdirs();

//         String filename = System.currentTimeMillis() + "_" + FilenameUtils.getName(file.getOriginalFilename());
//         File destination = new File(dir, filename);
//         file.transferTo(destination);

//         MidiFile midiFile = new MidiFile(
//                 file.getOriginalFilename(),
//                 file.getContentType(),
//                 file.getSize(),
//                 destination.getAbsolutePath()
//         );

//         return repository.save(midiFile);
//     }

//     public List<MidiFile> listFiles() {
//         return repository.findAll();
//     }

//     public Optional<MidiFile> getFile(Long id) {
//         return repository.findById(id);
//     }

//     public void deleteFile(Long id) {
//         repository.findById(id).ifPresent(file -> {
//             new File(file.getPath()).delete();
//             repository.delete(file);
//         });
//     }
// }



// -----------------------------before chatGPT edit----------------------------


package com.midivisualizer.service;

import com.midivisualizer.model.MidiFile;
import com.midivisualizer.model.MidiFileRepository;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class MidiFileService {

    private final MidiFileRepository repository;

    @Value("${upload.dir:uploads}")
    private String uploadDir;

    public MidiFileService(MidiFileRepository repository) {
        this.repository = repository;
    }

    public MidiFile saveFile(MultipartFile file) throws IOException {
        File dir = new File(uploadDir);
        if (!dir.exists() && !dir.mkdirs()) {
            throw new IOException("Unable to create upload directory: " + uploadDir);
        }

        String filename = System.currentTimeMillis() + "_" + FilenameUtils.getName(file.getOriginalFilename());
        File destination = new File(dir, filename);

        // Save file on disk
        file.transferTo(destination);

        // Normalize content type: some browsers upload .mid as application/octet-stream or null
        String contentType = file.getContentType();
        if (contentType == null || contentType.isBlank() || contentType.equals("application/octet-stream")) {
            contentType = "audio/midi";
        }

        MidiFile midiFile = new MidiFile(
                file.getOriginalFilename(),
                contentType,
                file.getSize(),
                destination.getAbsolutePath()
        );

        return repository.save(midiFile);
    }

    public List<MidiFile> listFiles() {
        return repository.findAll();
    }

    public Optional<MidiFile> getFile(Long id) {
        return repository.findById(id);
    }

    public void deleteFile(Long id) {
        repository.findById(id).ifPresent(file -> {
            try {
                new File(file.getPath()).delete();
            } catch (Exception ignored) { }
            repository.delete(file);
        });
    }
}


