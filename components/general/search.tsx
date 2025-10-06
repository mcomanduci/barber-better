'use client';

import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { searchBarbershopsSchema, SearchBarbershopsInput } from '@/lib/validations';

const Search = () => {
  const form = useForm<SearchBarbershopsInput>({
    resolver: zodResolver(searchBarbershopsSchema),
    defaultValues: {
      title: '',
    },
  });

  const router = useRouter();

  const handleSubmit = (data: SearchBarbershopsInput) => {
    router.push(`/barbershops?title=${data.title}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Buscar Barbearias"
                  {...field}
                  className="!bg-card border placeholder:text-gray-500"
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

export default Search;
