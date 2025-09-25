package com.midivisualizer.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class MidiFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String filename;
    private String contentType;
    private long size;
    private String path;
    private LocalDateTime uploadedAt;

    public MidiFile() {}

    public MidiFile(String filename, String contentType, long size, String path) {
        this.filename = filename;
        this.contentType = contentType;
        this.size = size;
        this.path = path;
        this.uploadedAt = LocalDateTime.now();
    }

    // Getters & setters
    public Long getId() { return id; }
    public String getFilename() { return filename; }
    public void setFilename(String filename) { this.filename = filename; }
    public String getContentType() { return contentType; }
    public void setContentType(String contentType) { this.contentType = contentType; }
    public long getSize() { return size; }
    public void setSize(long size) { this.size = size; }
    public String getPath() { return path; }
    public void setPath(String path) { this.path = path; }
    public LocalDateTime getUploadedAt() { return uploadedAt; }
}
