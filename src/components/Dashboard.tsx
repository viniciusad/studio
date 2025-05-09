'use client';

import {useState, useCallback} from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';
import {format, parseISO} from 'date-fns';
import {ptBR} from 'date-fns/locale';
import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Transaction} from "@/data/mock";
import {Edit, Trash2} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger} from "@/components/ui/alert-dialog";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {mockData as initialMockData} from "@/data/mock";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {ChevronDown} from "lucide-react";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

// Function to generate distinct colors for pie charts
const generateColors = (count: number, baseColor: string = 'hsl(139, 78%, 32%)') => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const hue = (i * 360 / count) % 360;
    colors.push(`hsl(${hue}, 70%, 50%)`);
  }
  return colors;
};

interface DashboardProps {
  mockData: Transaction[];
}

const Dashboard = ({mockData: initialData}: DashboardProps) => {
  const [fromDate, setFromDate] = useState<Date | undefined>(new Date(new Date().getFullYear(), 0, 1));
  const [toDate, setToDate] = useState<Date | undefined>(new Date());

  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [dateGranularity, setDateGranularity] = useState('month');
  const [mockData, setMockData] = useState<Transaction[]>(initialData);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  //Edit form
  const [editDate, setEditDate] = useState<Date | undefined>(new Date());
  const [editCategory, setEditCategory] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState<keyof Transaction | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Pagination for full data table
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleDateRangeChange = useCallback((from: Date | undefined, to: Date | undefined) => {
    setFromDate(from);
    setToDate(to);
  }, []);

  const handleCategoryFilterChange = useCallback((value: string | null) => {
    setFilterCategory(value === 'null' ? null : value);
  }, []);

  const handleTypeFilterChange = useCallback((value: string | null) => {
    setFilterType(value === 'null' ? null : value);
  }, []);

  const handleDateGranularityChange = useCallback((value: string) => {
    setDateGranularity(value);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFromDate(new Date(new Date().getFullYear(), 0, 1));
    setToDate(new Date());
    setFilterCategory(null);
    setFilterType(null);
    setDateGranularity('month');
  }, []);

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setEditDate(parseISO(transaction.date));
    setEditCategory(transaction.category);
    setEditDescription(transaction.description);
    setEditAmount(transaction.amount.toString());
    setEditModalOpen(true);
  };

  const handleConfirmEdit = () => {
    if (selectedTransaction && editDate && editCategory && editDescription && editAmount) {
      const updatedTransaction: Transaction = {
        date: format(editDate, 'yyyy-MM-dd'),
        category: editCategory,
        type: selectedTransaction.type,
        description: editDescription,
        amount: parseFloat(editAmount),
      };

      setMockData(mockData.map(item =>
        item.date === selectedTransaction.date && item.description === selectedTransaction.description ? updatedTransaction : item
      ));

      setEditDate(new Date());
      setEditCategory('');
      setEditDescription('');
      setEditAmount('');
      setEditModalOpen(false);
      setSelectedTransaction(null);
    }
  };

  const handleCancelEdit = () => {
    setEditModalOpen(false);
    setSelectedTransaction(null);
  };

  const handleRemove = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedTransaction) {
      setMockData(mockData.filter(item =>
        !(item.date === selectedTransaction.date && item.description === selectedTransaction.description)
      ));
      setDeleteConfirmationOpen(false);
      setSelectedTransaction(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
    setSelectedTransaction(null);
  };

  const categories = [...new Set(initialData.map(item => item.category))];
  const types = [...new Set(initialData.map(item => item.type))];

  const entradaColor = '#2E7D32'; // Mais escuro que o verde padrão
  const saidaColor = '#C62828'; // Mais escuro que o vermelho padrão

  const saldo = mockData.filter(item => {
    const itemDate = parseISO(item.date);
    return (!fromDate || itemDate >= fromDate) && (!toDate || itemDate <= toDate) &&
      (!filterCategory || item.category === filterCategory) &&
      (!filterType || item.type === filterType);
  }).reduce((acc, item) => item.type === 'Entrada' ? acc + item.amount : acc - item.amount, 0);

  const totalEntradas = mockData.filter(item => {
    const itemDate = parseISO(item.date);
    return (!fromDate || itemDate >= fromDate) && (!toDate || itemDate <= toDate) && item.type === 'Entrada' &&
      (!filterCategory || item.category === filterCategory);
  }).reduce((sum, item) => sum + item.amount, 0);

  const totalSaidas = mockData.filter(item => {
    const itemDate = parseISO(item.date);
    return (!fromDate || itemDate >= fromDate) && (!toDate || itemDate <= toDate) && item.type === 'Saída' &&
      (!filterCategory || item.category === filterCategory);
  }).reduce((sum, item) => sum + item.amount, 0);

  const saldoColor = saldo > 0 ? 'bg-green-100' : saldo < 0 ? 'bg-red-100' : 'bg-red-100';

  const handleSort = (column: keyof Transaction) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const formattedDateFrom = fromDate ? format(fromDate, 'yyyy-MM-dd') : '';
  const formattedDateTo = toDate ? format(toDate, 'yyyy-MM-dd') : '';

  const filteredData = [...mockData].filter(item => {
    const itemDate = parseISO(item.date);
    if (fromDate && toDate && (itemDate < fromDate || itemDate > toDate)) {
      return false;
    }
    if (filterCategory && filterCategory !== null && item.category !== filterCategory) {
      return false;
     }
    if (filterType && filterType !== null && item.type !== filterType) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortColumn) {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      } else {
        return 0;
      }
    }
    return 0;
  });

  const areaChartData = filteredData.reduce((acc: any, item) => {
    const date = parseISO(item.date);
    let formattedDate: string;

    switch (dateGranularity) {
      case 'day':
        formattedDate = format(date, 'dd/MM/yyyy', {locale: ptBR});
        break;
      case 'week':
        formattedDate = format(date, 'RRRR - II', {locale: ptBR});
        break;
      case 'month':
        formattedDate = format(date, 'MM/yyyy', {locale: ptBR});
        break;
      case 'year':
        formattedDate = format(date, 'yyyy', {locale: ptBR});
        break;
      default:
        formattedDate = format(date, 'MM/yyyy', {locale: ptBR});
    }

    const existingDateEntry = acc.find((entry: any) => entry.date === formattedDate);

    if (existingDateEntry) {
      if (item.type === 'Entrada') {
        existingDateEntry.entradas += item.amount;
      } else {
        existingDateEntry.saidas += item.amount;
      }
    } else {
      acc.push({
        date: formattedDate,
        entradas: item.type === 'Entrada' ? item.amount : 0,
        saidas: item.type === 'Saída' ? item.amount : 0,
      });
    }

    return acc;
  }, []).sort((a: any, b: any) => {
    const dateA = parseISO(`2000-${a.date.substring(0, 2)}-01`);
    const dateB = parseISO(`2000-${b.date.substring(0, 2)}-01`);
    return dateA.getTime() - dateB.getTime();
  });

  const categoryPieChartData = filteredData.reduce((acc: any, item) => {
    const existingCategory = acc.find((entry: any) => entry.name === item.category);
    if (existingCategory) {
      existingCategory.value += item.amount;
    } else {
      acc.push({name: item.category, value: item.amount});
    }
    return acc;
  }, []);

  const typePieChartData = filteredData.reduce((acc: any, item) => {
    const existingType = acc.find((entry: any) => entry.name === item.type);
    if (existingType) {
      existingType.value += item.amount;
    } else {
      acc.push({name: item.type, value: item.amount});
    }
    return acc;
  }, []);

  const categoriesList = [...new Set(initialData.map(item => item.category))];
  const typesList = [...new Set(initialData.map(item => item.type))];

  const categoryColors = generateColors(categoryPieChartData.length);
  const typeColors = generateColors(typePieChartData.length);

  // Pagination calculation
  const totalItems = mockData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedData = mockData.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="mb-4 flex flex-wrap items-center gap-2 md:flex-row md:space-x-4">
        <div className="w-full md:w-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-[200px] justify-start text-left font-normal',
                  !fromDate && 'text-muted-foreground'
                )}
              >
                {fromDate ? (
                  format(fromDate, 'dd/MM/yyyy', {locale: ptBR}) + ' - ' + format(toDate!, 'dd/MM/yyyy', {locale: ptBR})
                ) : (
                  <span>Selecione o intervalo de datas</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-center font-semibold">De</p>
                  <Calendar
                    mode="single"
                    defaultMonth={fromDate}
                    selected={fromDate}
                    onSelect={setFromDate}
                    disabled={false}
                  />
                </div>
                <div>
                  <p className="text-center font-semibold">Até</p>
                  <Calendar
                    mode="single"
                    defaultMonth={toDate}
                    selected={toDate}
                    onSelect={setToDate}
                    disabled={false}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="w-full md:w-auto">
          <Select onValueChange={handleCategoryFilterChange} defaultValue={filterCategory || undefined} className="max-w-[180px] w-full">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filtrar por categoria"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={null}>Todas as Categorias</SelectItem>
              {categoriesList.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-auto">
          <Select onValueChange={handleTypeFilterChange} defaultValue={filterType || undefined} className="max-w-[180px] w-full">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filtrar por tipo"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={null}>Todos os Tipos</SelectItem>
              {typesList.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-auto">
          <Select onValueChange={handleDateGranularityChange} className="max-w-[180px] w-full">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Granularidade da Data"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Dia</SelectItem>
              <SelectItem value="week">Semana</SelectItem>
              <SelectItem value="month">Mês</SelectItem>
              <SelectItem value="year">Ano</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-auto">
          <Button variant="outline" onClick={handleClearFilters} className="w-full max-w-[180px]">
            Limpar Filtros
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className={cn("rounded-lg p-4", saldoColor)}>
          <h2 className="font-bold mb-2">Saldo</h2>
          <p>R$ {saldo.toFixed(2)}</p>
        </div>
        <div className="rounded-lg p-4 bg-green-100">
          <h2 className="font-bold mb-2">Total de Entradas</h2>
          <p>R$ {totalEntradas.toFixed(2)}</p>
        </div>
        <div className="rounded-lg p-4 bg-red-100">
          <h2 className="font-bold mb-2">Total de Saídas</h2>
          <p>R$ {totalSaidas.toFixed(2)}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="font-bold mb-2">Evolução de Entradas e Saídas</h2>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={areaChartData}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="date"/>
            <YAxis/>
            <Tooltip
              formatter={(value: number) => `R$ ${value.toFixed(2)}`}
              labelFormatter={(value: string) => `Data: ${value}`}
            />
            <Legend/>
            <Area type="monotone" dataKey="entradas" stackId="1" stroke={entradaColor} fill={entradaColor}
                  name="Entradas"/>
            <Area type="monotone" dataKey="saidas" stackId="1" stroke={saidaColor} fill={saidaColor}
                  name="Saídas"/>
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="font-bold mb-2">Distribuição por Categoria</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                dataKey="value"
                isAnimationActive={true}
                data={categoryPieChartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({cx, cy, midAngle, innerRadius, outerRadius, percent, index}: any) => {
                  const RADIAN = Math.PI / 180;
                  const radius = 25 + outerRadius;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      fill="black"
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                    >
                      {`${categoryPieChartData[index].name} ${(percent * 100).toFixed(0)}%`}
                    </text>
                  );
                }}
              >
                {
                  categoryPieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={categoryColors[index % categoryColors.length]}/>
                  ))
                }
              </Pie>
              <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`}/>
              <Legend/>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h2 className="font-bold mb-2">Distribuição por Tipo</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                dataKey="value"
                isAnimationActive={true}
                data={typePieChartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({cx, cy, midAngle, innerRadius, outerRadius, percent, index}: any) => {
                  const RADIAN = Math.PI / 180;
                  const radius = 25 + outerRadius;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      fill="black"
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                    >
                      {`${typePieChartData[index].name} ${(percent * 100).toFixed(0)}%`}
                    </text>
                  );
                }}
              >
                {
                  typePieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === 'Entrada' ? entradaColor : saidaColor}/>
                  ))
                }
              </Pie>
              <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`}/>
              <Legend/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/*Transactions table section*/}
      <div className="container mx-auto mt-8 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">Transações Filtradas</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]" onClick={() => handleSort('date')}>Data</TableHead>
              <TableHead onClick={() => handleSort('category')}>Categoria</TableHead>
              <TableHead onClick={() => handleSort('type')}>Tipo</TableHead>
              <TableHead onClick={() => handleSort('description')}>Descrição</TableHead>
              <TableHead className="text-right" onClick={() => handleSort('amount')}>Valor</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map(item => (
              <TableRow key={item.date + item.description}>
                <TableCell className="font-medium">{format(parseISO(item.date), 'dd/MM/yyyy', {locale: ptBR})}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell className="text-right">R$ {item.amount.toFixed(2)}</TableCell>
                <TableCell className="text-center">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                    <Edit className="h-4 w-4"/>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleRemove(item)}>
                    <Trash2 className="h-4 w-4"/>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Accordion type="single" collapsible>
        <AccordionItem value="all-transactions">
          <AccordionTrigger>
            <h2 className="text-2xl font-bold mb-4">Todas as Transações</h2>
          </AccordionTrigger>
          <AccordionContent>
            <div className="container mx-auto mt-8 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]" onClick={() => handleSort('date')}>Data</TableHead>
                    <TableHead onClick={() => handleSort('category')}>Categoria</TableHead>
                    <TableHead onClick={() => handleSort('type')}>Tipo</TableHead>
                    <TableHead onClick={() => handleSort('description')}>Descrição</TableHead>
                    <TableHead className="text-right" onClick={() => handleSort('amount')}>Valor</TableHead>
                    <TableHead className="text-center">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map(item => (
                    <TableRow key={item.date + item.description}>
                      <TableCell className="font-medium">{format(parseISO(item.date), 'dd/MM/yyyy', {locale: ptBR})}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell className="text-right">R$ {item.amount.toFixed(2)}</TableCell>
                       <TableCell className="text-center">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                    <Edit className="h-4 w-4"/>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleRemove(item)}>
                    <Trash2 className="h-4 w-4"/>
                  </Button>
                </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-between items-center mt-4">
                <Button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="sm"
                >
                  Anterior
                </Button>
                <span>Página {currentPage} de {totalPages}</span>
                <Button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  size="sm"
                >
                  Próximo
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/*Delete Confirmation Modal*/}
      <AlertDialog open={deleteConfirmationOpen} onOpenChange={setDeleteConfirmationOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Remoção</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover esta transação?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelDelete}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/*Edit Modal*/}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Transação</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editDate" className="text-right">
                Data
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-[200px] justify-start text-left font-normal',
                      !editDate && 'text-muted-foreground'
                    )}
                  >
                    {editDate ? format(editDate, 'dd/MM/yyyy', {locale: ptBR}) : <span>Selecione a data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    defaultMonth={editDate}
                    selected={editDate}
                    onSelect={setEditDate}
                    disabled={false}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editCategory" className="text-right">
                Categoria
              </Label>
              <Input
                id="editCategory"
                className="col-span-3"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editDescription" className="text-right">
                Descrição
              </Label>
              <Input
                id="editDescription"
                className="col-span-3"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editAmount" className="text-right">
                Valor
              </Label>
              <Input
                id="editAmount"
                type="number"
                className="col-span-3"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={handleConfirmEdit}>Salvar</Button>
          <Button type="button" variant="secondary" onClick={handleCancelEdit}>Cancelar</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
