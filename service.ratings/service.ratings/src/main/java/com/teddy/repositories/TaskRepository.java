package com.teddy.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.teddy.models.Task;

@Repository
public interface TaskRepository extends MongoRepository<Task, String> {
    
    /**
     * Tìm tất cả các task theo status
     */
    List<Task> findByStatus(String status);
    
    /**
     * Tìm tất cả các task đã được đánh giá (evaluation != null)
     */
    List<Task> findByEvaluationIsNotNull();
}
