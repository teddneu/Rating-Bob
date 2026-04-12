import { useState } from "react";
import { Plus, Star, Sparkles, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface WishlistItem {
  id: string;
  title: string;
  priority: "high" | "medium" | "low";
  notes: string;
  completed: boolean;
}

const INITIAL_WISHLIST: WishlistItem[] = [
  {
    id: "1",
    title: "Handwritten love letters collection",
    priority: "high",
    notes: "One letter for each month we've been together",
    completed: false
  },
  {
    id: "2",
    title: "Custom photo album",
    priority: "high",
    notes: "All our favorite memories from this year",
    completed: false
  },
  {
    id: "3",
    title: "Homemade pasta dinner",
    priority: "medium",
    notes: "She mentioned wanting to try fresh pasta",
    completed: true
  }
];

export function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>(INITIAL_WISHLIST);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    title: "",
    priority: "medium" as const,
    notes: ""
  });

  const handleAddItem = () => {
    if (newItem.title.trim()) {
      setItems([
        {
          id: Date.now().toString(),
          ...newItem,
          completed: false
        },
        ...items
      ]);
      setNewItem({ title: "", priority: "medium", notes: "" });
      setShowAddForm(false);
    }
  };

  const toggleComplete = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-rose-500 bg-rose-500/10";
      case "medium": return "text-amber-500 bg-amber-500/10";
      case "low": return "text-blue-500 bg-blue-500/10";
      default: return "text-muted-foreground bg-muted";
    }
  };

  const activeItems = items.filter(item => !item.completed);
  const completedItems = items.filter(item => item.completed);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-foreground mb-1 flex items-center gap-3">
            <Sparkles className="size-8 text-pink-500" />
            Her Wishlist
          </h1>
          <p className="text-muted-foreground">Gift ideas and things she'd love</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus className="size-5" />
          Add Idea
        </motion.button>
      </div>

      {/* Add Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-8"
          >
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block mb-2">
                    What would she love?
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    placeholder="e.g., Surprise weekend getaway"
                    className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="block mb-2">Priority</label>
                  <div className="flex gap-2">
                    {(["high", "medium", "low"] as const).map((priority) => (
                      <button
                        key={priority}
                        type="button"
                        onClick={() => setNewItem({ ...newItem, priority })}
                        className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                          newItem.priority === priority
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground hover:bg-accent"
                        }`}
                      >
                        {priority}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block mb-2">
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    value={newItem.notes}
                    onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
                    placeholder="Why would she love this?"
                    rows={2}
                    className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-accent transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddItem}
                    className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Items */}
      {activeItems.length > 0 && (
        <div className="mb-8">
          <h3 className="text-foreground mb-4">To Do ({activeItems.length})</h3>
          <div className="space-y-3">
            {activeItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-card border border-border rounded-xl p-5"
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleComplete(item.id)}
                    className="size-6 rounded-full border-2 border-muted-foreground hover:border-primary transition-colors flex-shrink-0 mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h4 className="text-foreground">{item.title}</h4>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs capitalize ${getPriorityColor(item.priority)}`}>
                          {item.priority}
                        </span>
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="size-8 flex items-center justify-center rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <X className="size-4" />
                        </button>
                      </div>
                    </div>
                    {item.notes && (
                      <p className="text-muted-foreground text-sm">{item.notes}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Items */}
      {completedItems.length > 0 && (
        <div>
          <h3 className="text-foreground mb-4">Completed ({completedItems.length})</h3>
          <div className="space-y-3">
            {completedItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-card border border-border rounded-xl p-5 opacity-60"
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleComplete(item.id)}
                    className="size-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1"
                  >
                    <Check className="size-4 text-primary-foreground" />
                  </button>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h4 className="text-foreground line-through">{item.title}</h4>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="size-8 flex items-center justify-center rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                    {item.notes && (
                      <p className="text-muted-foreground text-sm line-through">{item.notes}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {items.length === 0 && (
        <div className="text-center py-20">
          <Sparkles className="size-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Start adding gift ideas and things she'd love!</p>
        </div>
      )}
    </div>
  );
}
