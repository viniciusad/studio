'use client';

import {useState} from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {Button} from '@/components/ui/button';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {cn} from '@/lib/utils';
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger} from '@/components/ui/alert-dialog';
import {format, parseISO} from 'date-fns';
import {ptBR} from 'date-fns/locale';

// Mock data for charts and table
const mockData = [
  {
    date: '2024-01-01',
    category: 'Alimentação',
    type: 'Saída',
    description: 'Mercado',
    amount: 150,
  },
  {
    date: '2024-01-05',
    category: 'Salário',
    type: 'Entrada',
    description: 'Pagamento',
    amount: 3000,
  },
  {
    date: '2024-01-10',
    category: 'Lazer',
    type: 'Saída',
    description: 'Cinema',
    amount: 80,
  },
  {
    date: '2024-01-15',
    category: 'Contas',
    type: 'Saída',
    description: 'Aluguel',
    amount: 1200,
  },
  {
    date: '2024-01-20',
    category: 'Salário',
    type: 'Entrada',
    description: 'Freelance',
    amount: 500,
  },
  {
    date: '2024-01-25',
    category: 'Transporte',
    type: 'Saída',
    description: 'Gasolina',
    amount: 200,
  },
  {
    date: '2024-01-30',
    category: 'Alimentação',
    type: 'Saída',
    description: 'Restaurante',
    amount: 120,
  },
  {
    date: '2024-02-01',
    category: 'Salário',
    type: 'Entrada',
    description: 'Pagamento',
    amount: 3000,
  },
  {
    date: '2024-02-05',
    category: 'Lazer',
    type: 'Saída',
    description: 'Show',
    amount: 250,
  },
  {
    date: '2024-02-10',
    category: 'Contas',
    type: 'Saída',
    description: 'Condomínio',
    amount: 800,
  },
  {
    date: '2024-02-15',
    category: 'Salário',
    type: 'Entrada',
    description: 'Freelance',
    amount: 600,
  },
  {
    date: '2024-02-20',
    category: 'Transporte',
    type: 'Saída',
    description: 'Uber',
    amount: 100,
  },
  {
    date: '2024-02-25',
    category: 'Alimentação',
    type: 'Saída',
    description: 'Mercado',
    amount: 180,
  },
  {
    date: '2024-03-01',
    category: 'Salário',
    type: 'Entrada',
    description: 'Pagamento',
    amount: 3000,
  },
  {
    date: '2024-03-05',
    category: 'Lazer',
    type: 'Saída',
    description: 'Viagem',
    amount: 1000,
  },
  {
    date: '2024-03-10',
    category: 'Contas',
    type: 'Saída',
    description: 'Internet',
    amount: 150,
  },
  {
    date: '2024-03-15',
    category: 'Salário',
    type: 'Entrada',
    description: 'Freelance',
    amount: 700,
  },
  {
    date: '2024-03-20',
    category: 'Transporte',
    type: 'Saída',
    description: 'Ônibus',
    amount: 50,
  },
  {
    date: '2024-03-25',
    category: 'Alimentação',
    type: 'Saída',
    description: 'Restaurante',
    amount: 150,
  },
];

const Dashboard = () => {
  const [filterDate, setFilterDate] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterType, setFilterType] = useState('');
  const [dateGranularity, setDateGranularity] = useState('month'); // Default granularity

  const filteredData = mockData.filter(item => {
    if (filterDate && !item.date.includes(filterDate)) {
      return false;
    }
    if (filterCategory && item.category !== filterCategory) {
      return false;
    }
    if (filterType && item.type !== filterType) {
      return false;
    }
    return true;
  });

  // Process data for the area chart (Evolução de Entradas e Saídas)
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
  }, []);

  // Process data for the pie chart (Distribuição por Categoria)
  const pieChartData = filteredData.reduce((acc: any, item) => {
    const existingCategory = acc.find((entry: any) => entry.name === item.category);
    if (existingCategory) {
      existingCategory.value += item.amount;
    } else {
      acc.push({name: item.category, value: item.amount});
    }
    return acc;
  }, []);

  const totalEntradas = filteredData.filter(item => item.type === 'Entrada').reduce((sum, item) => sum + item.amount, 0);
  const totalSaidas = filteredData.filter(item => item.type === 'Saída').reduce((sum, item) => sum + item.amount, 0);
  const saldo = totalEntradas - totalSaidas;

  const handleDelete = () => {
    alert('Confirmar exclusão?');
    // Lógica para excluir item
  };

  const categories = [...new Set(mockData.map(item => item.category))];
  const types = [...new Set(mockData.map(item => item.type))];

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Input
          type="date"
          placeholder="Filtrar por data"
          value={filterDate}
          onChange={e => setFilterDate(e.target.value)}
          className="w-auto"
        />
        <Select onValueChange={setFilterCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por categoria"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todas as Categorias</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category || ''}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por tipo"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos os Tipos</SelectItem>
            {types.map(type => (
              <SelectItem key={type} value={type || ''}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setDateGranularity}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Granularidade da Data"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Dia</SelectItem>
            <SelectItem value="week">Semana</SelectItem>
            <SelectItem value="month">Mês</SelectItem>
            <SelectItem value="year">Ano</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={() => {
          setFilterDate('');
          setFilterCategory('');
          setFilterType('');
          setDateGranularity('month');
        }}>
          Limpar Filtros
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-secondary rounded-lg p-4">
          <h2 className="font-bold mb-2">Saldo</h2>
          <p>R$ {saldo.toFixed(2)}</p>
        </div>
        <div className="bg-secondary rounded-lg p-4">
          <h2 className="font-bold mb-2">Total de Entradas</h2>
          <p>R$ {totalEntradas.toFixed(2)}</p>
        </div>
        <div className="bg-secondary rounded-lg p-4">
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
            <Area type="monotone" dataKey="entradas" stackId="1" stroke="#82ca9d" fill="#82ca9d"
                  name="Entradas"/>
            <Area type="monotone" dataKey="saidas" stackId="1" stroke="#e4717a" fill="#e4717a"
                  name="Saídas"/>
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-8">
        <h2 className="font-bold mb-2">Distribuição por Categoria</h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={pieChartData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
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
                    {`${pieChartData[index].name} ${(percent * 100).toFixed(0)}%`}
                  </text>
                );
              }}
            />
            <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`}/>
            <Legend/>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h2 className="font-bold mb-2">Detalhes das Transações</h2>
        <Table>
          <TableCaption>Lista detalhada de todas as transações.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead className="text-right">Valor</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map(item => (
              <TableRow key={item.date + item.description}>
                <TableCell>{format(parseISO(item.date), 'dd/MM/yyyy', {locale: ptBR})}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell className="text-right">R$ {item.amount.toFixed(2)}</TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <span>Editar</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Editar Transação</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date" className="text-right">
                              Data
                            </Label>
                            <Input id="date" defaultValue={item.date} className="col-span-3"/>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">
                              Categoria
                            </Label>
                            <Input id="category" defaultValue={item.category} className="col-span-3"/>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">
                              Tipo
                            </Label>
                            <Input id="type" defaultValue={item.type} className="col-span-3"/>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                              Descrição
                            </Label>
                            <Input id="description" defaultValue={item.description} className="col-span-3"/>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="amount" className="text-right">
                              Valor
                            </Label>
                            <Input id="amount" defaultValue={item.amount} className="col-span-3"/>
                          </div>
                        </div>
                        <Button type="submit">Salvar</Button>
                      </DialogContent>
                    </Dialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <span>Deletar</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta ação é irreversível. Tem certeza que deseja excluir esta transação?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDelete}>Confirmar</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
