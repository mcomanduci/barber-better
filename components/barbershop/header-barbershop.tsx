import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronDownIcon } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getCurrentUserOptional } from '@/server/users';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import SignOutDialog from '@/components/auth/sign-out-dialog';
import SignInDialog from '@/components/auth/sign-in-dialog';
import SearchHeader from '@/components/general/search-header';

const HeaderBarbershop = async () => {
  const session = await getCurrentUserOptional();
  const user = session?.user;

  return (
    <Card className="hidden rounded-none p-0 lg:block">
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
      </CardContent>
    </Card>
  );
};

export default HeaderBarbershop;
