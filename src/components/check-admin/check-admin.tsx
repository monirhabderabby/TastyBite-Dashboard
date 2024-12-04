"use client";

import { useClerk, useUser } from "@clerk/nextjs";

const CheckAdmin = ({ children }: { children: React.ReactNode }) => {
    const { user, isLoaded } = useUser();
    const { signOut } = useClerk();

    if (!isLoaded) return null;

    if (user?.publicMetadata?.role !== "admin") {
        signOut({ redirectUrl: "/sign-in" });
    }
    return children;
};

export default CheckAdmin;
