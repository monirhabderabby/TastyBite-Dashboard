import { TBlog } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import BlogRowActions from "./blog-row-actions";

export const BlogColumns: ColumnDef<TBlog>[] = [
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
