import { Button, buttonVariants } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { FcGoogle } from "react-icons/fc";

import { AlignJustify } from "lucide-react";

import Link from "next/link";
import { auth, signOut } from "@/lib/auth";

const ActionButtons = async () => {
  const session = await auth();
  return (
    <div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <AlignJustify />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetDescription>
                <div className="flex flex-col space-y-4 items-start w-full text-lg text-black mt-10">
                  <Link href="/">Sign in</Link>
                  <Link href="/">Get Started</Link>
                  <Link href="/">Pricing</Link>
                  <Link href="/">Contact</Link>
                  <Link href="/">About</Link>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:flex md:space-x-4">
        {session ? (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button variant={"destructive"} type="submit">
              Sign Out
            </Button>
          </form>
        ) : (
          <Button className="text-md" asChild>
            <Link href="/sign-in">Sign in</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ActionButtons;
