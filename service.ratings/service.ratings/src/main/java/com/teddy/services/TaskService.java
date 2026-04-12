package com.teddy.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.teddy.models.Task;
import com.teddy.repositories.TaskRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TaskService {
    
    private final TaskRepository taskRepository;
    
    /**
     * Lấy tất cả các task
     */
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
    
    /**
     * Lấy task theo ID
     */
    public Optional<Task> getTaskById(String id) {
        return taskRepository.findById(id);
    }
    
    /**
     * Tạo mới một task
     */
    public Task createTask(Task task) {
        task.setCreatedAt(System.currentTimeMillis());
        task.setUpdatedAt(System.currentTimeMillis());
        task.setStatus("pending");
        return taskRepository.save(task);
    }
    
    /**
     * Cập nhật task
     */
    public Optional<Task> updateTask(String id, Task updatedTask) {
        return taskRepository.findById(id).map(task -> {
            if (updatedTask.getTitle() != null) {
                task.setTitle(updatedTask.getTitle());
            }
            if (updatedTask.getDescription() != null) {
                task.setDescription(updatedTask.getDescription());
            }
            if (updatedTask.getStatus() != null) {
                task.setStatus(updatedTask.getStatus());
            }
            if (updatedTask.getEvaluation() != null) {
                task.setEvaluation(updatedTask.getEvaluation());
            }
            task.setUpdatedAt(System.currentTimeMillis());
            return taskRepository.save(task);
        });
    }
    
    /**
     * Cập nhật đánh giá cho task
     */
    public Optional<Task> rateTask(String id, Double evaluation) {
        // Kiểm tra điểm đánh giá hợp lệ (1-5)
        if (evaluation < 1 || evaluation > 5) {
            throw new IllegalArgumentException("Điểm đánh giá phải nằm trong khoảng 1-5");
        }
        
        return taskRepository.findById(id).map(task -> {
            task.setEvaluation(evaluation);
            task.setUpdatedAt(System.currentTimeMillis());
            return taskRepository.save(task);
        });
    }
    
    /**
     * Xóa task
     */
    public boolean deleteTask(String id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    /**
     * Lấy tất cả các task theo status
     */
    public List<Task> getTasksByStatus(String status) {
        return taskRepository.findByStatus(status);
    }
    
    /**
     * Tính điểm trung bình của tất cả các task đã được đánh giá
     */
    public Double getAverageEvaluation() {
        List<Task> evaluatedTasks = taskRepository.findByEvaluationIsNotNull();
        if (evaluatedTasks.isEmpty()) {
            return 0.0;
        }
        return evaluatedTasks.stream()
                .mapToDouble(Task::getEvaluation)
                .average()
                .orElse(0.0);
    }
}
