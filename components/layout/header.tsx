import { ChevronDownIcon, MenuIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

import SignInDialog from '@/components/auth/sign-in-dialog';
import SignOutDialog from '@/components/auth/sign-out-dialog';
import SearchHeader from '@/components/general/search-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { getCurrentUserOptional } from '@/server/users';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const Sidebar = dynamic(() => import('@/components/layout/sidebar'), {
  loading: () => <Skeleton className="h-10 w-10" />,
});

const Header = async () => {
  const session = await getCurrentUserOptional();
  const user = session?.user;

  return (
    <Card className="rounded-none p-0">
      <CardContent className="container mx-auto flex flex-row items-center justify-between p-5">
        <Link href={'/'} className="transition-opacity hover:opacity-80">
          <Image src="/logo.svg" alt="FSW Barber" width={120} height={20.3} className="w-auto" />
        </Link>

        <SearchHeader />

        <div className="hidden gap-3 lg:flex lg:items-center">
          <Button variant="ghost" className="justify-start gap-2 px-4" size="lg" asChild>
            <Link href="/bookings">
              <Image src="/calendar-nfill.svg" alt="Agendamentos" width={18} height={18} />
              Agendamentos
            </Link>
          </Button>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.image ?? undefined} alt={user.name ?? 'Usuário'} />
                    <AvatarFallback>{user.name?.charAt(0).toUpperCase() ?? 'U'}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{user.name}</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/bookings">Meus Agendamentos</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <SignOutDialog />
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <SignInDialog />
          )}
        </div>

        <Sidebar>
          <Button variant="outline" size="icon">
            <MenuIcon className="size-5" />
          </Button>
        </Sidebar>
      </CardContent>
    </Card>
  );
};

export default Header;
