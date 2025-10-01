"use client";

import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { quickSearchOptions } from "@/constants/search";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Skeleton } from "./ui/skeleton";
import { authClient, signOut } from "@/lib/auth-client";
import SignInDialog from "./sign-in-dialog";
import { getCurrentUser } from "@/server/users";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const { data, isPending } = authClient.useSession();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleLogoutClick = () => signOut();

  // Close dialog when user successfully signs in
  useEffect(() => {
    if (data?.user && isSigningIn) {
      setIsLoginDialogOpen(false);
      setIsSigningIn(false);
    }
  }, [data?.user, isSigningIn]);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="overflow-y-auto px-4 pt-6">
        <SheetHeader className="p-0">
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        {isPending || (isSigningIn && !data?.user) ? (
          <div className="item-center flex gap-3 border-b border-solid py-5">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex min-w-0 flex-col justify-center space-y-2">
              <Skeleton className="h-4 w-28 rounded" />
              <Skeleton className="h-3 w-32 rounded" />
            </div>
          </div>
        ) : data?.user ? (
          <div className="item-center flex gap-3 border-b border-solid py-5">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={data.user.image || ""}
                alt="Avatar"
                width={40}
                height={40}
              />
              <AvatarFallback>
                {data.user.name
                  ?.split(" ")
                  .map((name) => name[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-col justify-center">
              <p className="truncate font-bold">{data.user.name}</p>
              <p className="truncate text-xs">{data.user.email}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
            <h2 className="font-bold">Olá, faça seu login!</h2>
            <Dialog
              open={isLoginDialogOpen}
              onOpenChange={setIsLoginDialogOpen}
            >
              <DialogTrigger asChild>
                <Button size="icon">
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%]">
                <SignInDialog onSignInStart={() => setIsSigningIn(true)} />
              </DialogContent>
            </Dialog>
          </div>
        )}
        <div className="flex flex-col gap-2 border-b border-solid py-5">
          <SheetClose asChild>
            <Button className="justify-start gap-2 px-4" size="lg" asChild>
              <Link href="/">
                <Image src="/home.svg" alt="Home" width={18} height={18} />
                Início
              </Link>
            </Button>
          </SheetClose>

          <Button
            variant="ghost"
            className="justify-start gap-2 px-4"
            size="lg"
            asChild
          >
            <Link href="/bookings">
              <Image
                src="/calendar.svg"
                alt="Agendamentos"
                width={18}
                height={18}
              />
              Agendamentos
            </Link>
          </Button>
        </div>
        <div className="flex flex-col gap-2 border-b border-solid pb-5">
          {quickSearchOptions.map((option) => (
            <SheetClose key={option.title} asChild>
              <Button
                variant="ghost"
                className="justify-start gap-2 px-4"
                size="lg"
                asChild
              >
                <Link href={`/barbershops?service=${option.title}`}>
                  <Image
                    src={option.imageURL}
                    alt={option.title}
                    width={18}
                    height={18}
                  />
                  <p>{option.title}</p>
                </Link>
              </Button>
            </SheetClose>
          ))}
        </div>
        {data?.user && (
          <div className="flex flex-col gap-2">
            <Button
              className="justify-start gap-2 px-4"
              variant="ghost"
              size="lg"
              onClick={handleLogoutClick}
            >
              <LogOutIcon size={18} />
              Sair da conta
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
