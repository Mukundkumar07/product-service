package com.arogya.file.controller;

import com.arogya.file.service.FileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.Map;

@RestController
@RequestMapping("/api/files")
public class FileController {

    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping("/upload/reports")
    public ResponseEntity<?> uploadReport(@RequestParam("file") MultipartFile file) {
        String fileUrl = fileService.uploadFile(file, "reports");
        return ResponseEntity.ok(Map.of("message", "Report uploaded successfully", "fileUrl", fileUrl));
    }

    @PostMapping("/upload/prescriptions")
    public ResponseEntity<?> uploadPrescription(@RequestParam("file") MultipartFile file) {
        String fileUrl = fileService.uploadFile(file, "prescriptions");
        return ResponseEntity.ok(Map.of("message", "Prescription saved successfully", "fileUrl", fileUrl));
    }
}
