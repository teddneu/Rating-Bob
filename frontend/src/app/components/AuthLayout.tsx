import { Outlet } from "react-router";
import { Heart } from "lucide-react";

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex size-16 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 items-center justify-center mb-4">
            <Heart className="size-8 text-white fill-white" />
          </div>
          <h1 className="text-foreground mb-2">Vài thứ Bob làm</h1>
          <p className="text-muted-foreground">Theo dõi những điều Bob làm mỗi ngày</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
