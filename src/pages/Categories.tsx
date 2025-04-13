
import React, { useState } from "react";
import { Edit, Utensils, Home, Trash, Plus, Car, Gamepad, Briefcase, TrendingUp, CircleDollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { toast } from "@/hooks/use-toast";

type CategoryType = "receita" | "despesa";

interface Category {
  id: number;
  name: string;
  type: CategoryType;
  color: string;
  icon: React.ReactNode;
  count: number;
}

const Categories = () => {
  const [filter, setFilter] = useState<"all" | "receita" | "despesa">("all");

  const categories: Category[] = [
    { id: 1, name: "Alimentação", type: "despesa", color: "#f97316", icon: <Utensils size={18} />, count: 24 },
    { id: 2, name: "Transporte", type: "despesa", color: "#0ea5e9", icon: <Car size={18} />, count: 15 },
    { id: 3, name: "Moradia", type: "despesa", color: "#9b87f5", icon: <Home size={18} />, count: 8 },
    { id: 4, name: "Lazer", type: "despesa", color: "#e879f9", icon: <Gamepad size={18} />, count: 18 },
    { id: 5, name: "Salário", type: "receita", color: "#10b981", icon: <CircleDollarSign size={18} />, count: 12 },
    { id: 6, name: "Investimentos", type: "receita", color: "#10b981", icon: <TrendingUp size={18} />, count: 15 },
    { id: 7, name: "Freelance", type: "receita", color: "#9b87f5", icon: <Briefcase size={18} />, count: 6 },
  ];

  const filteredCategories = categories.filter(category => {
    if (filter === "all") return true;
    return category.type === filter;
  });

  const handleDelete = (id: number) => {
    // In a real app, this would call an API to delete the category
    toast({
      title: "Categoria excluída",
      description: "A categoria foi excluída com sucesso"
    });
  };

  const handleEdit = (id: number) => {
    // In a real app, this would open an edit modal
    toast({
      title: "Editar categoria",
      description: "Funcionalidade para editar será implementada em breve"
    });
  };

  const getFilterCounts = () => {
    const all = categories.length;
    const receitas = categories.filter(c => c.type === "receita").length;
    const despesas = categories.filter(c => c.type === "despesa").length;
    
    return { all, receitas, despesas };
  };

  const counts = getFilterCounts();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Categorias</h1>
          <p className="text-muted-foreground">Gerencie as categorias para suas transações.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nova Categoria
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <CardTitle className="text-lg">Categorias</CardTitle>
              <CardDescription>Organize suas transações em categorias personalizadas</CardDescription>
            </div>
            <div className="flex gap-2">
              <ToggleGroup type="single" value={filter} onValueChange={(value) => setFilter(value as any)} className="justify-start">
                <ToggleGroupItem value="all" aria-label="Todas">
                  Todas ({counts.all})
                </ToggleGroupItem>
                <ToggleGroupItem value="receita" aria-label="Receitas">
                  Receitas ({counts.receitas})
                </ToggleGroupItem>
                <ToggleGroupItem value="despesa" aria-label="Despesas">
                  Despesas ({counts.despesas})
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Nome</TableHead>
                <TableHead className="w-[150px]">Tipo</TableHead>
                <TableHead className="w-[100px]">Cor</TableHead>
                <TableHead className="w-[100px]">Ícone</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                        style={{ backgroundColor: category.color }}
                      >
                        {category.icon}
                      </div>
                      <div>
                        <span>{category.name}</span>
                        <div>
                          <Badge variant="outline" className="mt-1">{category.count} transações</Badge>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={category.type === "receita" ? "outline" : "secondary"} 
                      className={category.type === "receita" ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"}>
                      {category.type === "receita" ? "Receita" : "Despesa"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div 
                      className="w-6 h-6 rounded"
                      style={{ backgroundColor: category.color }}
                    />
                  </TableCell>
                  <TableCell>
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                      style={{ backgroundColor: category.color }}
                    >
                      {category.icon}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(category.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Excluir Categoria</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir a categoria "{category.name}"? Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(category.id)}>
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Categories;
