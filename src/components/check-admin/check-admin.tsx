"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

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
    <div className="min-h-screen w-full flex flex-col justify-center items-center opacity-80 gap-y-3">
      <div className="font-courgette text-black font-semibold text-[40px]">
        <span className="text-primary-orange">Tasty</span>Bite
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="loader" />
        <div className="mt-2">{message}</div>
      </div>
    </div>
  );
};
