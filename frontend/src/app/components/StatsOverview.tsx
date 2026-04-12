import { Star, Heart, TrendingUp } from "lucide-react";
import { RatedItem } from "../pages/HomePage";

interface StatsOverviewProps {
  items: RatedItem[];
}

export function StatsOverview({ items }: StatsOverviewProps) {
  const totalItems = items.length;
  const averageRating = totalItems > 0
    ? (items.reduce((sum, item) => sum + item.rating, 0) / totalItems).toFixed(1)
    : "0.0";
  const perfectRatings = items.filter(item => item.rating === 5).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {/* Total Items */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground mb-1">Tất cả các điều Bob làm</p>
            <p className="text-3xl text-foreground">{totalItems}</p>
          </div>
          <div className="size-12 rounded-full bg-blue-500/10 flex items-center justify-center">
            <Heart className="size-6 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Average Rating */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground mb-1">Đánh giá trung bình</p>
            <div className="flex items-center gap-2">
              <p className="text-3xl text-foreground">{averageRating}</p>
              <Star className="size-6 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
          <div className="size-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
            <TrendingUp className="size-6 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Perfect Ratings */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground mb-1">Đánh giá hoàn hảo</p>
            <p className="text-3xl text-foreground">{perfectRatings}</p>
          </div>
          <div className="size-12 rounded-full bg-pink-500/10 flex items-center justify-center">
            <Star className="size-6 fill-pink-500 text-pink-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
