package com.arogya.ai.controller;

import com.arogya.ai.service.AIService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<Map<String, String>> analyze(@RequestBody Map<String, String> request) {
        String symptom = request.get("symptom");
        return ResponseEntity.ok(aiService.analyzeSymptoms(symptom));
    }
}
