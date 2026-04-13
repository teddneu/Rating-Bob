package com.teddy.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.teddy.models.UserAccount;

public interface UserAccountRepository extends MongoRepository<UserAccount, String> {
    Optional<UserAccount> findByEmailIgnoreCase(String email);
}
