"use client";

import { foodMenuProps } from "@/app/(dashboard)/menu/components/menu-columns";
import { ExpandableCard } from "@/components/common/expandable-card/expandable-card";
import ImageUpload from "@/components/common/file-upload/single-image-upload-with-edgestore";
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
import { deleteCards } from "@/lib/delete-cards";
import { cn } from "@/lib/utils";
import {
    useCreateFoodMutation,
    useDeleteFoodMutation,
    useUpdateFoodMutation,
} from "@/redux/features/food/foodApi";
import { useGetAllMenusQuery } from "@/redux/features/menu/menuApi";
import { TMenu } from "@/types";
import { FoodSchema } from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ChevronsUpDown, Loader, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface singleFoodProps {
    _id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    menuId: TMenu;
    sizes: [
        {
            size: string;
            price: number;
            description: string;
        }
    ];
    extras: [
        {
            name: string;
            extra_price: number;
        }
    ];
}

const FoodForm = ({ food }: { food: singleFoodProps }) => {
    const formTitle = food ? "Update Food" : "Create Food";
    const description = food ? "Update the food" : "Add a new food";

    const [active, setActive] = useState<
        (typeof deleteCards)[number] | boolean | null
    >(null);
    const router = useRouter();
    const id = useId();

    // Menu data retrieve
    const { data: menuData } = useGetAllMenusQuery({});
    // Food create mutation
    const [
        createFood,
        { isLoading, isError, isSuccess, data: createdFoodInfo },
    ] = useCreateFoodMutation();
    // Food update mutation
    const [
        updateFood,
        {
            isLoading: foodUpdateLoading,
            isSuccess: foodUpdateSuccess,
            isError: foodUpdateError,
        },
    ] = useUpdateFoodMutation();
    // Delete Food mutation
    const [
        deleteFood,
        {
            isLoading: deleteFoodLoading,
            isSuccess: deleteFoodSuccess,
            isError: deleteFoodError,
        },
    ] = useDeleteFoodMutation();

    const form = useForm<z.infer<typeof FoodSchema>>({
        resolver: zodResolver(FoodSchema),
        defaultValues: {
            name: food ? food.name : "",
            description: food ? food.description : "",
            images: food ? food.images : [],
            price: food ? food.price : 0,
            menuId: food ? food.menuId._id : "",
            sizes: food
                ? food.sizes
                : [{ size: "", price: 0, description: "" }],
            extras: food ? food.extras : [{ name: "", extra_price: 0 }],
        },
    });

    // Sizes & Extras field array
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "sizes",
    });
    const {
        fields: extrasFields,
        append: extrasAppend,
        remove: extrasRemove,
    } = useFieldArray({
        control: form.control,
        name: "extras",
    });

    // Submit form
    async function onSubmit(data: z.infer<typeof FoodSchema>) {
        try {
            if (food) {
                await updateFood({ body: data, id: food._id });
            } else {
                await createFood(data);
            }
        } catch (err) {
            console.error("Error :", err);
            toast.error("Failed to create food");
        }
    }

    const onDelete = async () => {
        try {
            await deleteFood(food._id);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(createdFoodInfo?.message);
            form.reset();
            router.push("/foods");
        }
        if (foodUpdateSuccess) {
            toast.success("Food updated successfully");
            form.reset();
            router.push("/foods");
        }
        if (deleteFoodSuccess) {
            setActive(null);
            toast.success("Food deleted successfully");
            router.push("/foods");
        }
        if (isError) {
            toast.error("Failed to create food");
        }
        if (foodUpdateError) {
            toast.error("Failed to update food");
        }
        if (deleteFoodError) {
            toast.error("Failed to delete Food");
        }
    }, [
        createdFoodInfo,
        foodUpdateError,
        foodUpdateSuccess,
        deleteFoodSuccess,
        deleteFoodError,
        form,
        isError,
        isSuccess,
        router,
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
                    {food && (
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
                                    deleteLoading: deleteFoodLoading,
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
                                        Food Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Food Name"
                                            {...field}
                                        />
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
                                        Food Description
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Food Description"
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
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="ml-[2px]">
                                        Food Price
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Food Price"
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(
                                                    e.target.valueAsNumber
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Select menu */}
                        <FormField
                            control={form.control}
                            name="menuId"
                            render={({ field }) => (
                                <FormItem className="flex flex-col mt-1">
                                    <FormLabel className="mb-1">
                                        Select Menu
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
                                                        ? menuData?.data.find(
                                                              (
                                                                  menu: foodMenuProps
                                                              ) =>
                                                                  menu._id ===
                                                                  field.value
                                                          )?.name
                                                        : "Select menu"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-60 p-0">
                                            <Command>
                                                <CommandInput placeholder="Search menu..." />
                                                <CommandList>
                                                    <CommandEmpty>
                                                        No menu found.
                                                    </CommandEmpty>
                                                    <CommandGroup>
                                                        {menuData?.data.map(
                                                            (
                                                                menu: foodMenuProps
                                                            ) => (
                                                                <CommandItem
                                                                    value={
                                                                        menu._id
                                                                    }
                                                                    key={
                                                                        menu._id
                                                                    }
                                                                    onSelect={() => {
                                                                        form.setValue(
                                                                            "menuId",
                                                                            menu._id,
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
                                                                            menu._id ===
                                                                                field.value
                                                                                ? "opacity-100"
                                                                                : "opacity-0"
                                                                        )}
                                                                    />
                                                                    {menu.name}
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
                    </div>

                    {/* Sizes input fields */}
                    <div>
                        <div>
                            <p className="text-xl font-semibold mb-2">
                                Provide available Sizes
                            </p>
                        </div>
                        {fields.map((field, index) => (
                            <div
                                key={field.id}
                                className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5"
                            >
                                <FormField
                                    control={form.control}
                                    name={`sizes.${index}.size`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Size</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Input size"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`sizes.${index}.price`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Input price"
                                                    {...field}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target
                                                                .valueAsNumber
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`sizes.${index}.description`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Input description"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {index > 0 && (
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={() => remove(index)}
                                        className="w-1/4"
                                    >
                                        Remove
                                    </Button>
                                )}
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                append({
                                    size: "",
                                    price: 0,
                                    description: "",
                                })
                            }
                        >
                            Add Size
                        </Button>
                    </div>
                    {/* sizes fields end */}

                    {/* Extras input fields */}
                    <div>
                        <div>
                            <p className="text-xl font-semibold mb-2">
                                Provide available Extra Elements
                            </p>
                        </div>
                        {extrasFields.map((field, index) => (
                            <div
                                key={field.id}
                                className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5"
                            >
                                <FormField
                                    control={form.control}
                                    name={`extras.${index}.name`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Element name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Element name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`extras.${index}.extra_price`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Element price"
                                                    {...field}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target
                                                                .valueAsNumber
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {index > 0 && (
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={() => extrasRemove(index)}
                                        className="w-1/4"
                                    >
                                        Remove
                                    </Button>
                                )}
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                extrasAppend({
                                    name: "",
                                    extra_price: 0,
                                })
                            }
                        >
                            Add Extra Element
                        </Button>
                    </div>
                    {/* Extras fields end */}

                    <FormField
                        control={form.control}
                        name="images"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="ml-[2px]">
                                    Food Images
                                </FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        multiUpload={true}
                                        onChange={(value) => {
                                            field.onChange(value);
                                        }}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        disabled={isLoading || foodUpdateLoading}
                    >
                        {food ? "Update" : "Submit"}
                        {(isLoading || foodUpdateLoading) && (
                            <Loader className="w-5 h-5 animate-spin" />
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default FoodForm;
