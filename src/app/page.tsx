'use client';

import Dashboard from '@/components/Dashboard';
import Navbar from '@/components/Navbar';
import {useState} from 'react';
import {Sheet, SheetContent, SheetHeader, SheetTitle} from '@/components/ui/sheet';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {cn} from "@/lib/utils";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {format} from "date-fns";
import {ptBR} from "date-fns/locale";
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger} from "@/components/ui/alert-dialog";
import {mockData as initialMockData, Transaction} from "@/data/mock";
import {
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {parseISO} from "date-fns";
import {Edit, Trash2} from "lucide-react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";

export default function Home() {
  const [entriesOpen, setEntriesOpen] = useState(false);
  const [exitsOpen, setExitsOpen] = useState(false);
  const [planningOpen, setPlanningOpen] = useState(false);
  const [extrasOpen, setExtrasOpen] = useState(false);
  const [cadastrosOpen, setCadastrosOpen] = useState(false);

  //Entry form
  const [entryDate, setEntryDate] = useState<Date | undefined>(new Date());
  const [entryCategory, setEntryCategory] = useState('');
  const [entryDescription, setEntryDescription] = useState('');
  const [entryAmount, setEntryAmount] = useState('');
  const [confirmEntryOpen, setConfirmEntryOpen] = useState(false);

  //Exit form
  const [exitDate, setExitDate] = useState<Date | undefined>(new Date());
  const [exitCategory, setExitCategory] = useState('');
  const [exitDescription, setExitDescription] = useState('');
  const [exitAmount, setExitAmount] = useState('');
  const [confirmExitOpen, setConfirmExitOpen] = useState(false);

  const [mockData, setMockData] = useState<Transaction[]>(initialMockData);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  //Edit form
  const [editDate, setEditDate] = useState<Date | undefined>(new Date());
  const [editCategory, setEditCategory] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const handleEntrySave = () => {
    setConfirmEntryOpen(true);
  };

  const handleConfirmEntrySave = () => {
    if (entryDate && entryCategory && entryDescription && entryAmount) {
      const newEntry: Transaction = {
        date: format(entryDate, 'yyyy-MM-dd'),
        category: entryCategory,
        type: 'Entrada',
        description: entryDescription,
        amount: parseFloat(entryAmount),
      };

      setMockData([...mockData, newEntry]);
      setEntryDate(new Date());
      setEntryCategory('');
      setEntryDescription('');
      setEntryAmount('');
    }

    setConfirmEntryOpen(false);
    setEntriesOpen(false);
  };

  const handleCancelEntrySave = () => {
    setConfirmEntryOpen(false);
  };

  const handleExitSave = () => {
    setConfirmExitOpen(true);
  };

  const handleConfirmExitSave = () => {
    if (exitDate && exitCategory && exitDescription && exitAmount) {
      const newExit: Transaction = {
        date: format(exitDate, 'yyyy-MM-dd'),
        category: exitCategory,
        type: 'Saída',
        description: exitDescription,
        amount: parseFloat(exitAmount),
      };

      setMockData([...mockData, newExit]);
      setExitDate(new Date());
      setExitCategory('');
      setExitDescription('');
      setExitAmount('');
    }

    setConfirmExitOpen(false);
    setExitsOpen(false);
  };

  const handleCancelExitSave = () => {
    setConfirmExitOpen(false);
  };

  //Edit/Delete functionality
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

  return (
    <>
      <Navbar
        setEntriesOpen={setEntriesOpen}
        setExitsOpen={setExitsOpen}
        setPlanningOpen={setPlanningOpen}
        setExtrasOpen={setExtrasOpen}
        setCadastrosOpen={setCadastrosOpen}
      />
      <main className="container mx-auto mt-8">
        <Dashboard mockData={mockData}/>
      </main>

      {/*Entradas Modal*/}
      <Sheet open={entriesOpen} onOpenChange={setEntriesOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Adicionar Entrada</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Data
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-[200px] justify-start text-left font-normal',
                      !entryDate && 'text-muted-foreground'
                    )}
                  >
                    {entryDate ? format(entryDate, 'dd/MM/yyyy', {locale: ptBR}) : <span>Selecione a data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    defaultMonth={entryDate}
                    selected={entryDate}
                    onSelect={setEntryDate}
                    disabled={false}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Categoria
              </Label>
              <Input
                id="category"
                className="col-span-3"
                value={entryCategory}
                onChange={(e) => setEntryCategory(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descrição
              </Label>
              <Input
                id="description"
                className="col-span-3"
                value={entryDescription}
                onChange={(e) => setEntryDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Valor
              </Label>
              <Input
                id="amount"
                type="number"
                className="col-span-3"
                value={entryAmount}
                onChange={(e) => setEntryAmount(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={handleEntrySave}>Salvar</Button>
          <Button type="button" variant="secondary" onClick={() => setEntriesOpen(false)}>
            Cancelar
          </Button>
        </SheetContent>
      </Sheet>

      {/*Saídas Modal*/}
      <Sheet open={exitsOpen} onOpenChange={setExitsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Adicionar Saída</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Data
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-[200px] justify-start text-left font-normal',
                      !exitDate && 'text-muted-foreground'
                    )}
                  >
                    {exitDate ? format(exitDate, 'dd/MM/yyyy', {locale: ptBR}) : <span>Selecione a data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    defaultMonth={exitDate}
                    selected={exitDate}
                    onSelect={setExitDate}
                    disabled={false}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Categoria
              </Label>
              <Input
                id="category"
                className="col-span-3"
                value={exitCategory}
                onChange={(e) => setExitCategory(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descrição
              </Label>
              <Input
                id="description"
                className="col-span-3"
                value={exitDescription}
                onChange={(e) => setExitDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Valor
              </Label>
              <Input
                id="amount"
                type="number"
                className="col-span-3"
                value={exitAmount}
                onChange={(e) => setExitAmount(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={handleExitSave}>Salvar</Button>
          <Button type="button" variant="secondary" onClick={() => setExitsOpen(false)}>Cancelar</Button>
        </SheetContent>
      </Sheet>

      {/*Planejamento Modal*/}
      <Sheet open={planningOpen} onOpenChange={setPlanningOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Planejamento</SheetTitle>
          </SheetHeader>
          <div>
            <p>Tela de planejamento - Campos a serem definidos</p>
            {/*Adicione aqui o conteúdo do seu modal de planejamento*/}
          </div>
        </SheetContent>
      </Sheet>

      {/*Extras Modal*/}
      <Sheet open={extrasOpen} onOpenChange={setExtrasOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Extras</SheetTitle>
          </SheetHeader>
          <div>
            <p>Tela de extras - Campos a serem definidos</p>
            {/*Adicione aqui o conteúdo do seu modal de extras*/}
          </div>
        </SheetContent>
      </Sheet>

      {/*Cadastros Modal*/}
      <Sheet open={cadastrosOpen} onOpenChange={setCadastrosOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Cadastros</SheetTitle>
          </SheetHeader>
          <div>
            <p>Tela de cadastros - Campos a serem definidos</p>
            {/*Adicione aqui o conteúdo do seu modal de cadastros*/}
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog open={confirmEntryOpen} onOpenChange={setConfirmEntryOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Salvar</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja salvar esta entrada?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelEntrySave}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmEntrySave}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={confirmExitOpen} onOpenChange={setConfirmExitOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Salvar</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja salvar esta saída?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelExitSave}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmExitSave}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/*Delete COnfirmation Modal*/}
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

      {/*Transactions table section*/}
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Transações Salvas</h2>
        <Table>
          <TableCaption>Lista detalhada de todas as transações salvas.</TableCaption>
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
            {mockData.map(item => (
              <TableRow key={item.date + item.description}>
                <TableCell>{format(parseISO(item.date), 'dd/MM/yyyy', {locale: ptBR})}</TableCell>
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
    </>
  );
}
