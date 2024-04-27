"use client";

import * as React from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import Logo from "./logo";

const components: { title: string; description: string }[] = [
  {
    title: "Frozen",

    description:
      "Recommended template for most use cases. Includes all the components you need to get started.",
  },
  {
    title: "Swift",

    description:
      "A template with a minimal set of components. Use this template if you want to build your own components.",
  },
  {
    title: "Tuscany",

    description:
      "Advanced template with more components and features. Use this template if you want to build a complex UI.",
  },
  {
    title: "Amber",

    description: "Great for building a marketing or landing page.",
  },
  {
    title: "Tide",

    description:
      "Layered template with a sidebar navigation. Great for building a dashboard or admin panel.",
  },
  {
    title: "Mint",

    description:
      "Nice template for building a blog or a content-heavy website.",
  },
];

export function NavigationMenuBar() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="hidden md:flex md:space-x-10">
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className="font-medium">
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/about-us" legacyBehavior passHref>
            <NavigationMenuLink className="font-medium">
              Tentang Kami
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/booking" legacyBehavior passHref>
            <NavigationMenuLink className="font-medium">
              Pesan Kamar
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
