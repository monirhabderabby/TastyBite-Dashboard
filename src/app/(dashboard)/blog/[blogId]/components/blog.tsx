"use client";

import { useGetSingleBlogQuery } from "@/redux/features/blog/blogApi";
import { Loader } from "lucide-react";
import BlogForm from "./blog-form";

const Blog = ({ blogId }: { blogId: string }) => {
    const { data, isLoading } = useGetSingleBlogQuery(blogId, {
        skip: blogId === "create",
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <Loader className="w-10 h-10 animate-spin opacity-50" />
            </div>
        );
    }

    return (
        <div>
            <BlogForm blog={blogId !== "create" ? data?.data : undefined} />
        </div>
    );
};

export default Blog;
