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
import { AiFillDashboard } from "react-icons/ai";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useCurrentUser } from "~/hooks/use-current-user";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrentRole } from "~/hooks/use-current-role";

export function UserInfo() {
  const currentUser = useCurrentUser();
  const [showModal, setShowModal] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();
  const isAdmin = useCurrentRole() === "ADMIN";
  // TODO: Add user preferences

  return currentUser ? (
    <div className="flex items-center">
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
        <DropdownMenuContent className="z-[10000] w-48">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                router.push("/settings");
              }}
            >
              Profile
              <DropdownMenuShortcut>
                <FaUserCircle />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                router.push("/settings");
              }}
            >
              Settings
              <DropdownMenuShortcut>
                <FaGear />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            {isAdmin && (
              <DropdownMenuItem
                onClick={() => {
                  router.push("/admin/problemset");
                }}
              >
                Dashboard
                <DropdownMenuShortcut>
                  <AiFillDashboard />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            )}
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
