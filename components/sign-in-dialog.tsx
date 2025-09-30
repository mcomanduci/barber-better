import React from "react";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { signIn } from "@/lib/auth-client";
import Image from "next/image";

const SignInDialog = () => {
  const handleLoginWithGoogleClick = () => signIn("google");

  return (
    <>
      <DialogHeader>
        <DialogTitle>Faça login na plataform</DialogTitle>
        <DialogDescription>
          Conecte-se usando sua conta do Google.
        </DialogDescription>
      </DialogHeader>
      <Button
        className="gap-1 font-bold"
        variant="outline"
        size="lg"
        onClick={handleLoginWithGoogleClick}
      >
        <Image src="/google.svg" alt="Google Icon" width={18} height={18} />
        Google
      </Button>
    </>
  );
};

export default SignInDialog;
