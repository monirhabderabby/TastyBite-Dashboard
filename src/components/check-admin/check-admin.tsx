"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Logo from "../ui/Logo";

const CheckAdmin = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [isRoleTracked, setIsRoleTracked] = useState(false);

  useEffect(() => {
    // Check if the user is loaded and verify their role
    if (isLoaded) {
      if (user?.publicMetadata?.role === "admin") {
        setIsRoleTracked(true); // Grant access if the role is admin
      } else {
        signOut({ redirectUrl: "/sign-in" }); // Redirect non-admin users to sign-in page
        console.log("You are not an admin. Go out.");
      }
    }
  }, [isLoaded, user, signOut]);

  if (!isLoaded)
    return <Message message="Verifying your access, please wait..." />;

  if (isRoleTracked) {
    return children;
  }

  return <Message message="Checking your permissions, please wait..." />;
};

export default CheckAdmin;

const Message = ({ message }: { message: string }) => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center opacity-80 gap-y-5">
      <div className="flex flex-col justify-center items-center">
        <Loader2 className="animate-spin opacity-50" />
        {message}
      </div>
      <Logo />
    </div>
  );
};
