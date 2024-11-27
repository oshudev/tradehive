import { Link, usePage } from '@inertiajs/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/Components/ui/navigation-menu';

import { DropdownMenuArrow } from '@radix-ui/react-dropdown-menu';

import { Bell, LogOut, Settings } from 'lucide-react';

const navigationDropdown = [
  {
    name: 'Jobs',
    links: [
      {
        name: 'Proposals',
        url: 'client.proposals.index',
      },
      {
        name: 'All Contracts',
        url: 'profile.edit',
      },
    ],
  },
];

export default function ClientNavigation() {
  const user = usePage().props.auth.user;
  const userInitial = user.first_name.charAt(0).toUpperCase();
  const name = user.first_name + ' ' + user.last_name;

  return (
    <header className="mx-auto max-w-screen-2xl px-6">
      <nav className="flex h-16 items-center justify-between">
        <Link href="/client/dashboard" className="text-2xl font-bold">
          Tradehive
        </Link>
        <div className="flex-1 px-4">
          <NavigationMenu>
            <NavigationMenuList>
              {navigationDropdown.map((item, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul>
                      {item.links.map((link, index) => (
                        <li className="px-4 py-2 hover:bg-accent" key={index}>
                          <NavigationMenuLink className="text-nowrap" asChild>
                            <Link href={route(link.url)}>{link.name}</Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <NavigationMenuLink>
                  <Link href="#">Messages</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex gap-x-6">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Bell className="size-6" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="size-24"></DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="font-bold">
                  {userInitial}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={-10}
              className="rounded-lg border-none p-0"
              style={{
                boxShadow:
                  '0 0 12px rgb(0 0 0 / 0.15), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
              }}
            >
              <DropdownMenuArrow
                height={10}
                width={20}
                className="fill-white stroke-1"
              />
              <DropdownMenuLabel className="flex w-[245px] items-center gap-x-4 p-4">
                <Avatar className="size-12">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-base font-bold">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <h2 className="w-full truncate text-xl font-medium">
                    {name}
                  </h2>
                  <div className="font-normal">{user.role}</div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="mb-0 mt-4" />
              <DropdownMenuItem
                className="cursor-pointer rounded-none px-4 py-2 text-base"
                asChild
              >
                <Link href="/settings">
                  <Settings />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer rounded-none px-4 py-2 text-base"
                asChild
              >
                <Link href={route('logout')} method="post">
                  <LogOut />
                  Log out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}
