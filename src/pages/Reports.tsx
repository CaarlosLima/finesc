
import ExpenseTabContent from "@/components/reports/ExpenseTabContent";
import IncomeTabContent from "@/components/reports/IncomeTabContent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download } from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const Reports = () => {
  const [period, setPeriod] = useState("6months");

  const monthlyData = [
    { name: "Jan", income: 5000, expenses: 4200, savings: 800 },
    { name: "Fev", income: 5100, expenses: 4300, savings: 800 },
    { name: "Mar", income: 5200, expenses: 4000, savings: 1200 },
    { name: "Abr", income: 5300, expenses: 4100, savings: 1200 },
    { name: "Mai", income: 5500, expenses: 4400, savings: 1100 },
    { name: "Jun", income: 6000, expenses: 4200, savings: 1800 },
  ];

  const categoryData = [
    { name: "Moradia", value: 1800, color: "#3498DB" },
    { name: "Alimentação", value: 1200, color: "#E74C3C" },
    { name: "Transporte", value: 400, color: "#2ECC71" },
    { name: "Lazer", value: 300, color: "#F39C12" },
    { name: "Outros", value: 500, color: "#9B59B6" },
  ];

  const savingsData = [
    { name: "Jan", amount: 800 },
    { name: "Fev", amount: 800 },
    { name: "Mar", amount: 1200 },
    { name: "Abr", amount: 1200 },
    { name: "Mai", amount: 1100 },
    { name: "Jun", amount: 1800 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Relatórios</h1>
          <p className="text-muted-foreground">Visualize relatórios detalhados sobre suas finanças.</p>
        </div>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">Últimos 3 meses</SelectItem>
              <SelectItem value="6months">Últimos 6 meses</SelectItem>
              <SelectItem value="1year">Último ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Exportar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4 grid grid-cols-3 md:grid-cols-6 h-auto">
          <TabsTrigger value="overview" className="py-2">Visão Geral</TabsTrigger>
          <TabsTrigger value="income" className="py-2">Receitas</TabsTrigger>
          <TabsTrigger value="expenses" className="py-2">Despesas</TabsTrigger>
          <TabsTrigger value="savings" className="py-2">Economia</TabsTrigger>
          <TabsTrigger value="budget" className="py-2">Orçamento</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resumo Mensal</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                        })}`, '']
                      }
                    />
                    <Legend />
                    <Bar dataKey="income" name="Receitas" fill="#2ECC71" />
                    <Bar dataKey="expenses" name="Despesas" fill="#E74C3C" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Despesas por Categoria</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Valor']}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Economia Mensal</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={savingsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                        })}`, 'Economia']
                      }
                    />
                    <Legend />
                    <Area type="monotone" dataKey="amount" name="Economia" fill="#3498DB" stroke="#3498DB" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="income">
          <IncomeTabContent />
        </TabsContent>

        {/* Placeholders para os outros tabs */}
        <TabsContent value="expenses">
          <ExpenseTabContent />
        </TabsContent>

        <TabsContent value="savings">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Análise de Economia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Selecione o período para ver a análise detalhada de economia.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Análise de Orçamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Selecione o período para ver a análise detalhada de orçamento.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Análise de Tendências</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Selecione o período para ver a análise detalhada de tendências.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
