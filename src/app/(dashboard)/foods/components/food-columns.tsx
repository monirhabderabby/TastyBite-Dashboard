import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import FoodRowActions from "./food-row-actions";

export type foodProps = {
    _id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    menu: string;
};

export const FoodColumns: ColumnDef<foodProps>[] = [
    {
        accessorKey: `images`,
        header: "Image",
        cell: ({ row }) => {
            const images: [string] = row.getValue("images");
            const firstImage = images[0];

            return (
                <div>
                    <Image
                        src={firstImage as string}
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
        header: "Food name",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "menuId",
        header: "Menu",
        cell: ({ row }) => {
            const menu: { name: string } = row.getValue("menuId");

            return <p className="text-primary-black">{menu?.name}</p>;
        },
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"));
            const formattedPrice = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(price);

            return <div className="font-medium">{formattedPrice}</div>;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const food = row.original;

            return <FoodRowActions food={food} />;
        },
    },
];
