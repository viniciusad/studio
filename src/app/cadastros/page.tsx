'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger} from '@/components/ui/alert-dialog';

const CadastrosPage = () => {
  const [openFonteRenda, setOpenFonteRenda] = useState(false);
  const [openGastos, setOpenGastos] = useState(false);
  const [openContasBancarias, setOpenContasBancarias] = useState(false);
  const [openCartoesCredito, setOpenCartoesCredito] = useState(false);
  const [openMetas, setOpenMetas] = useState(false);

  const handleDelete = () => {
    alert('Confirmar exclusão?');
    // Lógica para excluir item
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Cadastros</h1>
      <p>Gerencie seus cadastros financeiros aqui.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/*Fonte de Renda Modal*/}
        <div>
          <Dialog open={openFonteRenda} onOpenChange={setOpenFonteRenda}>
            <DialogTrigger asChild>
              <Button variant="outline">Fonte de Renda</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar Fonte de Renda</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="fonte" className="text-right">
                    Fonte
                  </Label>
                  <Input id="fonte" className="col-span-3"/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="valor" className="text-right">
                    Valor
                  </Label>
                  <Input id="valor" type="number" className="col-span-3"/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="data" className="text-right">
                    Data
                  </Label>
                  <Input id="data" type="date" className="col-span-3"/>
                </div>
              </div>
              <Button type="submit">Salvar</Button>
              <Button type="button" variant="secondary" onClick={() => setOpenFonteRenda(false)}>Cancelar</Button>
            </DialogContent>
          </Dialog>
        </div>

        {/*Gastos Modal*/}
        <div>
          <Dialog open={openGastos} onOpenChange={setOpenGastos}>
            <DialogTrigger asChild>
              <Button variant="outline">Gastos</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar Gasto</DialogTitle>
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
                  <Label htmlFor="categoria" className="text-right">
                    Categoria
                  </Label>
                  <Input id="categoria" className="col-span-3"/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="data" className="text-right">
                    Data
                  </Label>
                  <Input id="data" type="date" className="col-span-3"/>
                </div>
              </div>
              <Button type="submit">Salvar</Button>
              <Button type="button" variant="secondary" onClick={() => setOpenGastos(false)}>Cancelar</Button>
            </DialogContent>
          </Dialog>
        </div>

        {/*Contas Bancárias Modal*/}
        <div>
          <Dialog open={openContasBancarias} onOpenChange={setOpenContasBancarias}>
            <DialogTrigger asChild>
              <Button variant="outline">Contas Bancárias</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar Conta Bancária</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="banco" className="text-right">
                    Banco
                  </Label>
                  <Input id="banco" className="col-span-3"/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="agencia" className="text-right">
                    Agência
                  </Label>
                  <Input id="agencia" className="col-span-3"/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="conta" className="text-right">
                    Conta
                  </Label>
                  <Input id="conta" className="col-span-3"/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="saldo" className="text-right">
                    Saldo
                  </Label>
                  <Input id="saldo" type="number" className="col-span-3"/>
                </div>
              </div>
              <Button type="submit">Salvar</Button>
              <Button type="button" variant="secondary" onClick={() => setOpenContasBancarias(false)}>Cancelar</Button>
            </DialogContent>
          </Dialog>
        </div>

        {/*Cartões de Crédito Modal*/}
        <div>
          <Dialog open={openCartoesCredito} onOpenChange={setOpenCartoesCredito}>
            <DialogTrigger asChild>
              <Button variant="outline">Cartões de Crédito</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar Cartão de Crédito</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nome" className="text-right">
                    Nome
                  </Label>
                  <Input id="nome" className="col-span-3"/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="limite" className="text-right">
                    Limite
                  </Label>
                  <Input id="limite" type="number" className="col-span-3"/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="vencimento" className="text-right">
                    Vencimento
                  </Label>
                  <Input id="vencimento" type="date" className="col-span-3"/>
                </div>
              </div>
              <Button type="submit">Salvar</Button>
              <Button type="button" variant="secondary" onClick={() => setOpenCartoesCredito(false)}>Cancelar</Button>
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
              <Button type="submit">Salvar</Button>
              <Button type="button" variant="secondary" onClick={() => setOpenMetas(false)}>Cancelar</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default CadastrosPage;
