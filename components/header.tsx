import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";

const Sidebar = dynamic(() => import("./sidebar"), {
  loading: () => <Skeleton className="h-6 w-6" />,
});

const Header = () => {
  return (
    <Card className="rounded-none p-0">
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Link href={"/"}>
          <Image
            src="/logo.svg"
            alt="FSW Barber"
            width={120}
            height={20.3}
            className="w-auto"
          />
        </Link>

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
