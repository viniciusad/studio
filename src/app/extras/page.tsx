'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger} from '@/components/ui/alert-dialog';

const ExtrasPage = () => {
  const [openListaMercado, setOpenListaMercado] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleSave = () => {
    setConfirmOpen(true);
  };

  const handleConfirmSave = () => {
    alert('Lista de mercado salva e enviada com sucesso!');
    setConfirmOpen(false);
    setOpenListaMercado(false);
  };

  const handleCancelSave = () => {
    setConfirmOpen(false);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Extras</h1>
      <p>Acesse funcionalidades extras aqui.</p>

      {/*Lista de Mercado Modal*/}
      <div>
        <Dialog open={openListaMercado} onOpenChange={setOpenListaMercado}>
          <DialogTrigger asChild>
            <Button variant="outline">Criar Lista de Mercado e Enviar</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Criar Lista de Mercado</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="itens" className="text-right">
                  Itens
                </Label>
                <Textarea id="itens" className="col-span-3" placeholder="Adicione os itens da sua lista, um por linha"/>
              </div>
            </div>
            <Button onClick={handleSave}>Salvar e Enviar</Button>
            <Button type="button" variant="secondary" onClick={() => setOpenListaMercado(false)}>Cancelar</Button>
          </DialogContent>
        </Dialog>

        <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar Ação</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja criar a lista de mercado e enviar via WhatsApp?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancelSave}>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmSave}>Confirmar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ExtrasPage;
