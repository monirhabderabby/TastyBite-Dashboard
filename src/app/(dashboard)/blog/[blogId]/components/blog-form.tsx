"use client";

import { ExpandableCard } from "@/components/common/expandable-card/expandable-card";
import ImageUpload from "@/components/common/file-upload/single-image-upload-with-edgestore";
import RichTextEditor from "@/components/rich-text-editor/rich-text-editor";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { BlogCategories } from "@/data/blog-categories";
import { deleteCards } from "@/lib/delete-cards";
import { cn } from "@/lib/utils";
import {
    useCreateBlogMutation,
    useDeleteBlogMutation,
    useUpdateBlogMutation,
} from "@/redux/features/blog/blogApi";
import { TBlog } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ChevronsUpDown, Loader, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
    clerkId: z.string().optional(),
    title: z.string().min(3, {
        message: "Blog title is required.",
    }),
    blogCategory: z.string().min(1, {
        message: "Blog category is required.",
    }),
    description: z.string().min(5, {
        message: "Blog description required.",
    }),
    image: z.string().min(1, {
        message: "Blog image required.",
    }),
});

const BlogForm = ({ blog }: { blog: TBlog }) => {
    const [active, setActive] = useState<
        (typeof deleteCards)[number] | boolean | null
    >(null);
    const router = useRouter();
    const id = useId();

    const formTitle = blog ? "Update Blog" : "Create Blog";
    const description = blog ? "Update this blog" : "Add a new blog";

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: blog ? blog.title : "",
            blogCategory: blog ? blog.blogCategory : "",
            description: blog ? blog.description : "",
            image: blog ? blog.image : "",
        },
    });

    // Create menu mutation
    const [createBlog, { isLoading, isSuccess, isError }] =
        useCreateBlogMutation();
    const [
        updateBlog,
        {
            isLoading: updateBlogLoading,
            isSuccess: updateBlogSuccess,
            isError: updateBlogError,
        },
    ] = useUpdateBlogMutation();
    const [
        deleteBlog,
        {
            isLoading: deleteBlogLoading,
            isSuccess: deleteBlogSuccess,
            isError: deleteBlogError,
        },
    ] = useDeleteBlogMutation();

    // Form submit function
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            if (blog) {
                await updateBlog({ body: data, id: blog._id });
            } else {
                data.clerkId = "user_2npvSYgJ4PVW52Tj4Y1uQWCEMol";
                await createBlog(data);
            }
        } catch (err) {
            console.error("Error :", err);
        }
    }

    const onDelete = async () => {
        try {
            await deleteBlog(blog._id);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Blog created successfully");
            form.reset();
            router.push("/blog");
        }
        if (updateBlogSuccess) {
            toast.success("Blog updated successfully");
            form.reset();
            router.push("/blog");
        }
        if (deleteBlogSuccess) {
            setActive(null);
            toast.success("Blog deleted successfully");
            router.push("/blog");
        }
        if (isError) {
            toast.error("Failed to create Blog");
        }
        if (updateBlogError) {
            toast.error("Failed to update Blog");
        }
        if (deleteBlogError) {
            setActive(null);
            toast.error("Failed to delete Blog");
        }
    }, [
        form,
        isSuccess,
        updateBlogSuccess,
        deleteBlogSuccess,
        router,
        isError,
        updateBlogError,
        deleteBlogError,
    ]);

    return (
        <div>
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl md:text-[30px] font-bold font-inter mb-[2px] md:mb-1">
                        {formTitle}
                    </h2>
                    <p className="text-sm md:text-base mb-1 pl-[2px]">
                        {description}
                    </p>
                </div>
                <div>
                    {blog && (
                        <>
                            {deleteCards.map((card) => (
                                <motion.div
                                    layoutId={`card-${card.title}-${id}`}
                                    key={`card-${card.title}-${id}`}
                                    onClick={() => setActive(card)}
                                    className="hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
                                >
                                    <motion.button
                                        layoutId={`button-${card.title}-${id}`}
                                        className="px-4 py-2 text-sm rounded-md font-bold bg-red-500 hover:bg-red-700 duration-300 text-white mt-4 md:mt-0"
                                    >
                                        {card.ctaText}
                                    </motion.button>
                                </motion.div>
                            ))}
                            <ExpandableCard
                                {...{
                                    active,
                                    setActive,
                                    onDelete,
                                    deleteLoading: deleteBlogLoading,
                                    id,
                                }}
                            />
                        </>
                    )}
                </div>
            </div>
            <Separator />

            {/* Form elements */}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-1/2 space-y-6 mt-5"
                >
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="ml-[2px]">
                                    Blog Title
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Blog Title"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Select category */}
                    <FormField
                        control={form.control}
                        name="blogCategory"
                        render={({ field }) => (
                            <FormItem className="flex flex-col mt-1">
                                <FormLabel className="mb-1">
                                    Select Category
                                </FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    "w-full justify-between font-normal",
                                                    !field.value &&
                                                        "text-muted-foreground"
                                                )}
                                            >
                                                {field.value
                                                    ? BlogCategories.find(
                                                          (blog) =>
                                                              blog.category ===
                                                              field.value
                                                      )?.category
                                                    : "Select blog"}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-60 p-0">
                                        <Command>
                                            <CommandInput placeholder="Search blog..." />
                                            <CommandList>
                                                <CommandEmpty>
                                                    No blog found.
                                                </CommandEmpty>
                                                <CommandGroup>
                                                    {BlogCategories.map(
                                                        (blog) => (
                                                            <CommandItem
                                                                value={
                                                                    blog.category
                                                                }
                                                                key={blog.id}
                                                                onSelect={() => {
                                                                    form.setValue(
                                                                        "blogCategory",
                                                                        blog.category,
                                                                        {
                                                                            shouldValidate:
                                                                                true,
                                                                        }
                                                                    );
                                                                }}
                                                            >
                                                                <MapPin
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        blog.category ===
                                                                            field.value
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                                {blog.category}
                                                            </CommandItem>
                                                        )
                                                    )}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="ml-[2px]">
                                    Blog Description
                                </FormLabel>
                                <FormControl>
                                    <RichTextEditor
                                        content={field.value}
                                        onChange={(value) =>
                                            field.onChange(value)
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="ml-[2px]">
                                    Blog Image
                                </FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        onChange={(imageUrls) => {
                                            if (imageUrls?.length === 0) {
                                                field.onChange(""); // Set empty string when no image is uploaded
                                            } else {
                                                field.onChange(imageUrls[0]); // Set the first image URL
                                            }
                                        }}
                                        value={field.value ? [field.value] : []} // Ensure value is always an array
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        disabled={isLoading || updateBlogLoading}
                    >
                        {blog ? "Update" : "Submit"}
                        {(isLoading || updateBlogLoading) && (
                            <Loader className="w-5 h-5 animate-spin" />
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default BlogForm;
