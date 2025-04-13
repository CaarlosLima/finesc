
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  Banknote,
  BarChart3,
  CreditCard,
  FolderTree,
  Home,
  List,
  Wallet
} from "lucide-react";
import { NavLink } from "react-router-dom";
import UserMenu from "./UserMenu";

const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <NavLink to="/" className="flex items-center px-3 py-2 rounded-md">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                  <Wallet className="h-6 w-6 text-finance-green" />
                </div>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="text-xl font-bold">Finesc</span>
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Dashboard" asChild>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      cn("flex items-center gap-4 px-3 py-2 rounded-md", {
                        "bg-primary/10 text-primary": isActive,
                      })
                    }
                  >
                    <Home className="h-5 w-5" />
                    <span>Dashboard</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Transações" asChild>
                  <NavLink
                    to="/transactions"
                    className={({ isActive }) =>
                      cn("flex items-center gap-4 px-3 py-2 rounded-md", {
                        "bg-primary/10 text-primary": isActive,
                      })
                    }
                  >
                    <List className="h-5 w-5" />
                    <span>Transações</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Contas Bancárias" asChild>
                  <NavLink
                    to="/bank-accounts"
                    className={({ isActive }) =>
                      cn("flex items-center gap-4 px-3 py-2 rounded-md", {
                        "bg-primary/10 text-primary": isActive,
                      })
                    }
                  >
                    <Banknote className="h-5 w-5" />
                    <span>Contas Bancárias</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Cartões de Contas" asChild>
                  <NavLink
                    to="/bank-accounts-cards"
                    className={({ isActive }) =>
                      cn("flex items-center gap-4 px-3 py-2 rounded-md", {
                        "bg-primary/10 text-primary": isActive,
                      })
                    }
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>Cartões de Contas</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Categorias" asChild>
                  <NavLink
                    to="/categories"
                    className={({ isActive }) =>
                      cn("flex items-center gap-4 px-3 py-2 rounded-md", {
                        "bg-primary/10 text-primary": isActive,
                      })
                    }
                  >
                    <FolderTree className="h-5 w-5" />
                    <span>Categorias</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Relatórios" asChild>
                  <NavLink
                    to="/reports"
                    className={({ isActive }) =>
                      cn("flex items-center gap-4 px-3 py-2 rounded-md", {
                        "bg-primary/10 text-primary": isActive,
                      })
                    }
                  >
                    <BarChart3 className="h-5 w-5" />
                    <span>Relatórios</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarTrigger />
          </SidebarMenuItem>
        </SidebarMenu>
        
        <div className="mt-2">
          <UserMenu />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
