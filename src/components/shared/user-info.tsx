"use client";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { FaUserCircle } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useCurrentUser } from "~/hooks/use-current-user";
import { useState } from "react";

export function UserInfo() {
  const currentUser = useCurrentUser();
  const [showModal, setShowModal] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  return currentUser ? (
    <div className="ml-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="m-0 h-fit w-fit rounded-full p-0">
            <Avatar>
              <AvatarImage
                src={currentUser?.image ?? ""}
                className="object-cover"
              />
              <AvatarFallback>
                <FaUserCircle className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href="/settings/profile">Profile</Link>
              <DropdownMenuShortcut>
                <FaUserCircle />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/settings/profile">Settings</Link>
              <DropdownMenuShortcut>
                <FaGear />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setShowModal(true);
            }}
          >
            Sign out
            <DropdownMenuShortcut>
              <FaSignOutAlt />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to sign out?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setShowModal(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                setIsSigningOut(true);
                await signOut();
                setIsSigningOut(false);
              }}
              disabled={isSigningOut}
            >
              Sign out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  ) : (
    <div className="ml-auto space-x-5">
      <Button
        className="hover:text-primary-dark focus:text-primary-dark active:text-primary-dark gap-1.5 text-sm font-semibold text-primary"
        size="sm"
        variant="ghost"
        asChild
      >
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button className="gap-1.5 text-sm font-semibold" size="sm" asChild>
        <Link href="/auth/register">Sign up</Link>
      </Button>
    </div>
  );
}
