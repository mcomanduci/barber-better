'use client';
import { LogInIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { signIn } from '@/lib/auth-client';

interface SignInDialogProps {
  onSignInStart?: () => void;
}

const SignInDialog = ({ onSignInStart }: SignInDialogProps) => {
  const handleLoginWithGoogleClick = () => {
    onSignInStart?.();
    signIn('google');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">
          <span className="hidden lg:block">Login</span>
          <LogInIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] !max-w-[480px]">
        <DialogHeader className="!text-center">
          <DialogTitle>Faça login na plataforma</DialogTitle>
          <DialogDescription>Conecte-se usando sua conta do Google.</DialogDescription>
        </DialogHeader>
        <Button
          className="gap-2 font-bold"
          variant="outline"
          size="lg"
          onClick={handleLoginWithGoogleClick}
        >
          <Image src="/google.svg" alt="Google Icon" width={18} height={18} />
          Google
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
