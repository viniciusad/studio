import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-primary text-primary-foreground p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-around items-center">
        <Link href="/" className="font-bold text-lg">
          Dashboard
        </Link>
        <Link href="/entries">Entries</Link>
        <Link href="/exits">Exits</Link>
        <Link href="/planning">Planning</Link>
        <Link href="/extras">Extras</Link>
        <Link href="/cadastros">Cadastros</Link>
      </div>
    </nav>
  );
};

export default Navbar;
