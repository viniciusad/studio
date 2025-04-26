'use client';

import Dashboard from '@/components/Dashboard';
import Navbar from '@/components/Navbar';
import {useState} from 'react';

export default function Home() {
  const [entriesOpen, setEntriesOpen] = useState(false);
  const [exitsOpen, setExitsOpen] = useState(false);

  return (
    <>
      <Navbar setEntriesOpen={setEntriesOpen} setExitsOpen={setExitsOpen} />
      <main className="container mx-auto mt-8">
        <Dashboard />
      </main>
    </>
  );
}
