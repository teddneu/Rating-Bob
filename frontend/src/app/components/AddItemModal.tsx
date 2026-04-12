import { useState } from "react";
import { X, Star, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { RatedItem } from "../pages/HomePage";
import { taskService } from "../services/api";

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: Omit<RatedItem, "id">) => void;
}

const CATEGORIES = ["Đồ ăn", "Linh tinh", "Món quà", "Hirono", "Date", "Other"];

export function AddItemModal({ isOpen, onClose, onAdd }: AddItemModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "Đồ ăn",
    rating: 5,
    notes: "",
    date: new Date().toISOString().split("T")[0],
    imageUrl: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsLoading(true);
    try {
      // Gọi API Backend
      const response = await taskService.createTask({
        title: formData.name,
        description: formData.notes,
        status: "pending",
        evaluation: formData.rating,
        createdAt: Date.now(),
        updatedAt: Date.now()
      });

      if (response.status === 201 || response.status === 200) {
        // Lưu vào local state (frontend)
        onAdd(formData);
        
        // Reset form
        setFormData({
          name: "",
          category: "Đồ ăn",
          rating: 5,
          notes: "",
          date: new Date().toISOString().split("T")[0],
          imageUrl: ""
        });
        onClose();
        alert("✅ Đã lưu thành công!");
      }
    } catch (error) {
      console.error("❌ Lỗi khi lưu:", error);
      alert("Không lưu được, kiểm tra lại Backend nhé!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-card border border-border rounded-xl w-full max-w-lg p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2>Thêm mới</h2>
                <button
                  onClick={onClose}
                  className="size-8 flex items-center justify-center rounded-lg hover:bg-accent transition-colors"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block mb-2">
                    Bob đã làm gì hôm nay?
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Giúp Sóc làm Canva"
                    className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="block mb-2">
                    Phân loại
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Rating */}
                <div>
                  <label className="block mb-2">
                    Đánh giá của Sóc                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`size-8 ${
                            star <= formData.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label htmlFor="date" className="block mb-2">
                    Ngày
                  </label>
                  <input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label htmlFor="imageUrl" className="block mb-2">
                    Image URL (optional)
                  </label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                    <input
                      id="imageUrl"
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                      className="w-full pl-11 pr-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor="notes" className="block mb-2">
                    Ghi chú (optional)
                  </label>
                  <textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Đánh giá của Sóc iu?"
                    rows={3}
                    className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>

                {/* Submit */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-accent transition-colors"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Đang lưu..." : "Thêm mục"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
