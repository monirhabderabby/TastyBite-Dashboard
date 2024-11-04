"use client";

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
import {
    useCreateMenuMutation,
    useUpdateMenuMutation,
} from "@/redux/features/menu/menuApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { foodMenuProps } from "../../components/menu-columns";

const FormSchema = z.object({
    name: z.string().min(3, {
        message: "Menu name required.",
    }),
    description: z.string().min(5, {
        message: "Menu description required.",
    }),
    image: z.string().min(1, {
        message: "Menu image required.",
    }),
});

const MenuForm = ({ menu }: { menu: foodMenuProps }) => {
    const formTitle = menu ? "Update Menu" : "Create Menu";
    const description = menu ? "Update this menu" : "Add a new menu";

    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: menu ? menu.name : "",
            description: menu ? menu.description : "",
            image: menu ? menu.image : "",
        },
    });

    // Create menu mutation
    const [createMenu, { isLoading, isSuccess, isError }] =
        useCreateMenuMutation();
    const [
        updateMenu,
        {
            isLoading: updateMenuLoading,
            isSuccess: updateMenuSuccess,
            isError: updateMenuError,
        },
    ] = useUpdateMenuMutation();

    // Form submit function
    async function onSubmit(data: z.infer<typeof FormSchema>) {
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
        if (isError) {
            toast.error("Failed to create menu");
        }
        if (updateMenuError) {
            toast.error("Failed to update menu");
        }
    }, [form, isSuccess, updateMenuSuccess, router, isError, updateMenuError]);

    return (
        <div>
            <div>
                <h2 className="text-2xl md:text-[30px] font-bold font-inter mb-[2px] md:mb-1">
                    {formTitle}
                </h2>
                <p className="text-sm md:text-base mb-1 pl-[2px]">
                    {description}
                </p>
                <Separator />
            </div>

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
                        {menu ? "Update" : "Submit"}
                        {(isLoading || updateMenuLoading) && (
                            <Loader className="w-5 h-5 animate-spin" />
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default MenuForm;
