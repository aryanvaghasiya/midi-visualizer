
// package com.midivisualizer.controller;

// import com.midivisualizer.model.MidiFile;
// import com.midivisualizer.service.MidiFileService;
// import org.springframework.core.io.FileSystemResource;
// import org.springframework.http.HttpHeaders;
// import org.springframework.http.MediaType;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
// import org.springframework.web.multipart.MultipartFile;

// import java.io.IOException;
// import java.util.List;

// @RestController
// @RequestMapping("/api/midi")
// public class MidiFileController {

//     private final MidiFileService service;

//     public MidiFileController(MidiFileService service) {
//         this.service = service;
//     }

//     @PostMapping("/upload")
//     public MidiFile upload(@RequestParam("file") MultipartFile file) throws IOException {
//         return service.saveFile(file);
//     }

//     @GetMapping("/files")
//     public List<MidiFile> listFiles() {
//         return service.listFiles();
//     }

//     @GetMapping("/files/{id}")
//     public ResponseEntity<MidiFile> getFile(@PathVariable Long id) {
//         return service.getFile(id)
//                 .map(ResponseEntity::ok)
//                 .orElse(ResponseEntity.notFound().build());
//     }

//     @GetMapping("/files/{id}/download")
//     public ResponseEntity<FileSystemResource> downloadFile(@PathVariable Long id) {
//         return service.getFile(id).map(file -> {
//             FileSystemResource resource = new FileSystemResource(file.getPath());
//             return ResponseEntity.ok()
//                     .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + file.getFilename())
//                     .contentType(MediaType.parseMediaType(file.getContentType()))
//                     .body(resource);
//         }).orElse(ResponseEntity.notFound().build());
//     }

//     @DeleteMapping("/files/{id}")
//     public ResponseEntity<Void> deleteFile(@PathVariable Long id) {
//         service.deleteFile(id);
//         return ResponseEntity.noContent().build();
//     }

//     @GetMapping("/health")
//     public String healthCheck() {
//         return "Backend is running!";
//     }
// }

//-------------------------above is original before chatGPT edit-------------------------
package com.midivisualizer.controller;

import com.midivisualizer.model.MidiFile;
import com.midivisualizer.service.MidiFileService;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

/**
 * REST controller for managing MIDI file uploads and metadata.
 */
@RestController
@RequestMapping("/api/midi")
public class MidiFileController {

    private final MidiFileService service;

    public MidiFileController(MidiFileService service) {
        this.service = service;
    }

    /**
     * Uploads a MIDI file to the backend.
     * @param file The multipart file to upload.
     * @return The saved MidiFile metadata.
     * @throws IOException If the file cannot be saved.
     */
    @PostMapping("/upload")
    public MidiFile upload(@RequestParam("file") MultipartFile file) throws IOException {
        return service.saveFile(file);
    }

    /**
     * Retrieves a list of all uploaded MIDI files.
     * @return A list of MidiFile objects.
     */
    @GetMapping("/files")
    public List<MidiFile> listFiles() {
        return service.listFiles();
    }

    /**
     * Retrieves metadata for a specific MIDI file by its ID.
     * @param id The ID of the file.
     * @return The MidiFile object if found, otherwise a 404 Not Found response.
     */
    @GetMapping("/files/{id}")
    public ResponseEntity<MidiFile> getFile(@PathVariable Long id) {
        return service.getFile(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Downloads the original MIDI file by its ID.
     * The response body can be either a FileSystemResource or an error.
     * Using ResponseEntity<?> handles both cases gracefully without type errors.
     * @param id The ID of the file to download.
     * @return The file as a downloadable resource, or a 404 Not Found response.
     */
    @GetMapping("/files/{id}/download")
    public ResponseEntity<?> downloadFile(@PathVariable Long id) {
        return service.getFile(id).map(file -> {
            FileSystemResource resource = new FileSystemResource(file.getPath());
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                    .contentType(MediaType.parseMediaType(file.getContentType()))
                    .body(resource);
        }).orElse(ResponseEntity.notFound().build());
    }

    /**
     * Deletes a MIDI file from the system by its ID.
     * @param id The ID of the file to delete.
     * @return A 204 No Content response.
     */
    @DeleteMapping("/files/{id}")
    public ResponseEntity<Void> deleteFile(@PathVariable Long id) {
        service.deleteFile(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * A simple health check endpoint to verify the backend is running.
     * @return A status message.
     */
    @GetMapping("/health")
    public String healthCheck() {
        return "Backend is running!";
    }
}
