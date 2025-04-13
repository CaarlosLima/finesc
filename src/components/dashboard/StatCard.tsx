
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number;
  change?: number;
  icon: React.ReactNode;
  variant?: "green" | "blue" | "purple" | "yellow" | "red";
}

export function StatCard({
  title,
  value,
  change,
  icon,
  variant = "blue",
}: StatCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };
  
  // Fixed type comparison issue by ensuring change is a number
  const changeStatusClass = change !== undefined ? 
    (change >= 0 ? "text-green-600" : "text-red-600") : "";
  
  const iconColorClass = {
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-700",
    purple: "bg-purple-100 text-purple-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="mt-1 text-2xl font-semibold">{formatCurrency(value)}</h3>
            {change !== undefined && (
              <p className={cn("text-sm mt-1", changeStatusClass)}>
                {change >= 0 ? "+" : ""}
                {change}% em relação ao mês anterior
              </p>
            )}
          </div>
          <div className={cn("p-3 rounded-full", iconColorClass[variant])}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
