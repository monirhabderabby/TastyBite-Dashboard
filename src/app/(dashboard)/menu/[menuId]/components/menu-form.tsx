"use client";

import { ExpandableCard } from "@/components/common/expandable-card/expandable-card";
import ImageUpload from "@/components/common/file-upload/single-image-upload-with-edgestore";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { deleteCards } from "@/lib/delete-cards";
import {
    useCreateMenuMutation,
    useDeleteMenuMutation,
    useUpdateMenuMutation,
} from "@/redux/features/menu/menuApi";
import { MenuSchema } from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { foodMenuProps } from "../../components/menu-columns";

const MenuForm = ({ menu }: { menu: foodMenuProps }) => {
    const formTitle = menu ? "Update Menu" : "Create Menu";
    const description = menu ? "Update this menu" : "Add a new menu";

    const [active, setActive] = useState<
        (typeof deleteCards)[number] | boolean | null
    >(null);
    const router = useRouter();
    const id = useId();

    const form = useForm<z.infer<typeof MenuSchema>>({
        resolver: zodResolver(MenuSchema),
        defaultValues: {
            name: menu ? menu.name : "",
            description: menu ? menu.description : "",
            image: menu ? menu.image : "",
        },
    });

    // Create menu mutation
    const [createMenu, { isLoading, isSuccess, isError }] =
        useCreateMenuMutation();
    // Update menu mutation
    const [
        updateMenu,
        {
            isLoading: updateMenuLoading,
            isSuccess: updateMenuSuccess,
            isError: updateMenuError,
        },
    ] = useUpdateMenuMutation();
    // Delete Menu mutation
    const [
        deleteMenu,
        {
            isLoading: deleteMenuLoading,
            isSuccess: deleteMenuSuccess,
            isError: deleteMenuError,
        },
    ] = useDeleteMenuMutation();

    // Form submit function
    async function onSubmit(data: z.infer<typeof MenuSchema>) {
        try {
            if (menu) {
                await updateMenu({ body: data, id: menu._id });
            } else {
                await createMenu(data);
            }
        } catch (err) {
            console.error("Error :", err);
        }
    }

    const onDelete = async () => {
        try {
            await deleteMenu(menu._id);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Menu created successfully");
            form.reset();
            router.push("/menu");
        }
        if (updateMenuSuccess) {
            toast.success("Menu updated successfully");
            form.reset();
            router.push("/menu");
        }
        if (deleteMenuSuccess) {
            setActive(null);
            toast.success("Menu deleted successfully");
            router.push("/menu");
        }
        if (isError) {
            toast.error("Failed to create menu");
        }
        if (updateMenuError) {
            toast.error("Failed to update menu");
        }
        if (deleteMenuError) {
            toast.error("Failed to delete Menu");
        }
    }, [
        form,
        isSuccess,
        updateMenuSuccess,
        deleteMenuSuccess,
        router,
        isError,
        updateMenuError,
        deleteMenuError,
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
                    {menu && (
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
                                    deleteLoading: deleteMenuLoading,
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
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="ml-[2px]">
                                    Menu Name
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Menu Name" {...field} />
                                </FormControl>
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
                                    Menu Description
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Menu Description"
                                        {...field}
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
                                    Menu Image
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
                        disabled={isLoading || updateMenuLoading}
                    >
                        {menu ? "Update" : "Create"}
                        {(isLoading || updateMenuLoading) && (
                            <Loader className="w-5 h-5 animate-spin" />
                        )}
                    </Button>
                    {menu && (
                        <Button
                            type="button"
                            variant="outline"
                            className="ml-3"
                            onClick={() => router.back()}
                        >
                            Back
                        </Button>
                    )}
                </form>
            </Form>
        </div>
    );
};

export default MenuForm;
