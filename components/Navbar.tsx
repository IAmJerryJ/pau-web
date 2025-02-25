"use client";

import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-900 text-white">
      <div className="flex h-24 items-center justify-between mx-56">
        {/* Logo */}
        <div>
          <Link href="/" className="flex items-center">
            <Image
              src="/PegaLogo.png"
              alt="Pega Logo"
              width={250}
              height={100}
              priority
            />
          </Link>
        </div>

        {/* Navigation Menu */}
        <NavigationMenu className="text-white">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-white hover:text-gray-200 bg-transparent hover:bg-gray-800 text-2xl"
                  )}
                >
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/services" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-white hover:text-gray-200 bg-transparent hover:bg-gray-800 text-2xl"
                  )}
                >
                  Services
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/career" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-white hover:text-gray-200 bg-transparent hover:bg-gray-800 text-2xl"
                  )}
                >
                  Career
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/contacts" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-white hover:text-gray-200 bg-transparent hover:bg-gray-800 text-2xl"
                  )}
                >
                  Contacts
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default Navbar;
