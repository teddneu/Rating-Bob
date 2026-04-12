import { Calendar, Tag, Trash2, Star } from "lucide-react";
import { format } from "date-fns";
import { motion } from "motion/react";
import { RatedItem } from "../pages/HomePage";
import { useState } from "react";

interface ItemCardProps {
  item: RatedItem;
  onDelete: (id: string) => void;
  onClick: () => void;
}

export function ItemCard({ item, onDelete, onClick }: ItemCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (showDeleteConfirm) {
      onDelete(item.id);
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02]"
    >
      {/* Image */}
      {item.imageUrl && (
        <div className="relative h-48 overflow-hidden bg-muted">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-foreground mb-1">{item.name}</h3>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Tag className="size-4" />
              <span className="text-sm">{item.category}</span>
            </div>
          </div>
          <button
            onClick={handleDelete}
            className={`size-9 flex items-center justify-center rounded-lg transition-colors ${
              showDeleteConfirm
                ? "bg-destructive text-destructive-foreground"
                : "hover:bg-accent text-muted-foreground hover:text-foreground"
            }`}
            title={showDeleteConfirm ? "Click again to confirm" : "Delete"}
          >
            <Trash2 className="size-4" />
          </button>
        </div>

        {/* Rating */}
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`size-5 ${
                star <= item.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        {/* Notes */}
        {item.notes && (
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {item.notes}
          </p>
        )}

        {/* Date */}
        <div className="flex items-center gap-2 text-muted-foreground pt-4 border-t border-border">
          <Calendar className="size-4" />
          <span className="text-sm">{format(new Date(item.date), "MMM dd, yyyy")}</span>
        </div>
      </div>
    </motion.div>
  );
}
