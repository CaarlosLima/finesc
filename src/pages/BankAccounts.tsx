
import { useState } from "react";
import { Banknote, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

interface BankAccount {
  id: string;
  name: string;
  balance: number;
  type: string;
}

const BankAccounts = () => {
  const { toast } = useToast();
  const [accounts, setAccounts] = useState<BankAccount[]>([
    {
      id: "1",
      name: "Conta Corrente Principal",
      balance: 5000,
      type: "Corrente",
    },
    {
      id: "2",
      name: "Poupança",
      balance: 10000,
      type: "Poupança",
    },
    {
      id: "3",
      name: "Investimentos",
      balance: 20000,
      type: "Investimento",
    },
  ]);

  const handleAddAccount = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "Adicionar conta bancária será implementado em breve.",
    });
  };

  const handleEditAccount = (id: string) => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "Editar conta bancária será implementado em breve.",
    });
  };

  const handleDeleteAccount = (id: string) => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "Excluir conta bancária será implementado em breve.",
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Contas Bancárias</h1>
        <Button onClick={handleAddAccount}>
          <Plus className="mr-2 h-4 w-4" /> Adicionar Conta
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Contas</CardTitle>
          <CardDescription>
            Visualize e gerencie suas contas bancárias
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Saldo</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Banknote className="mr-2 h-4 w-4 text-primary" />
                      {account.name}
                    </div>
                  </TableCell>
                  <TableCell>{account.type}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(account.balance)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditAccount(account.id)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteAccount(account.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Total: {accounts.length} contas
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BankAccounts;
