"use client";

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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronsUpDown, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
    name: z.string().min(3, {
        message: "Food name required.",
    }),
    description: z.string().min(5, {
        message: "Food description required.",
    }),
    price: z.string().min(1, {
        message: "Price is required.",
    }),
    images: z.array(z.string().min(1)).min(1, {
        message: "Food images are required.",
    }),
    menuId: z.string().min(1, {
        message: "Menu is required",
    }),
});

const FoodForm = () => {
    const formTitle = "Create Food";
    const description = "Add a new food";

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            description: "",
            images: [],
            price: "",
            menuId: "",
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);
    }

    const menus = [
        { value: "Burger", label: "Burger" },
        { value: "Pizza", label: "Pizza" },
        { value: "Pasta", label: "Pasta" },
        { value: "Drink", label: "Drink" },
    ];

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
                                            placeholder="Food Price"
                                            {...field}
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
                                                        ? menus.find(
                                                              (menu) =>
                                                                  menu.value ===
                                                                  field.value
                                                          )?.label
                                                        : "Select menu"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full p-0">
                                            <Command>
                                                <CommandInput placeholder="Search country..." />
                                                <CommandList>
                                                    <CommandEmpty>
                                                        No menu found.
                                                    </CommandEmpty>
                                                    <CommandGroup>
                                                        {menus.map((menu) => (
                                                            <CommandItem
                                                                value={
                                                                    menu.label
                                                                }
                                                                key={menu.value}
                                                                onSelect={() => {
                                                                    form.setValue(
                                                                        "menuId",
                                                                        menu.value
                                                                    );
                                                                }}
                                                            >
                                                                <MapPin
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        menu.value ===
                                                                            field.value
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                                {menu.label}
                                                            </CommandItem>
                                                        ))}
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

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
};

export default FoodForm;
