import { useState } from "react";
import { User, Bell, Palette, Tag, Save } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export function SettingsPage() {
  const [settings, setSettings] = useState({
    name: "Sóc Iu",
    email: "vocuabob@gmail.com",
    partnerName: "Bob",
    notifications: true,
    emailUpdates: false,
    categories: ["Đồ ăn", "Linh tinh", "Món quà", "Hirono", "Date", "Other"],
    newCategory: "",
  });

  const handleSave = () => {
    toast.success("Đã lưu cài đặt!");
  };

  const addCategory = () => {
    if (settings.newCategory.trim() && !settings.categories.includes(settings.newCategory.trim())) {
      setSettings({
        ...settings,
        categories: [...settings.categories, settings.newCategory.trim()],
        newCategory: "",
      });
    }
  };

  const removeCategory = (category: string) => {
    setSettings({
      ...settings,
      categories: settings.categories.filter(c => c !== category),
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-foreground mb-1">Cài đặt</h1>
        <p className="text-muted-foreground">Quản lý các tùy chọn của bạn</p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="size-5 text-primary" />
            <h3 className="text-foreground">Hồ sơ</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2">
                Tên của bạn
              </label>
              <input
                id="name"
                type="text"
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label htmlFor="partner" className="block mb-2">
                Tên của bạn với Bob
              </label>
              <input
                id="partner"
                type="text"
                value={settings.partnerName}
                onChange={(e) => setSettings({ ...settings, partnerName: e.target.value })}
                className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="size-5 text-primary" />
            <h3 className="text-foreground">Thông báo</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground">Thông báo đẩy</p>
                <p className="text-sm text-muted-foreground">Nhận nhắc nhở về các dịp đặc biệt</p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, notifications: !settings.notifications })}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.notifications ? "bg-primary" : "bg-switch-background"
                }`}
              >
                <motion.div
                  animate={{ x: settings.notifications ? 24 : 0 }}
                  className="size-6 bg-white rounded-full shadow-md"
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground">Email Updates</p>
                <p className="text-sm text-muted-foreground">Tóm tắt hàng tuần </p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, emailUpdates: !settings.emailUpdates })}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.emailUpdates ? "bg-primary" : "bg-switch-background"
                }`}
              >
                <motion.div
                  animate={{ x: settings.emailUpdates ? 24 : 0 }}
                  className="size-6 bg-white rounded-full shadow-md"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Tag className="size-5 text-primary" />
            <h3 className="text-foreground">Danh mục</h3>
          </div>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={settings.newCategory}
                onChange={(e) => setSettings({ ...settings, newCategory: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && addCategory()}
                placeholder="Add new category..."
                className="flex-1 px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                onClick={addCategory}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Thêm
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {settings.categories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg"
                >
                  {category}
                  <button
                    onClick={() => removeCategory(category)}
                    className="hover:text-destructive transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Theme */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="size-5 text-primary" />
            <h3 className="text-foreground">Giao diện</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <button className="p-4 border-2 border-primary bg-accent rounded-lg">
              <div className="size-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 mx-auto mb-2" />
              <p className="text-sm text-foreground">Sáng</p>
            </button>
            <button className="p-4 border border-border rounded-lg hover:border-primary transition-colors">
              <div className="size-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 mx-auto mb-2" />
              <p className="text-sm text-foreground">Tối</p>
            </button>
            <button className="p-4 border border-border rounded-lg hover:border-primary transition-colors">
              <div className="size-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 mx-auto mb-2" />
              <p className="text-sm text-foreground">Tự động</p>
            </button>
          </div>
        </div>

        {/* Save Button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleSave}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          <Save className="size-5" />
          Lưu Thay Đổi
        </motion.button>
      </div>
    </div>
  );
}
