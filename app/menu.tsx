"use client"

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
  } from "@/components/ui/menubar"
  import Link from 'next/link'
  import { useUser } from '@auth0/nextjs-auth0/client'

  
  export function Menu() {
    const { user } = useUser();
    const roles: string[] = (user?.["https://theater.com/roles"] as string[]) ?? [];
    return user && roles.includes("admin") ? (
      <Menubar className="rounded-none border-b border-none lg:px-4">
        <MenubarMenu>
          <MenubarTrigger>Peças</MenubarTrigger>
          <MenubarContent>
            <MenubarItem asChild>
              <Link href="/dashboard/play">Inserir nova peça</Link>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem asChild>
              <Link href="/dashboard">Gerenciar peças</Link>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem asChild>
              <Link href="/">Ver peças</Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Reservas</MenubarTrigger>
          <MenubarContent>
            <MenubarItem asChild>
              <Link href="/dashboard/reservations">Ver reservas</Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    ) : null;
  }