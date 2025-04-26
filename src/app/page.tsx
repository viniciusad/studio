import Dashboard from '@/components/Dashboard';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto mt-8">
        <Dashboard />
      </main>
    </>
  );
}
