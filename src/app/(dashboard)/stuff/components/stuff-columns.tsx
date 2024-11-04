import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { stuffProps } from "../[stuffId]/components/stuff-form";
import StuffRowActions from "./stuff-row-actions";

export const StuffColumns: ColumnDef<stuffProps>[] = [
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
    },
    {
        accessorKey: "phoneNo",
        header: "Phone Number",
    },
    {
        accessorKey: "address",
        header: "Address",
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
