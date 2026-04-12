import { X, Calendar, Tag, Star, Edit2, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { format } from "date-fns";
import { RatedItem } from "../pages/HomePage";
import { useState } from "react";
import { taskService } from "../services/api";

interface ItemDetailModalProps {
  item: RatedItem | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
  onEdit?: (item: RatedItem) => void;
  onRatingUpdate?: (id: string, rating: number) => void;
}

export function ItemDetailModal({ item, isOpen, onClose, onDelete, onEdit, onRatingUpdate }: ItemDetailModalProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isRating, setIsRating] = useState(false);
  const [currentRating, setCurrentRating] = useState<number | null>(null);

  if (!item) return null;

  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete(item.id);
      onClose();
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 3000);
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
            <div className="bg-card border border-border rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              {/* Image */}
              {item.imageUrl && (
                <div className="relative h-80 overflow-hidden bg-muted">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* Close button on image */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 size-10 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
                  >
                    <X className="size-5" />
                  </button>
                </div>
              )}

              <div className="p-8">
                {/* Header without image */}
                {!item.imageUrl && (
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h2 className="text-foreground">{item.name}</h2>
                    </div>
                    <button
                      onClick={onClose}
                      className="size-10 flex items-center justify-center rounded-lg hover:bg-accent transition-colors"
                    >
                      <X className="size-5" />
                    </button>
                  </div>
                )}

                {/* Title with image */}
                {item.imageUrl && (
                  <h2 className="text-foreground mb-4">{item.name}</h2>
                )}

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Tag className="size-4" />
                    <span className="text-sm">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="size-4" />
                    <span className="text-sm">{format(new Date(item.date), "MMMM dd, yyyy")}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <p className="text-muted-foreground mb-2">Đánh giá của Sóc</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={async () => {
                          setIsRating(true);
                          try {
                            // Gọi API cập nhật đánh giá
                            await taskService.updateTask(item.id, {
                              evaluation: star,
                              status: "completed",
                              updatedAt: Date.now()
                            });
                            setCurrentRating(star);
                            
                            // Cập nhật item ở HomePage
                            if (onRatingUpdate) {
                              onRatingUpdate(item.id, star);
                            }
                            
                            alert(`✅ Đánh giá ${star} sao đã lưu!`);
                          } catch (error) {
                            console.error("❌ Lỗi khi đánh giá:", error);
                            alert("Không lưu được đánh giá!");
                          } finally {
                            setIsRating(false);
                          }
                        }}
                        disabled={isRating}
                        className="hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Star
                          className={`size-7 ${
                            star <= (currentRating ?? item.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {currentRating && <p className="text-sm text-muted-foreground mt-2">Đánh giá: {currentRating} sao</p>}
                </div>

                {/* Notes */}
                {item.notes && (
                  <div className="mb-8">
                    <p className="text-muted-foreground mb-2">Notes</p>
                    <p className="text-foreground leading-relaxed">{item.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-6 border-t border-border">
                  {onEdit && (
                    <button
                      onClick={() => {
                        onEdit(item);
                        onClose();
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-accent transition-colors"
                    >
                      <Edit2 className="size-4" />
                      Chỉnh sửa
                    </button>
                  )}
                  <button
                    onClick={handleDelete}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                      showDeleteConfirm
                        ? "bg-destructive text-destructive-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-accent"
                    }`}
                  >
                    <Trash2 className="size-4" />
                    {showDeleteConfirm ? "Nhấn để xác nhận" : "Xóa bỏ"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
