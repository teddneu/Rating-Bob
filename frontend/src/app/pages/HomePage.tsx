import { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AddItemModal } from "../components/AddItemModal";
import { ItemCard } from "../components/ItemCard";
import { ItemDetailModal } from "../components/ItemDetailModal";
import { StatsOverview } from "../components/StatsOverview";
import { taskService } from "../services/api";

export interface RatedItem {
  id: string;
  name: string;
  category: string;
  rating: number;
  notes: string;
  date: string;
  imageUrl?: string;
}

const INITIAL_ITEMS: RatedItem[] = [
  {
    id: "1",
    name: "Homemade Chocolate Cake",
    category: "Food",
    rating: 5,
    notes: "Her favorite dessert! The frosting was perfect.",
    date: "2026-04-10",
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80"
  },
  {
    id: "2",
    name: "Hand-painted Portrait",
    category: "Art",
    rating: 4,
    notes: "Took me 3 days but she loved it. Need to work on shading.",
    date: "2026-04-05",
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80"
  },
  {
    id: "3",
    name: "Custom Jewelry Box",
    category: "DIY",
    rating: 5,
    notes: "Carved her initials on the lid. She cried happy tears!",
    date: "2026-03-28",
    imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80"
  }
];

const toDisplayDate = (value: unknown) => {
  if (value === null || value === undefined || value === "") {
    return new Date().toISOString().split("T")[0];
  }

  const date = new Date(value as string | number);
  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString().split("T")[0];
  }

  return date.toISOString().split("T")[0];
};

const mapTaskToRatedItem = (task: any, index: number): RatedItem => ({
  id: String(task.id ?? task._id ?? index),
  name: task.title ?? task.name ?? "",
  category: task.category ?? "Other",
  rating: typeof task.evaluation === "number" ? task.evaluation : Number(task.rating ?? 0),
  notes: task.description ?? task.notes ?? "",
  date: toDisplayDate(task.createdAt ?? task.date ?? task.updatedAt),
  imageUrl: task.imageUrl || undefined
});

export function HomePage() {
  const [items, setItems] = useState<RatedItem[]>(INITIAL_ITEMS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RatedItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch data từ Backend khi component mount
  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const response = await taskService.getAllTasks();
        if (response.data && Array.isArray(response.data)) {
          // Map dữ liệu từ Backend sang Frontend format, có hỗ trợ cả document cũ trên Atlas.
          const mappedItems: RatedItem[] = response.data.map((task: any, index: number) =>
            mapTaskToRatedItem(task, index)
          );
          setItems(mappedItems);
          console.log("✅ Fetched tasks:", mappedItems);
        }
      } catch (error) {
        console.error("❌ Error fetching tasks:", error);
        // Giữ INITIAL_ITEMS nếu fetch thất bại
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const categories = ["All", ...Array.from(new Set(items.map(item => item.category)))];

  const filteredItems = items.filter(item => {
    const matchesCategory = filterCategory === "All" || item.category === filterCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.notes.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddItem = async (newItem: Omit<RatedItem, "id">) => {
    // Sau khi thêm, refetch data từ backend
    await new Promise(resolve => setTimeout(resolve, 500)); // Chờ API backend xử lý
    try {
      const response = await taskService.getAllTasks();
      if (response.data && Array.isArray(response.data)) {
        const mappedItems: RatedItem[] = response.data.map((task: any, index: number) =>
          mapTaskToRatedItem(task, index)
        );
        setItems(mappedItems);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("❌ Error refetching tasks:", error);
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      setItems(items.filter(item => item.id !== id));
      setSelectedItem(null);
    } catch (error) {
      console.error("❌ Error deleting item:", error);
      alert("Không xóa được item!");
    }
  };

  const handleRatingUpdate = (id: string, newRating: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, rating: newRating } : item
    ));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-foreground mb-1">Tạo đánh giá cho Bob</h1>
          <p className="text-muted-foreground">Vài điều tui làm cho cổ</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus className="size-5" />
          Thêm mới
        </motion.button>
      </div>

      {/* Stats */}
      <StatsOverview items={items} />

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm các điều Bob làm..."
            className="w-full pl-11 pr-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-4 py-3 rounded-lg whitespace-nowrap transition-colors ${
                filterCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Đang tải các điều Bob làm...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onDelete={handleDeleteItem}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>
      )}

      {!isLoading && filteredItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-muted-foreground">
            {searchQuery ? "Không có mục nào phù hợp với tìm kiếm của bạn." : "Chưa có mục nào trong danh mục này."}
          </p>
        </motion.div>
      )}

      {/* Add Item Modal */}
      <AddItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddItem}
      />

      {/* Item Detail Modal */}
      <ItemDetailModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        onDelete={handleDeleteItem}
        onRatingUpdate={handleRatingUpdate}
      />
    </div>
  );
}
