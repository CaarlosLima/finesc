
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingDown } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const ExpenseTabContent = () => {
  const expensesByCategory = [
    { name: "Moradia", value: 1800, color: "#3498DB" },
    { name: "Alimentação", value: 1200, color: "#E74C3C" },
    { name: "Transporte", value: 400, color: "#2ECC71" },
    { name: "Lazer", value: 300, color: "#F39C12" },
    { name: "Outros", value: 500, color: "#9B59B6" },
  ];

  const monthlyExpenses = [
    { name: "Jan", value: 4200 },
    { name: "Fev", value: 4300 },
    { name: "Mar", value: 4000 },
    { name: "Abr", value: 4100 },
    { name: "Mai", value: 4400 },
    { name: "Jun", value: 4200 },
  ];

  const topExpenses = [
    { category: "Moradia", description: "Aluguel", amount: 1500, percentage: 35.7 },
    { category: "Alimentação", description: "Supermercado", amount: 800, percentage: 19.0 },
    { category: "Utilidades", description: "Energia", amount: 250, percentage: 5.9 },
    { category: "Transporte", description: "Combustível", amount: 300, percentage: 7.1 },
    { category: "Saúde", description: "Plano de saúde", amount: 400, percentage: 9.5 },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Resumo de Despesas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center justify-center space-y-2">
              <TrendingDown className="h-8 w-8 text-finance-red" />
              <p className="text-muted-foreground text-sm">Total de Despesas (Jun/2025)</p>
              <h3 className="text-3xl font-bold text-finance-red">R$ 4.200,00</h3>
              <p className="text-xs text-muted-foreground">+5% em relação ao mês anterior</p>
            </div>

            <div className="md:col-span-2">
              <Tabs defaultValue="category" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="category">Por Categoria</TabsTrigger>
                  <TabsTrigger value="monthly">Mensal</TabsTrigger>
                </TabsList>

                <TabsContent value="category">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={expensesByCategory}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {expensesByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Valor']}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </TabsContent>

                <TabsContent value="monthly">
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={monthlyExpenses} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis
                        tickFormatter={(value) =>
                          `R$ ${value.toLocaleString('pt-BR', {
                            notation: 'compact',
                            compactDisplay: 'short'
                          })}`
                        }
                      />
                      <Tooltip
                        formatter={(value) =>
                          [`R$ ${Number(value).toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}`, 'Despesas']
                        }
                      />
                      <Bar dataKey="value" name="Despesas" fill="#E74C3C" />
                    </BarChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Principais Despesas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {topExpenses.map((expense, index) => (
              <div key={index} className="flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-xs text-muted-foreground">{expense.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-finance-red">
                      R$ {expense.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-muted-foreground">{expense.percentage}% do total</p>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-finance-red h-2 rounded-full"
                    style={{ width: `${expense.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseTabContent;
