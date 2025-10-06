'use client';
import React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth-client';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

const SignOutDialog = () => {
  const handleLogoutClick = () => signOut();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Sair da conta</DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="w-[90%] !max-w-[480px]">
        <DialogHeader className="!text-center">
          <DialogTitle>Sair</DialogTitle>
          <DialogDescription>Deseja mesmo sair da plataforma?</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row gap-3">
          <DialogClose asChild>
            <Button variant="secondary" className="flex-1">
              Voltar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive" className="flex-1" onClick={handleLogoutClick}>
              Sair
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignOutDialog;
