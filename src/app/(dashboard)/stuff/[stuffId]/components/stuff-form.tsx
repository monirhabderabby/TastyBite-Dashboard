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
    useCreateStuffMutation,
    useDeleteStuffMutation,
    useUpdateStuffMutation,
} from "@/redux/features/stuff/stuffApi";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(3, {
        message: "Stuff name required.",
    }),
    phoneNo: z.string().min(5, {
        message: "Stuff phone number required.",
    }),
    designation: z.string().min(1, {
        message: "Stuff designation required.",
    }),
    address: z.string().min(1, {
        message: "Stuff address required.",
    }),
    bio: z.string().optional(),
    facebookLink: z.string().optional(),
    linkedinLink: z.string().optional(),
    instagramLink: z.string().optional(),
    youtubeLink: z.string().optional(),
    image: z.string().min(1, {
        message: "Stuff image required.",
    }),
});

export interface stuffProps {
    _id: string;
    email?: string;
    name: string;
    phoneNo: string;
    designation: string;
    address: string;
    bio?: string;
    facebookLink?: string;
    linkedinLink?: string;
    instagramLink?: string;
    youtubeLink?: string;
    image: string;
}

const StuffForm = ({ stuff }: { stuff: stuffProps }) => {
    const formTitle = stuff ? "Update Stuff" : "Create Stuff";
    const description = stuff ? "Update this Stuff" : "Add a new Stuff";

    const [active, setActive] = useState<
        (typeof deleteCards)[number] | boolean | null
    >(null);
    const router = useRouter();
    const id = useId();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: stuff ? stuff.email : "",
            name: stuff ? stuff.name : "",
            phoneNo: stuff ? stuff.phoneNo : "",
            designation: stuff ? stuff.designation : "",
            address: stuff ? stuff.address : "",
            bio: stuff ? stuff.bio : "",
            image: stuff ? stuff.image : "",
            facebookLink: stuff ? stuff.facebookLink : "",
            instagramLink: stuff ? stuff.instagramLink : "",
            linkedinLink: stuff ? stuff.linkedinLink : "",
            youtubeLink: stuff ? stuff.youtubeLink : "",
        },
    });

    // Create Stuff mutation
    const [createStuff, { isLoading, isSuccess, isError }] =
        useCreateStuffMutation();
    // Update Stuff mutation
    const [
        updateStuff,
        {
            isLoading: updateStuffLoading,
            isSuccess: updateStuffSuccess,
            isError: updateStuffError,
        },
    ] = useUpdateStuffMutation();
    // Delete Stuff mutation
    const [
        deleteStuff,
        {
            isLoading: deleteStuffLoading,
            isSuccess: deleteStuffSuccess,
            isError: deleteStuffError,
        },
    ] = useDeleteStuffMutation();

    // Form submit function
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            if (stuff) {
                await updateStuff({ body: data, id: stuff._id });
            } else {
                await createStuff(data);
            }
        } catch (err) {
            console.error("Error :", err);
        }
    }

    const onDelete = async () => {
        try {
            await deleteStuff(stuff._id);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Stuff created successfully");
            form.reset();
            router.push("/stuff");
        }
        if (updateStuffSuccess) {
            toast.success("Stuff updated successfully");
            form.reset();
            router.push("/stuff");
        }
        if (deleteStuffSuccess) {
            setActive(null);
            toast.success("Stuff deleted successfully");
            router.push("/stuff");
        }
        if (isError) {
            toast.error("Failed to create Stuff");
        }
        if (updateStuffError) {
            toast.error("Failed to update Stuff");
        }
        if (deleteStuffError) {
            toast.error("Failed to delete Stuff");
        }
    }, [
        form,
        isSuccess,
        updateStuffSuccess,
        deleteStuffSuccess,
        router,
        isError,
        updateStuffError,
        deleteStuffError,
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
                    {stuff && (
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
                                    deleteLoading: deleteStuffLoading,
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
                    className="w-2/3 space-y-6 mt-5"
                >
                    <div className="grid grid-cols-2 gap-5">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="ml-[2px]">
                                        Stuff Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Stuff Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="ml-[2px]">
                                        Stuff Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Stuff email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <FormField
                            control={form.control}
                            name="phoneNo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="ml-[2px]">
                                        Phone Number
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Phone Number"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="designation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="ml-[2px]">
                                        Designation
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Designation"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="ml-[2px]">
                                        Address
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Stuff address"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="ml-[2px]">
                                        Bio
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Bio" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <FormField
                            control={form.control}
                            name="facebookLink"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="ml-[2px]">
                                        Facebook Id
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Facebook url"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="instagramLink"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="ml-[2px]">
                                        Instagram Id
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Instagram link"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <FormField
                            control={form.control}
                            name="linkedinLink"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="ml-[2px]">
                                        LinkedIn Id
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="LinkedIn url"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="youtubeLink"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="ml-[2px]">
                                        Youtube Id
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Youtube link"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="ml-[2px]">
                                    Stuff Image
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
                        disabled={isLoading || updateStuffLoading}
                    >
                        {stuff ? "Update" : "Submit"}
                        {(isLoading || updateStuffLoading) && (
                            <Loader className="w-5 h-5 animate-spin" />
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default StuffForm;
