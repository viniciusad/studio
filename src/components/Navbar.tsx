'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const Navbar = ({
  setEntriesOpen,
  setExitsOpen,
  setPlanningOpen,
  setExtrasOpen,
  setCadastrosOpen
}) => {
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
        <div className="flex justify-start items-center space-x-4">
          <Button variant="ghost" className="font-bold text-lg hover:underline">
            Dashboard
          </Button>
          <Button variant="ghost" className="hover:underline" onClick={() => setEntriesOpen(true)}>
            Entradas
          </Button>
          <Button variant="ghost" className="hover:underline" onClick={() => setExitsOpen(true)}>
            Saídas
          </Button>
          <Button variant="ghost" className="hover:underline" onClick={() => setPlanningOpen(true)}>
            Planejamento
          </Button>
          <Button variant="ghost" className="hover:underline" onClick={() => setExtrasOpen(true)}>
            Extras
          </Button>
          <Button variant="ghost" className="hover:underline" onClick={() => setCadastrosOpen(true)}>
            Cadastros
          </Button>
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
            <Avatar className="w-10 h-10 cursor-pointer">
              {selectedImage ? (
                <AvatarImage
                  src={selectedImage}
                  alt="Uploaded"
                />
              ) : (
                <AvatarFallback>+</AvatarFallback>
              )}
            </Avatar>
          </label>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
