import { Outlet } from "react-router-dom";
import { ComponentsSidebar } from "@/components/ComponentsSidebar";

export default function ComponentsShell() {
  return (
    <div className="flex flex-1 w-full overflow-hidden">
      <ComponentsSidebar />
      <div className="flex-1 min-w-0 overflow-y-auto h-[calc(100vh-3.5rem)]">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
