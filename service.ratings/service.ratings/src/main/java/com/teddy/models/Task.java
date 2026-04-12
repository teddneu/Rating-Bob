package com.teddy.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tasks")
public class Task {
    
    @Id
    private String id;
    
    private String title;
    
    private String description;
    
    private String status; // "pending", "in_progress", "completed"
    
    private Double evaluation; // điểm đánh giá từ 1-5
    
    private Long createdAt;
    
    private Long updatedAt;
}
