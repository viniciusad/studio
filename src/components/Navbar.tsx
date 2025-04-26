'use client';

import Link from 'next/link';
import {useState} from 'react';

const Navbar = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <nav className="bg-primary text-primary-foreground p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex justify-start items-center">
          <Link href="/" className="font-bold text-lg">
            Dashboard
          </Link>
          <Link href="/entries">Entradas</Link>
          <Link href="/exits">Saídas</Link>
          <Link href="/planning">Planejamento</Link>
          <Link href="/extras">Extras</Link>
          <Link href="/cadastros">Cadastros</Link>
        </div>

        <div className="flex justify-end items-center">
          <input
            type="file"
            id="imageUpload"
            accept="image/png, image/jpeg, image/jpg"
            style={{display: 'none'}}
            onChange={handleImageUpload}
          />
          <label htmlFor="imageUpload">
            <div className="relative w-10 h-10 rounded-full overflow-hidden cursor-pointer">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Uploaded"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-secondary text-secondary-foreground flex items-center justify-center">
                  +
                </div>
              )}
            </div>
          </label>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
