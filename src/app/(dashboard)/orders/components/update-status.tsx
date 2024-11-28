"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useUpdateOrderStatusMutation } from "@/redux/features/order/orderApi";
import { TOrder } from "@/types";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
    orderStatus: z.string(),
});

const UpdateStatus = ({ order }: { order: TOrder }) => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            orderStatus: order.orderStatus || "",
        },
    });

    const { user: clerkUser } = useUser();

    const [updateOrderStatus, { isLoading, isSuccess }] =
        useUpdateOrderStatusMutation();

    function onSubmit(data: z.infer<typeof FormSchema>) {
        if (clerkUser?.publicMetadata?.role === "admin") {
            updateOrderStatus({
                id: order._id,
                body: {
                    status: data.orderStatus,
                },
            });
        } else {
            toast.error("You do not have permission to update the order.");
        }
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success("Order status updated successfully");
        }
    }, [isSuccess]);

    return (
        <div className="w-fit">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex items-center"
                >
                    <FormField
                        control={form.control}
                        name="orderStatus"
                        render={({ field }) => (
                            <FormItem className="w-36">
                                <Select
                                    onValueChange={(value) => {
                                        field.onChange(value);
                                        form.handleSubmit(onSubmit)();
                                    }}
                                    defaultValue={field.value}
                                    disabled={
                                        isLoading ||
                                        ![
                                            "Order Placed",
                                            "Order Confirmed",
                                            "Cooking",
                                            "Order Cancelled",
                                        ].includes(order.orderStatus)
                                    }
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select role" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Order Placed">
                                            Order Placed
                                        </SelectItem>
                                        <SelectItem value="Order Confirmed">
                                            Order Confirmed
                                        </SelectItem>
                                        <SelectItem value="Cooking">
                                            Cooking
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

export default UpdateStatus;
