import axios from 'axios';

/**
 * Teddy lưu ý: 
 * - Trong Vite, biến môi trường phải bắt đầu bằng VITE_
 * - Chúng ta dùng import.meta.env thay vì process.env
 */
const RAW_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8082';
const BASE_URL = RAW_BASE_URL.endsWith('/api')
  ? RAW_BASE_URL
  : `${RAW_BASE_URL.replace(/\/$/, '')}/api`;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskService = {
  // Lấy danh sách món ăn/công việc
  getAllTasks: () => api.get('/tasks'),
  
  // Gửi đánh giá (Rating) cho một món
  // Teddy kiểm tra lại Backend xem đã có endpoint /tasks/{id}/rate chưa nhé
  rateTask: (id: string, evaluation: number) => 
    api.patch(`/tasks/${id}/rate`, { evaluation }),

  updateTask: (id: string, data: any) =>
    api.patch(`/tasks/${id}`, data),

  deleteTask: (id: string) =>
    api.delete(`/tasks/${id}`),
    
  // Thêm món mới
  createTask: (data: any) => api.post('/tasks', data),
};

export const authService = {
  login: (data: { email: string; password: string }) => api.post('/auth/login', data),
  register: (data: { name: string; email: string; password: string }) => api.post('/auth/register', data),
};

export default api;
