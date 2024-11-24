import { cn } from "@/lib/utils";
import { TUser } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import DeleteUserAction from "./delete-user-action";
import UpdateRole from "./update-role";

export const UserColumns: ColumnDef<TUser>[] = [
    {
        accessorKey: "email",
        header: "Profile",
        cell: ({ row }) => {
            const { image, name, email } = row.original || {};
            return (
                <div className="flex items-center gap-x-3">
                    <div className="relative h-[30px] w-[30px] rounded-full border-[2px] border-tourHub-green-hover">
                        <Image
                            src={image}
                            alt={name}
                            width={30}
                            height={30}
                            className="rounded-full bg-gray-100"
                        />
                    </div>
                    <div>
                        <h3 className="text-base font-semibold">{name}</h3>
                        <p className="select-none text-sm text-tourHub-gray font-inter font-normal">
                            {email}
                        </p>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
            const { role } = row.original || {};

            return (
                <div>
                    <p
                        className={cn(
                            "text-sm w-fit px-3 py-1 rounded-[50px] uppercase",
                            role === "admin" && "bg-green-200",
                            role === "user" && "bg-gray-200"
                        )}
                    >
                        {role}
                    </p>
                </div>
            );
        },
    },
    {
        accessorKey: "",
        header: "Update Role",
        cell: ({ row }) => {
            const user = row.original || {};

            return (
                <div className="w-fit">
                    <UpdateRole user={user} />
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original;

            return <DeleteUserAction user={user} />;
        },
    },
];
