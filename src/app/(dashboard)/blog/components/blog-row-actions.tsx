// Packages
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";

// Components
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { toast } from "sonner";
import { blogProps } from "./blog-columns";

const BlogRowActions = ({ blog }: { blog: blogProps }) => {
    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success(`Blog id copied to clipboard.`);
    };

    return (
        <div>
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
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default BlogRowActions;
