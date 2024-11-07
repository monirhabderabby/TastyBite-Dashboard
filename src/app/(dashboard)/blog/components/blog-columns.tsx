import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import BlogRowActions from "./blog-row-actions";

export type blogProps = {
    _id: string;
    title: string;
    blogCategory: string;
    description: string;
    image: string;
};

export const BlogColumns: ColumnDef<blogProps>[] = [
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
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "blogCategory",
        header: "Category",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const blog = row.original;

            return <BlogRowActions blog={blog} />;
        },
    },
];
