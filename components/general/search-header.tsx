'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { searchBarbershopsSchema, SearchBarbershopsInput } from '@/lib/validations';

const SearchHeader = () => {
  const pathname = usePathname();

  const form = useForm<SearchBarbershopsInput>({
    resolver: zodResolver(searchBarbershopsSchema),
    defaultValues: {
      title: '',
    },
  });

  const router = useRouter();

  if (pathname === '/') {
    return null;
  }

  const handleSubmit = (data: SearchBarbershopsInput) => {
    router.push(`/barbershops?title=${data.title}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="hidden max-w-lg flex-1 gap-2 lg:flex"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Buscar Barbearias"
                  {...field}
                  className="!bg-background border placeholder:text-gray-500"
                />
              </FormControl>
              <FormMessage className="pl-3 text-xs" />
            </FormItem>
          )}
        />
        <Button type="submit">
          <SearchIcon />
        </Button>
      </form>
    </Form>
  );
};

export default SearchHeader;
