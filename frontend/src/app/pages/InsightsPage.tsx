import { TrendingUp, Award, Heart, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const ratingsByMonth = [
  { month: "Jan", avgRating: 4.2 },
  { month: "Feb", avgRating: 4.5 },
  { month: "Mar", avgRating: 4.8 },
  { month: "Apr", avgRating: 4.7 },
];

const categoryData = [
  { name: "Food", value: 12, color: "#f43f5e" },
  { name: "Art", value: 8, color: "#8b5cf6" },
  { name: "DIY", value: 15, color: "#3b82f6" },
  { name: "Gift", value: 10, color: "#ec4899" },
];

const recentActivity = [
  { date: "Apr 10", items: 2 },
  { date: "Apr 7", items: 1 },
  { date: "Apr 5", items: 3 },
  { date: "Apr 2", items: 1 },
  { date: "Mar 30", items: 2 },
  { date: "Mar 28", items: 1 },
];

export function InsightsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-foreground mb-1">Phân tích & Báo cáo</h1>
        <p className="text-muted-foreground">Theo dõi hành trình</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="size-10 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Heart className="size-5 text-blue-500" />
            </div>
            <p className="text-muted-foreground">Tháng này</p>
          </div>
          <p className="text-3xl text-foreground">12</p>
          <p className="text-sm text-green-500 mt-1">+3 từ tháng trước</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="size-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <TrendingUp className="size-5 text-yellow-500" />
            </div>
            <p className="text-muted-foreground">Đánh giá trung bình</p>
          </div>
          <p className="text-3xl text-foreground">4.7</p>
          <p className="text-sm text-green-500 mt-1">+0.2 this month</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="size-10 rounded-full bg-pink-500/10 flex items-center justify-center">
              <Award className="size-5 text-pink-500" />
            </div>
            <p className="text-muted-foreground">Perfect 5★</p>
          </div>
          <p className="text-3xl text-foreground">28</p>
          <p className="text-sm text-muted-foreground mt-1">62% of all items</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="size-10 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Calendar className="size-5 text-purple-500" />
            </div>
            <p className="text-muted-foreground">Tất cả</p>
          </div>
          <p className="text-3xl text-foreground">45</p>
          <p className="text-sm text-muted-foreground mt-1">Tạo chuỗi hoạt động</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Rating Trends */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-foreground mb-6">Xu hướng đánh giá</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={ratingsByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis domain={[0, 5]} stroke="#888" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="avgRating"
                stroke="#f43f5e"
                strokeWidth={3}
                dot={{ fill: "#f43f5e", r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-foreground mb-6">Theo Danh Mục</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activity Chart */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-foreground mb-6">Hoạt động gần đây</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={recentActivity}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis dataKey="date" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="items" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
