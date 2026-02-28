package com.arogya.ai.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class AIService {

    public Map<String, String> analyzeSymptoms(String symptom) {
        String lowerSymptom = symptom.toLowerCase();
        Map<String, String> result = new HashMap<>();

        if (lowerSymptom.contains("fever") || lowerSymptom.contains("cough")) {
            result.put("specialization", "General Physician");
            result.put("priority", "Medium");
        } else if (lowerSymptom.contains("chest pain") || lowerSymptom.contains("breathless")) {
            result.put("specialization", "Cardiologist");
            result.put("priority", "High");
        } else if (lowerSymptom.contains("skin") || lowerSymptom.contains("rash")) {
            result.put("specialization", "Dermatologist");
            result.put("priority", "Low");
        } else {
            result.put("specialization", "General Physician");
            result.put("priority", "Normal");
        }

        result.put("message", "Based on your symptoms, we recommend consulting a " + result.get("specialization"));
        return result;
    }
}
