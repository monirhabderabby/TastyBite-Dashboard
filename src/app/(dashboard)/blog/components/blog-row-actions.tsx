// Packages
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";

// Components
import { ExpandableCard } from "@/components/common/expandable-card/expandable-card";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteCards } from "@/lib/delete-cards";
import { useDeleteBlogMutation } from "@/redux/features/blog/blogApi";
import { TBlog } from "@/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { toast } from "sonner";

const BlogRowActions = ({ blog }: { blog: TBlog }) => {
    const [active, setActive] = useState<
        (typeof deleteCards)[number] | boolean | null
    >(null);
    const id = useId();

    const [
        deleteBlog,
        {
            isLoading: deleteBlogLoading,
            isSuccess: deleteBlogSuccess,
            isError: deleteBlogError,
        },
    ] = useDeleteBlogMutation();

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success(`Blog id copied to clipboard.`);
    };

    const onDelete = async () => {
        try {
            await deleteBlog(blog._id);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (deleteBlogSuccess) {
            setActive(null);
            toast.success("Blog deleted successfully");
        }
        if (deleteBlogError) {
            setActive(null);
            toast.error("Failed to delete Blog");
        }
    }, [deleteBlogError, deleteBlogSuccess]);

    return (
        <div>
            <ExpandableCard
                {...{
                    active,
                    setActive,
                    onDelete,
                    deleteLoading: deleteBlogLoading,
                    id,
                }}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4 " />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onCopy(blog._id)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Id
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link
                            href={`/blog/${blog._id}`}
                            className="flex items-center gap-x-2"
                        >
                            <Edit className="mr-2 h-4 w-4" />
                            Update
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <div>
                            {deleteCards.map((card) => (
                                <motion.div
                                    layoutId={`card-${card.title}-${id}`}
                                    key={`card-${card.title}-${id}`}
                                    onClick={() => setActive(card)}
                                    className="hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
                                >
                                    <motion.button
                                        layoutId={`button-${card.title}-${id}`}
                                        className="flex items-center gap-x-2"
                                    >
                                        <Trash className="mr-2 h-4 w-4" />
                                        {card.ctaText}
                                    </motion.button>
                                </motion.div>
                            ))}
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default BlogRowActions;
