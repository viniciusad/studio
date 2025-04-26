'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Menu} from "lucide-react";

const Navbar = ({
  setEntriesOpen,
  setExitsOpen,
  setPlanningOpen,
  setExtrasOpen,
  setCadastrosOpen
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Menu className="h-5 w-5"/>
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="grid gap-4 py-4">
                <Button variant="ghost" className="hover:underline justify-start" onClick={() => {
                  setEntriesOpen(true);
                  setIsMenuOpen(false);
                }}>
                  Entradas
                </Button>
                <Button variant="ghost" className="hover:underline justify-start" onClick={() => {
                  setExitsOpen(true);
                  setIsMenuOpen(false);
                }}>
                  Saídas
                </Button>
                <Button variant="ghost" className="hover:underline justify-start" onClick={() => {
                  setPlanningOpen(true);
                  setIsMenuOpen(false);
                }}>
                  Planejamento
                </Button>
                <Button variant="ghost" className="hover:underline justify-start" onClick={() => {
                  setExtrasOpen(true);
                  setIsMenuOpen(false);
                }}>
                  Extras
                </Button>
                <Button variant="ghost" className="hover:underline justify-start" onClick={() => {
                  setCadastrosOpen(true);
                  setIsMenuOpen(false);
                }}>
                  Cadastros
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex justify-start items-center space-x-4 mb-2 md:mb-0">
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
