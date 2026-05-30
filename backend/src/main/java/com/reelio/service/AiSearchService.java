package com.reelio.service;

import com.reelio.dto.CinematographerDTO;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AiSearchService {

    private final ChatClient chatClient;
    private final CinematographerService cinematographerService;

    public AiSearchService(ChatClient.Builder chatClientBuilder,
            CinematographerService cinematographerService) {
        this.chatClient = chatClientBuilder.build();
        this.cinematographerService = cinematographerService;
    }

    public List<CinematographerDTO> search(String query) {

        List<CinematographerDTO> allCinematographers = cinematographerService.getAllCinematographers();

        if (allCinematographers.isEmpty()) {
            return new ArrayList<>();
        }

        // -------- STEP 1: Build prompt --------
        StringBuilder prompt = new StringBuilder();

        prompt.append("Return ONLY comma-separated IDs.\n");
        prompt.append("User Request: ").append(query).append("\n\n");

        for (CinematographerDTO c : allCinematographers) {
            prompt.append(c.getId()).append(" - ")
                    .append(c.getName()).append(" - ")
                    .append(c.getSpecialties()).append(" - ")
                    .append(c.getCity()).append("\n");
        }

        // -------- STEP 2: Call AI (may return null or empty) --------
        String aiResponse = null;

        try {
            aiResponse = chatClient.prompt(prompt.toString())
                    .call()
                    .content();
        } catch (Exception ignored) {
            // do nothing (no crash)
        }

        List<CinematographerDTO> result = new ArrayList<>();

        // -------- STEP 3: If AI worked --------
        if (aiResponse != null && !aiResponse.isEmpty()) {

            String[] ids = aiResponse.split(",");

            for (CinematographerDTO c : allCinematographers) {

                for (String id : ids) {

                    if (id.trim().equals(c.getId().toString())) {
                        result.add(c);
                        break;
                    }
                }
            }
        }

        // -------- STEP 4: Fallback if AI failed --------
        if (result.isEmpty()) {

            for (CinematographerDTO c : allCinematographers) {

                boolean matchSpecialty = false;
                boolean matchCity = false;

                if (c.getSpecialties() != null &&
                        c.getSpecialties().toLowerCase().contains(query.toLowerCase())) {
                    matchSpecialty = true;
                }

                if (c.getCity() != null &&
                        c.getCity().toLowerCase().contains(query.toLowerCase())) {
                    matchCity = true;
                }

                if (matchSpecialty || matchCity) {
                    result.add(c);
                }
            }
        }

        // -------- STEP 5: Summarization --------
        if (!result.isEmpty()) {

            StringBuilder summaryPrompt = new StringBuilder();
            summaryPrompt.append("Summarize these cinematographers in 2-3 lines:\n");

            for (CinematographerDTO c : result) {
                summaryPrompt.append(c.getName()).append(" - ")
                        .append(c.getSpecialties()).append(" - ")
                        .append(c.getCity()).append("\n");
            }

            try {
                String summary = chatClient.prompt(summaryPrompt.toString())
                        .call()
                        .content();

                System.out.println("AI Summary: " + summary);

            } catch (Exception ignored) {
                System.out.println("Summary not available.");
            }
        }

        return result;
    }
}