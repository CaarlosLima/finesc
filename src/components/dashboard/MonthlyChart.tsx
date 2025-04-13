
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface MonthlyChartProps {
  data: Array<{
    name: string;
    income: number;
    expenses: number;
  }>;
}

const MonthlyChart = ({ data }: MonthlyChartProps) => {
  return (
    <Card className="col-span-2 h-[400px]">
      <CardHeader>
        <CardTitle className="text-lg">Receitas vs Despesas</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
            <Bar dataKey="income" name="Receitas" fill="#1D9B4A" />
            <Bar dataKey="expenses" name="Despesas" fill="#E74C3C" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MonthlyChart;
