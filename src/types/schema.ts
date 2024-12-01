import { z } from "zod";

export const BlogSchema = z.object({
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

export const sizesItemSchema = z.object({
    size: z.string().min(1, "Size is required"),
    price: z.coerce.number().min(1, "Price must be a positive number"),
    description: z.string().min(1, "Description is required"),
});

export const extraItemSchema = z.object({
    name: z.string(),
    extra_price: z.coerce.number(),
});

export const FoodSchema = z.object({
    name: z.string().min(3, {
        message: "Food name required.",
    }),
    description: z.string().min(5, {
        message: "Food description required.",
    }),
    price: z.coerce.number().min(1, {
        message: "Price must be a positive number.",
    }),
    images: z.array(z.string().min(1)).min(1, {
        message: "Food images are required.",
    }),
    menuId: z.string().min(1, {
        message: "Menu is required",
    }),
    sizes: z.array(sizesItemSchema).optional(),
    extras: z.array(extraItemSchema).optional(),
});

export const MenuSchema = z.object({
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

export const StuffSchema = z.object({
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
