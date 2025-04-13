
import { ReactNode } from "react";
import AppSidebar from "./AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-6 max-w-full">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
