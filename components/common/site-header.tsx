"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/slices/authSlice";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { AreaChart, ChevronDown, LineChart, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const { portfolio } = useSelector((state: RootState) => state.user);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  // Don't show the navbar on auth pages
  if (pathname?.startsWith("/auth")) {
    return null;
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <AreaChart className="h-6 w-6" />
            <span className="font-bold inline-block">Stomks</span>
          </Link>
        </div>

        <div className="hidden md:flex md:flex-1">
          {isAuthenticated ? (
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/dashboard" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Dashboard
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/trade" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Trade
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/watchlist" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Watchlist
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/learn" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Learn
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/leaderboard" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Leaderboard
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          ) : (
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link
                href="/features"
                className="transition-colors hover:text-foreground/80"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="transition-colors hover:text-foreground/80"
              >
                Pricing
              </Link>
              <Link
                href="/learn"
                className="transition-colors hover:text-foreground/80"
              >
                Learn
              </Link>
              <Link
                href="/about"
                className="transition-colors hover:text-foreground/80"
              >
                About
              </Link>
            </nav>
          )}
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden items-center space-x-2 sm:flex">
            {isAuthenticated ? (
              <>
                <div className="hidden md:block border-r pr-4 mr-4">
                  <p className="text-sm font-medium">
                    Balance:{" "}
                    <span className="text-primary">
                      ${portfolio.availableCapital.toLocaleString()}
                    </span>
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" alt={user?.name || ""} />
                        <AvatarFallback>
                          {user?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex flex-col space-y-1 p-2">
                      <p className="text-sm font-medium leading-none">
                        {user?.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={handleLogout}
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm">Register</Button>
                </Link>
              </>
            )}
            <ThemeToggle />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader className="mb-4">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="grid gap-2 py-6">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="" alt={user?.name || ""} />
                          <AvatarFallback>
                            {user?.name?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{user?.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Balance: $
                            {portfolio.availableCapital.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <ThemeToggle />
                    </div>
                    <Link
                      href="/dashboard"
                      className="flex w-full items-center py-2 text-lg font-semibold"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/trade"
                      className="flex w-full items-center py-2 text-lg font-semibold"
                    >
                      Trade
                    </Link>
                    <Link
                      href="/watchlist"
                      className="flex w-full items-center py-2 text-lg font-semibold"
                    >
                      Watchlist
                    </Link>
                    <Link
                      href="/learn"
                      className="flex w-full items-center py-2 text-lg font-semibold"
                    >
                      Learn
                    </Link>
                    <Link
                      href="/leaderboard"
                      className="flex w-full items-center py-2 text-lg font-semibold"
                    >
                      Leaderboard
                    </Link>
                    <Link
                      href="/profile"
                      className="flex w-full items-center py-2 text-lg font-semibold"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="flex w-full items-center py-2 text-lg font-semibold"
                    >
                      Settings
                    </Link>
                    <Button
                      className="mt-4"
                      variant="outline"
                      onClick={handleLogout}
                    >
                      Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <AreaChart className="h-6 w-6" />
                        <span className="font-bold">Stomks</span>
                      </div>
                      <ThemeToggle />
                    </div>
                    <Link
                      href="/features"
                      className="flex w-full items-center py-2 text-lg font-semibold"
                    >
                      Features
                    </Link>
                    <Link
                      href="/pricing"
                      className="flex w-full items-center py-2 text-lg font-semibold"
                    >
                      Pricing
                    </Link>
                    <Link
                      href="/learn"
                      className="flex w-full items-center py-2 text-lg font-semibold"
                    >
                      Learn
                    </Link>
                    <Link
                      href="/about"
                      className="flex w-full items-center py-2 text-lg font-semibold"
                    >
                      About
                    </Link>
                    <div className="flex flex-col gap-2 mt-6">
                      <Link href="/auth/login">
                        <Button variant="outline" className="w-full">
                          Login
                        </Button>
                      </Link>
                      <Link href="/auth/register">
                        <Button className="w-full">Register</Button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
