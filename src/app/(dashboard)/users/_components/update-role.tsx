"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useUpdateUserMutation } from "@/redux/features/user/userApi";
import { TUser } from "@/types";
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

    const [updateUser, { isLoading, isSuccess }] = useUpdateUserMutation();

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);
        updateUser({ id: user._id, body: { role: data.role } });
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
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex items-center gap-x-2"
                >
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem className="w-40">
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
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
                    <Button type="submit" disabled={isLoading}>
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default UpdateRole;
