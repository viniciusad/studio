'use client';

import Dashboard from '@/components/Dashboard';
import Navbar from '@/components/Navbar';
import {useState} from 'react';
import {Sheet, SheetContent, SheetHeader, SheetTitle} from "@/components/ui/sheet";

export default function Home() {
  const [entriesOpen, setEntriesOpen] = useState(false);
  const [exitsOpen, setExitsOpen] = useState(false);

  return (
    <>
      <Navbar setEntriesOpen={setEntriesOpen} setExitsOpen={setExitsOpen} />
      <main className="container mx-auto mt-8">
        <Dashboard />
      </main>

      {/*Entradas Modal*/}
      <Sheet open={entriesOpen} onOpenChange={setEntriesOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Adicionar Entrada</SheetTitle>
          </SheetHeader>
          <div>
            <p>Tela de entradas</p>
            {/*Adicione aqui o conteúdo do seu modal de entradas*/}
          </div>
        </SheetContent>
      </Sheet>

      {/*Saídas Modal*/}
      <Sheet open={exitsOpen} onOpenChange={setExitsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Adicionar Saída</SheetTitle>
          </SheetHeader>
          <div>
            <p>Tela de saídas</p>
            {/*Adicione aqui o conteúdo do seu modal de saídas*/}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
