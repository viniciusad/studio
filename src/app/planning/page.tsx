'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger} from '@/components/ui/alert-dialog';

const PlanningPage = () => {
  const [openOrcamento, setOpenOrcamento] = useState(false);
  const [openMetas, setOpenMetas] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleSave = () => {
    setConfirmOpen(true);
  };

  const handleConfirmSave = () => {
    alert('Salvo com sucesso!');
    setConfirmOpen(false);
    setOpenOrcamento(false);
    setOpenMetas(false);
  };

  const handleCancelSave = () => {
    setConfirmOpen(false);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Planejamento</h1>
      <p>Gerencie seu planejamento financeiro aqui.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/*Orçamentos Modal*/}
        <div>
          <Dialog open={openOrcamento} onOpenChange={setOpenOrcamento}>
            <DialogTrigger asChild>
              <Button variant="outline">Orçamentos de Ganhos e Gastos</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar Orçamento</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="descricao" className="text-right">
                    Descrição
                  </Label>
                  <Input id="descricao" className="col-span-3"/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="valor" className="text-right">
                    Valor
                  </Label>
                  <Input id="valor" type="number" className="col-span-3"/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tipo" className="text-right">
                    Tipo
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ganho">Ganho</SelectItem>
                      <SelectItem value="gasto">Gasto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="data" className="text-right">
                    Data
                  </Label>
                  <Input id="data" type="date" className="col-span-3"/>
                </div>
              </div>
              <Button onClick={handleSave}>Salvar</Button>
              <Button type="button" variant="secondary" onClick={() => setOpenOrcamento(false)}>Cancelar</Button>
            </DialogContent>
          </Dialog>
        </div>

        {/*Metas Modal*/}
        <div>
          <Dialog open={openMetas} onOpenChange={setOpenMetas}>
            <DialogTrigger asChild>
              <Button variant="outline">Metas</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar Meta</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="descricao" className="text-right">
                    Descrição
                  </Label>
                  <Input id="descricao" className="col-span-3"/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="valor" className="text-right">
                    Valor
                  </Label>
                  <Input id="valor" type="number" className="col-span-3"/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="prazo" className="text-right">
                    Prazo
                  </Label>
                  <Input id="prazo" type="date" className="col-span-3"/>
                </div>
              </div>
              <Button onClick={handleSave}>Salvar</Button>
              <Button type="button" variant="secondary" onClick={() => setOpenMetas(false)}>Cancelar</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Salvar</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja salvar este planejamento?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelSave}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmSave}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PlanningPage;
