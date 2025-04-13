
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type TransactionType = "income" | "expense";

interface TransactionItemProps {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  type: TransactionType;
}

const TransactionItem = ({ title, amount, date, category, type }: TransactionItemProps) => {
  const isIncome = type === "income";
  
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", 
          isIncome ? "bg-finance-green/10" : "bg-finance-red/10")}>
          {isIncome ? (
            <ArrowUpRight className="h-5 w-5 text-finance-green" />
          ) : (
            <ArrowDownRight className="h-5 w-5 text-finance-red" />
          )}
        </div>
        <div className="flex flex-col">
          <span className="font-medium">{title}</span>
          <span className="text-xs text-muted-foreground">{category}</span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className={cn("font-medium", 
          isIncome ? "text-finance-green" : "text-finance-red")}>
          {isIncome ? "+" : "-"}R$ {Math.abs(amount).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
        <span className="text-xs text-muted-foreground">{date}</span>
      </div>
    </div>
  );
};

export default TransactionItem;
