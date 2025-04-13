
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/ThemeContext";
import { useToast } from "@/hooks/use-toast";
import {
  Banknote,
  FileText,
  MoreVertical,
  Pencil,
  Plus,
  Power,
  PowerOff,
  Trash2
} from "lucide-react";
import { useState } from "react";

interface BankAccount {
  id: string;
  name: string;
  type: "Corrente" | "Poupança" | "Cartão de Crédito";
  balance: number;
  agency?: string;
  accountNumber?: string;
  cardNumber?: string;
  dueDate?: string;
  isActive: boolean;
  color: string;
  colorDark?: string;
}

const BankAccountsCards = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const [showInactive, setShowInactive] = useState(false);
  const [accounts, setAccounts] = useState<BankAccount[]>([
    {
      id: "1",
      name: "Itaú - Conta Corrente",
      type: "Corrente",
      balance: 4540.20,
      agency: "1234",
      accountNumber: "56789-0",
      isActive: true,
      color: "#00723b",
      colorDark: "#6AE099"
    },
    {
      id: "2",
      name: "Banco do Brasil - Poupança",
      type: "Poupança",
      balance: 12345.67,
      agency: "5678",
      accountNumber: "98765-4",
      isActive: true,
      color: "#1e3c64",
      colorDark: "#3498DB"
    },
    {
      id: "3",
      name: "Nubank - Cartão de Crédito",
      type: "Cartão de Crédito",
      balance: 2187.50,
      cardNumber: "**** 7390",
      dueDate: "15/05/2025",
      isActive: true,
      color: "#8a05be",
      colorDark: "#D6BCFA"
    },
    {
      id: "4",
      name: "Bradesco - Conta Corrente",
      type: "Corrente",
      balance: 3500.00,
      agency: "3456",
      accountNumber: "12345-6",
      isActive: false,
      color: "#cc092f",
      colorDark: "#E74C3C"
    }
  ]);

  const handleAddAccount = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "Adicionar conta bancária será implementado em breve.",
    });
  };

  const handleEditAccount = (id: string) => {
    toast({
      title: "Editar conta",
      description: "Funcionalidade para editar será implementada em breve.",
    });
  };

  const handleNewTransaction = (id: string) => {
    toast({
      title: "Novo lançamento",
      description: "Funcionalidade para adicionar transação será implementada em breve.",
    });
  };

  const handleStatement = (id: string) => {
    toast({
      title: "Extrato",
      description: "Visualização de extrato será implementada em breve.",
    });
  };

  const handleToggleActive = (id: string) => {
    setAccounts(accounts.map(account =>
      account.id === id
        ? { ...account, isActive: !account.isActive }
        : account
    ));

    const account = accounts.find(a => a.id === id);
    toast({
      title: account?.isActive ? "Conta inativada" : "Conta ativada",
      description: `A conta ${account?.name} foi ${account?.isActive ? "inativada" : "ativada"} com sucesso.`
    });
  };

  const handleDeleteAccount = (id: string) => {
    setAccounts(accounts.filter(account => account.id !== id));
    toast({
      title: "Conta excluída",
      description: "A conta foi excluída com sucesso.",
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const filteredAccounts = accounts.filter(account => showInactive || account.isActive);

  const getAccountIcon = (type: string) => {
    switch (type) {
      case "Corrente":
      case "Poupança":
        return <Banknote className="h-6 w-6" />;
      case "Cartão de Crédito":
        return <Banknote className="h-6 w-6" />;
      default:
        return <Banknote className="h-6 w-6" />;
    }
  };

  // Helper function to get the appropriate color based on theme
  const getCardColor = (account: BankAccount) => {
    return theme === "dark" && account.colorDark ? account.colorDark : account.color;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Contas Bancárias</h1>
          <p className="text-muted-foreground">Gerencie suas contas bancárias e cartões de crédito.</p>
        </div>
        <Button onClick={handleAddAccount}>
          <Plus className="mr-2 h-4 w-4" /> Adicionar Conta
        </Button>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Switch
            id="show-inactive"
            checked={showInactive}
            onCheckedChange={setShowInactive}
          />
          <Label htmlFor="show-inactive">Mostrar contas inativas</Label>
        </div>
        <div className="text-sm text-muted-foreground">
          Total: {filteredAccounts.length} contas
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAccounts.map((account) => (
          <Card
            key={account.id}
            className={`border-t-4 ${!account.isActive ? "opacity-60" : ""} hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/20 transition-all`}
            style={{ borderTopColor: getCardColor(account) }}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div
                    className="h-8 w-8 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: getCardColor(account) }}
                  >
                    {getAccountIcon(account.type)}
                  </div>
                  <CardTitle className="text-lg">{account.name}</CardTitle>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleStatement(account.id)}>
                      <FileText className="mr-2 h-4 w-4" /> Extrato
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleToggleActive(account.id)}>
                      {account.isActive ?
                        <><PowerOff className="mr-2 h-4 w-4" /> Inativar conta</> :
                        <><Power className="mr-2 h-4 w-4" /> Ativar conta</>
                      }
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" /> Excluir
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Excluir conta</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir esta conta? Esta ação não pode ser desfeita e todos os dados relacionados serão perdidos.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteAccount(account.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div
                className="mt-2 p-4 rounded-lg dark:shadow-inner dark:border dark:border-white/5"
                style={{
                  backgroundColor: theme === "dark" ? `rgba(${parseInt(getCardColor(account).slice(1, 3), 16)}, ${parseInt(getCardColor(account).slice(3, 5), 16)}, ${parseInt(getCardColor(account).slice(5, 7), 16)}, 0.15)` : `${account.color}15`
                }}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{account.type}</span>
                  <span className="text-2xl font-bold">{formatCurrency(account.balance)}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {account.type === "Cartão de Crédito" ? (
                    <>
                      {account.cardNumber && <>Cartão: {account.cardNumber}</>}
                      {account.dueDate && <> • Vencimento: {account.dueDate}</>}
                    </>
                  ) : (
                    <>
                      {account.agency && <>Ag: {account.agency}</>}
                      {account.accountNumber && <> • Conta: {account.accountNumber}</>}
                    </>
                  )}
                </div>
              </div>
              <div className="mt-2">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <span className={`ml-1 ${account.isActive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                      {account.isActive ? "Ativo" : "Inativo"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2 pt-0">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditAccount(account.id)}>
                <Pencil className="mr-2 h-4 w-4" /> Editar
              </Button>
              <Button variant="outline" size="sm" className="flex-1" onClick={() => handleNewTransaction(account.id)}>
                <Plus className="mr-2 h-4 w-4" /> Lançamento
              </Button>
            </CardFooter>
          </Card>
        ))}

        {/* Card for adding a new account */}
        <Card className="border-dashed hover:bg-muted/50 transition-colors cursor-pointer dark:hover:bg-muted/20" onClick={handleAddAccount}>
          <CardContent className="flex flex-col items-center justify-center p-6 h-full min-h-[220px]">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <Plus className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">Adicionar Nova Conta</h3>
            <p className="text-center text-sm text-muted-foreground">
              Cadastre uma nova conta bancária ou cartão de crédito para controlar suas finanças.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BankAccountsCards;
