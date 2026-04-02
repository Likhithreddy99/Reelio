package com.reelio.service;

import com.reelio.dto.CinematographerDTO;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AiSearchService {

    private final ChatClient chatClient;
    private final CinematographerService cinematographerService;

    public AiSearchService(ChatClient.Builder chatClientBuilder, CinematographerService cinematographerService) {
        this.chatClient = chatClientBuilder.build();
        this.cinematographerService = cinematographerService;
    }

    public List<CinematographerDTO> search(String query) {
        // Fetch all cinematographers (in a real world scenario, you'd feed this to a RAG pipeline)
        List<CinematographerDTO> allCinematographers = cinematographerService.getAllCinematographers();
        
        if(allCinematographers.isEmpty()) {
            return List.of();
        }

        // Create a simple prompt to ask Ollama to filter the list
        StringBuilder promptBuilder = new StringBuilder();
        promptBuilder.append("You are an assistant for a cinematographer booking platform. Given the user's request and a list of available cinematographers, respond ONLY with a comma-separated list of cinematographer IDs that best match the request. Do not include any other text.\n\n");
        promptBuilder.append("User Request: ").append(query).append("\n\n");
        promptBuilder.append("Available Cinematographers (ID - Name - Specialties - City):\n");
        
        for (CinematographerDTO c : allCinematographers) {
            promptBuilder.append(c.getId()).append(" - ")
                         .append(c.getName()).append(" - ")
                         .append(c.getSpecialties() != null ? c.getSpecialties() : "None").append(" - ")
                         .append(c.getCity() != null ? c.getCity() : "Unknown").append("\n");
        }

        try {
            String aiResponse = chatClient.prompt(promptBuilder.toString()).call().content();
            
            // Parse comma-separated IDs
            String[] idStrings = aiResponse.split(",");
            return allCinematographers.stream()
                .filter(c -> {
                    for (String idStr : idStrings) {
                        if (idStr.trim().equals(c.getId().toString())) {
                            return true;
                        }
                    }
                    return false;
                })
                .collect(Collectors.toList());
        } catch (Exception e) {
            // Fallback: Return all if Ollama is not available or fails
            System.err.println("AI Search failed, falling back to simple filter: " + e.getMessage());
            return allCinematographers.stream()
                .filter(c -> (c.getSpecialties() != null && c.getSpecialties().toLowerCase().contains(query.toLowerCase())) || 
                             (c.getCity() != null && c.getCity().toLowerCase().contains(query.toLowerCase())))
                .collect(Collectors.toList());
        }
    }
}
