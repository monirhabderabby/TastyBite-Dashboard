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
import { useGetAllDeliveryManQuery } from "@/redux/features/user/userApi";
import { TOrder, TUser } from "@/types";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
    deliveryManId: z.string(),
});

const UpdateDeliveryMan = ({ order }: { order: TOrder }) => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            deliveryManId: order.deliveryMan?._id || "",
        },
    });

    const { user: clerkUser } = useUser();

    const { data: deliveryManData, isLoading: deliveryManLoading } =
        useGetAllDeliveryManQuery({});

    const DeliveryManSelectItems = deliveryManData?.data.map(
        (deliveryMan: TUser) => (
            <SelectItem key={deliveryMan._id} value={deliveryMan._id}>
                {deliveryMan.name}
            </SelectItem>
        )
    );

    const [updateOrderStatus, { isLoading, isSuccess }] =
        useUpdateOrderStatusMutation();

    function onSubmit(data: z.infer<typeof FormSchema>) {
        if (clerkUser?.publicMetadata?.role === "admin") {
            updateOrderStatus({
                id: order._id,
                body: {
                    status: "Out For Delivery",
                    deliveryMan: data.deliveryManId,
                },
            });
        } else {
            toast.error("You do not have permission to update the order.");
        }
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success("Delivery man assigned successfully");
        }
    }, [isSuccess]);

    if (deliveryManLoading) {
        return;
    }

    return (
        <div className="w-fit">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex items-center"
                >
                    <FormField
                        control={form.control}
                        name="deliveryManId"
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
                                        order.orderStatus !== "Cooking"
                                    }
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select delivery man" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {DeliveryManSelectItems}
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

export default UpdateDeliveryMan;
