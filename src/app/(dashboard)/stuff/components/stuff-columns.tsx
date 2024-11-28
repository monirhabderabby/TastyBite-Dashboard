import { TStaff } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import StuffRowActions from "./stuff-row-actions";

export const StuffColumns: ColumnDef<TStaff>[] = [
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            const image = row.getValue("image");

            return (
                <div>
                    <Image
                        src={image as string}
                        alt="Image"
                        width={80}
                        height={60}
                        className="bg-gray-100 max-h-[70px] rounded-md"
                    />
                </div>
            );
        },
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const name: string = row.getValue("name");

            return <p className="whitespace-nowrap">{name}</p>;
        },
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "designation",
        header: "Designation",
    },
    {
        accessorKey: "bio",
        header: "Bio",
        cell: ({ row }) => {
            const bio: string = row.getValue("bio");

            return <p className="line-clamp-2">{bio}</p>;
        },
    },
    {
        accessorKey: "phoneNo",
        header: "Phone Number",
    },
    {
        accessorKey: "address",
        header: "Address",
        cell: ({ row }) => {
            const address: string = row.getValue("address");

            return <p className="w-20">{address}</p>;
        },
    },
    {
        accessorKey: "facebookLink",
        header: "Facebook",
    },
    {
        accessorKey: "linkedinLink",
        header: "LinkedIn",
    },
    {
        accessorKey: "instagramLink",
        header: "Instagram",
    },
    {
        accessorKey: "youtubeLink",
        header: "Youtube",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const stuff = row.original;

            return <StuffRowActions stuff={stuff} />;
        },
    },
];
