
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const IncomeTabContent = () => {
  const incomeBySource = [
    { name: "Salário", value: 5000, color: "#2ECC71" },
    { name: "Freelance", value: 2000, color: "#3498DB" },
    { name: "Investimentos", value: 1000, color: "#F39C12" },
    { name: "Outros", value: 500, color: "#9B59B6" },
  ];

  const monthlyIncome = [
    { name: "Jan", value: 5000 },
    { name: "Fev", value: 5100 },
    { name: "Mar", value: 5200 },
    { name: "Abr", value: 5300 },
    { name: "Mai", value: 5500 },
    { name: "Jun", value: 6000 },
  ];

  const topIncomeSources = [
    { source: "Emprego", description: "Salário mensal", amount: 5000, percentage: 58.8 },
    { source: "Freelance", description: "Projetos externos", amount: 2000, percentage: 23.5 },
    { source: "Investimentos", description: "Dividendos", amount: 1000, percentage: 11.8 },
    { source: "Venda", description: "Itens usados", amount: 300, percentage: 3.5 },
    { source: "Outros", description: "Diversos", amount: 200, percentage: 2.4 },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Resumo de Receitas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center justify-center space-y-2">
              <TrendingUp className="h-8 w-8 text-finance-green" />
              <p className="text-muted-foreground text-sm">Total de Receitas (Jun/2025)</p>
              <h3 className="text-3xl font-bold text-finance-green">R$ 8.500,00</h3>
              <p className="text-xs text-muted-foreground">+10% em relação ao mês anterior</p>
            </div>

            <div className="md:col-span-2">
              <Tabs defaultValue="source" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="source">Por Fonte</TabsTrigger>
                  <TabsTrigger value="monthly">Mensal</TabsTrigger>
                </TabsList>

                <TabsContent value="source">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={incomeBySource}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {incomeBySource.map((entry, index) => (
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
                    <BarChart data={monthlyIncome} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                          })}`, 'Receitas']
                        }
                      />
                      <Bar dataKey="value" name="Receitas" fill="#2ECC71" />
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
          <CardTitle className="text-lg">Principais Fontes de Receita</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {topIncomeSources.map((income, index) => (
              <div key={index} className="flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-medium">{income.description}</p>
                    <p className="text-xs text-muted-foreground">{income.source}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-finance-green">
                      R$ {income.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-muted-foreground">{income.percentage}% do total</p>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-finance-green h-2 rounded-full"
                    style={{ width: `${income.percentage}%` }}
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

export default IncomeTabContent;
