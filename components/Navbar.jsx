"use client";

import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, LayoutDashboard, User, History, Menu, X, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import * as Sheet from "@radix-ui/react-dialog";
import { useTheme } from "next-themes";

const ModeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="text-black dark:text-white hover:text-gray-950"
    >
      {resolvedTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  );
};

const Navbar = () => {
  const { isSignedIn } = useUser();
  const path = usePathname();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const searchLower = search.toLowerCase();
    const items = [
      { name: "Home", href: "/", icon: Home },
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "My Account", href: "/my-account", icon: User },
      { name: "Your History", href: "/dashboard/responses", icon: History },
    ];

    if (searchLower === "") {
      setSuggestions([]);
    } else {
      setSuggestions(
        items.filter(
          (item) =>
            item.name.toLowerCase().includes(searchLower) ||
            item.href.toLowerCase().includes(searchLower)
        )
      );
    }
  }, [search]);

  if (path.includes("aiform")) return null;

  return (
    <div className="p-3 px-5 border-b shadow-sm bg-white dark:bg-black text-black dark:text-white">
      <div className="flex items-center justify-between gap-4">
        <Link href="/">
          <Image src="/logo.png" width={50} height={50} alt="CraftMyCV Logo" />
        </Link>

        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search for pages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white dark:bg-black text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          {search && (
            <Button
              className="absolute right-10 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white"
              onClick={() => {
                setSearch("");
                setSuggestions([]);
              }}
            >
              <X className="h-5 w-5 text-gray-300" />
            </Button>
          )}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 mt-1 w-full bg-gray-800 border rounded-md shadow-md z-50">
              {suggestions.map((item) => (
                <div
                  key={item.href}
                  className="flex items-center gap-3 p-2 hover:bg-gray-700 cursor-pointer transition"
                  onClick={() => {
                    router.push(item.href);
                    setSearch("");
                    setSuggestions([]);
                  }}
                >
                  <item.icon size={18} className="text-white" />
                  <span className="text-white">{item.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center gap-5">
          <Link href="/" className="flex items-center gap-1 text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
            <Home size={18} /> Homepage
          </Link>
          <Link href="/history" className="flex items-center gap-1 text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
            <History size={18} /> Your History
          </Link>
          <ModeToggle />
          {isSignedIn ? (
            <>
              <Link href="/dashboard">
                <Button variant="outline" className="bg-gray-800 text-white">
                  Dashboard
                </Button>
              </Link>
              <UserButton />
            </>
          ) : (
            <SignInButton>
              <Button className="bg-gray-800 text-white">Get Started</Button>
            </SignInButton>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet.Root>
            <Sheet.Trigger asChild>
              <Button variant="ghost" size="icon" className="bg-black text-white">
                <Menu />
              </Button>
            </Sheet.Trigger>
            <Sheet.Portal>
              <Sheet.Overlay className="fixed inset-0 bg-black/50" />
              <Sheet.Content className="fixed top-0 right-0 h-full w-[300px] bg-white dark:bg-black p-5 text-black dark:text-white shadow-lg z-50">
                <Sheet.Title asChild>
                  <h2 className="text-2xl font-bold mb-5">CraftMyCV</h2>
                </Sheet.Title>
                <nav className="flex flex-col gap-3">
                  <Link href="/" className="flex items-center gap-3 p-3 rounded-lg bg-black hover:bg-gray-700 transition">
                    <Home size={22} className="text-white" />
                    <span className="text-lg font-medium">Homepage</span>
                  </Link>
                  <Link href="/history" className="flex items-center gap-3 p-3 rounded-lg bg-black hover:bg-gray-700 transition">
                    <History size={22} className="text-white" />
                    <span className="text-lg font-medium">Your History</span>
                  </Link>
                  <ModeToggle />
                  {isSignedIn ? (
                    <>
                      <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-lg bg-black hover:bg-gray-700 transition">
                        <LayoutDashboard size={22} className="text-white" />
                        <span className="text-lg font-medium">Dashboard</span>
                      </Link>
                      <div className="mt-3">
                        <UserButton />
                      </div>
                    </>
                  ) : (
                    <SignInButton>
                      <Button className="mt-3 bg-gray-800 text-white">Get Started</Button>
                    </SignInButton>
                  )}
                </nav>
              </Sheet.Content>
            </Sheet.Portal>
          </Sheet.Root>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
