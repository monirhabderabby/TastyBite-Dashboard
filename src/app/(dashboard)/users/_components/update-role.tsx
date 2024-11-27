"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useUpdateUserRoleMutation } from "@/redux/features/user/userApi";
import { TUser } from "@/types";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
    role: z.string(),
});

const UpdateRole = ({ user }: { user: TUser }) => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            role: user.role || "",
        },
    });

    const { user: clerkUser } = useUser();

    const [updateUserRole, { isLoading, isSuccess }] =
        useUpdateUserRoleMutation();

    function onSubmit(data: z.infer<typeof FormSchema>) {
        if (clerkUser?.publicMetadata?.role === "admin") {
            updateUserRole({
                id: user._id,
                body: {
                    _id: user._id,
                    clerkId: user.clerkId,
                    role: data.role,
                },
            });
        } else {
            toast.error("You do not have permission to update this user.");
        }
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success("User role updated successfully");
        }
    }, [isSuccess]);

    return (
        <div className="w-fit">
            <Form {...form}>
                <form
                    onChange={form.handleSubmit(onSubmit)}
                    className="flex items-center"
                >
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem className="w-36">
                                <Select
                                    onValueChange={(value) => {
                                        field.onChange(value);
                                        form.handleSubmit(onSubmit)();
                                    }}
                                    defaultValue={field.value}
                                    disabled={isLoading}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select role" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="admin">
                                            Admin
                                        </SelectItem>
                                        <SelectItem value="user">
                                            User
                                        </SelectItem>
                                        <SelectItem value="delivery man">
                                            Delivery Man
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    );
};

export default UpdateRole;
