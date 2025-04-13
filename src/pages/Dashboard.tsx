
import ExpensesChart from "@/components/dashboard/ExpensesChart";
import MonthlyChart from "@/components/dashboard/MonthlyChart";
import { StatCard } from "@/components/dashboard/StatCard";
import TransactionItem from "@/components/dashboard/TransactionItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PiggyBank,
  TrendingDown,
  TrendingUp,
  Wallet
} from "lucide-react";

const Dashboard = () => {
  const expenseData = [
    { name: "Moradia", value: 1800, color: "#3498DB" },
    { name: "Alimentação", value: 1200, color: "#E74C3C" },
    { name: "Transporte", value: 400, color: "#2ECC71" },
    { name: "Lazer", value: 300, color: "#F39C12" },
    { name: "Outros", value: 500, color: "#9B59B6" },
  ];

  const monthlyData = [
    { name: "Jan", income: 5000, expenses: 4200 },
    { name: "Fev", income: 5100, expenses: 4300 },
    { name: "Mar", income: 5200, expenses: 4000 },
    { name: "Abr", income: 5300, expenses: 4100 },
    { name: "Mai", income: 5500, expenses: 4400 },
    { name: "Jun", income: 6000, expenses: 4200 },
  ];

  const recentTransactions = [
    { id: "1", title: "Salário", amount: 5000, date: "10/06/2025", category: "Renda", type: "income" as const },
    { id: "2", title: "Aluguel", amount: 1500, date: "05/06/2025", category: "Moradia", type: "expense" as const },
    { id: "3", title: "Supermercado", amount: 350, date: "03/06/2025", category: "Alimentação", type: "expense" as const },
    { id: "4", title: "Investimento", amount: 1000, date: "01/06/2025", category: "Investimentos", type: "income" as const },
    { id: "5", title: "Restaurante", amount: 120, date: "02/06/2025", category: "Alimentação", type: "expense" as const },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Olá, bem-vindo!</h1>
        <p className="text-muted-foreground">Acompanhe suas finanças de maneira simples e eficiente.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Saldo Total"
          value={4200}
          icon={<Wallet className="h-5 w-5" />}
          variant="blue"
          change={8}
        />
        <StatCard
          title="Receitas do Mês"
          value={6000}
          icon={<TrendingUp className="h-5 w-5" />}
          variant="green"
          change={5}
        />
        <StatCard
          title="Despesas do Mês"
          value={-4200}
          icon={<TrendingDown className="h-5 w-5" />}
          variant="red"
          change={-3}
        />
        <StatCard
          title="Economia do Mês"
          value={1800}
          icon={<PiggyBank className="h-5 w-5" />}
          variant="purple"
          change={12}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MonthlyChart data={monthlyData} />
        <ExpensesChart data={expenseData} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Transações Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="income">Receitas</TabsTrigger>
                <TabsTrigger value="expense">Despesas</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-0 divide-y">
                {recentTransactions.map((transaction) => (
                  <TransactionItem key={transaction.id} {...transaction} />
                ))}
              </TabsContent>

              <TabsContent value="income" className="space-y-0 divide-y">
                {recentTransactions.filter(t => t.type === "income").map((transaction) => (
                  <TransactionItem key={transaction.id} {...transaction} />
                ))}
              </TabsContent>

              <TabsContent value="expense" className="space-y-0 divide-y">
                {recentTransactions.filter(t => t.type === "expense").map((transaction) => (
                  <TransactionItem key={transaction.id} {...transaction} />
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
