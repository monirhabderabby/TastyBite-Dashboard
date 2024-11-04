import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import MenuRowActions from "./menu-row-actions";

export type foodMenuProps = {
    _id: string;
    name: string;
    description: string;
    image: string;
};

export const MenuColumns: ColumnDef<foodMenuProps>[] = [
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
        header: "Menu name",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const menu = row.original;

            return <MenuRowActions menu={menu} />;
        },
    },
];
