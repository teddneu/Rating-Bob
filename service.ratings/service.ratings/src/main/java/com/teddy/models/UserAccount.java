package com.teddy.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class UserAccount {
    @Id
    private String id;
    private String name;
    private String email;
    private String passwordHash;
    private Long createdAt;
}
