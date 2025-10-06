import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto">
      <Card className="rounded-none">
        <CardContent className="px-5 py-0">
          <p className="text-sm text-gray-400">
            © {currentYear} Copyright <span className="font-bold">FSW Barber</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  );
};
