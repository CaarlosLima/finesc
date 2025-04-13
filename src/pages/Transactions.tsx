
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  ArrowDownRight,
  ArrowUpDown,
  ArrowUpRight,
  Calendar,
  Filter,
  Plus,
  Search,
  Upload
} from "lucide-react";
import { useState } from "react";

const transactionsData = [
  { id: "1", title: "Salário", amount: 5000, date: "10/06/2025", category: "Renda", type: "income" },
  { id: "2", title: "Aluguel", amount: -1500, date: "05/06/2025", category: "Moradia", type: "expense" },
  { id: "3", title: "Supermercado", amount: -350, date: "03/06/2025", category: "Alimentação", type: "expense" },
  { id: "4", title: "Investimento", amount: 1000, date: "01/06/2025", category: "Investimentos", type: "income" },
  { id: "5", title: "Restaurante", amount: -120, date: "02/06/2025", category: "Alimentação", type: "expense" },
  { id: "6", title: "Freelance", amount: 2000, date: "15/06/2025", category: "Renda", type: "income" },
  { id: "7", title: "Conta de Luz", amount: -180, date: "07/06/2025", category: "Utilidades", type: "expense" },
  { id: "8", title: "Academia", amount: -100, date: "01/06/2025", category: "Saúde", type: "expense" },
  { id: "9", title: "Venda item", amount: 300, date: "20/06/2025", category: "Diversos", type: "income" },
  { id: "10", title: "Internet", amount: -120, date: "08/06/2025", category: "Utilidades", type: "expense" },
];

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState(transactionsData);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const { toast } = useToast();

  // Filtra as transações com base no termo de pesquisa
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "") {
      setFilteredTransactions(transactionsData);
    } else {
      const filtered = transactionsData.filter(
        transaction =>
          transaction.title.toLowerCase().includes(term) ||
          transaction.category.toLowerCase().includes(term)
      );
      setFilteredTransactions(filtered);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (!file.name.toLowerCase().endsWith('.ofx')) {
        toast({
          title: "Formato inválido",
          description: "Por favor, selecione um arquivo no formato OFX.",
          variant: "destructive",
        });
        return;
      }

      setImportFile(file);
    }
  };

  const handleFileImport = () => {
    if (!importFile) {
      toast({
        title: "Nenhum arquivo selecionado",
        description: "Por favor, selecione um arquivo para importar.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Importação iniciada",
      description: `Processando arquivo ${importFile.name}. As transações serão importadas em breve.`,
    });

    setIsImportDialogOpen(false);
    setImportFile(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Transações</h1>
          <p className="text-muted-foreground">Visualize e gerencie todas as suas transações financeiras.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                <Upload className="mr-2 h-4 w-4" /> Importar OFX
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Importar transações</DialogTitle>
                <DialogDescription>
                  Faça upload de um arquivo OFX do seu banco para importar transações automaticamente.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="ofx-file">Arquivo OFX</Label>
                  <Input
                    id="ofx-file"
                    type="file"
                    accept=".ofx"
                    onChange={handleFileChange}
                  />
                  {importFile && (
                    <p className="text-sm text-muted-foreground">
                      Arquivo selecionado: {importFile.name}
                    </p>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleFileImport}>
                  Importar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button className="w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Nova Transação
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col md:flex-row justify-between md:items-center space-y-2 md:space-y-0 pb-4">
          <CardTitle className="text-lg">Histórico de Transações</CardTitle>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar transações..."
                className="pl-8 w-full md:w-[250px]"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">
                    <div className="flex items-center justify-end">
                      Valor <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center",
                            transaction.type === "income" ? "bg-finance-green/10" : "bg-finance-red/10")}>
                          {transaction.type === "income" ? (
                            <ArrowUpRight className="h-4 w-4 text-finance-green" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 text-finance-red" />
                          )}
                        </div>
                        {transaction.title}
                      </div>
                    </TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell className={cn("text-right font-medium",
                      transaction.amount > 0 ? "text-finance-green" : "text-finance-red")}>
                      {transaction.amount > 0 ? "+" : ""}
                      R$ {Math.abs(transaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;
