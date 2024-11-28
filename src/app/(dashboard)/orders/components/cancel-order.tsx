"use client";

import { ExpandableCard } from "@/components/common/expandable-card/expandable-card";
import { useUpdateOrderStatusMutation } from "@/redux/features/order/orderApi";
import { TOrder } from "@/types";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useEffect, useId, useState } from "react";
import { toast } from "sonner";

const CancelOrder = ({ order }: { order: TOrder }) => {
    const [active, setActive] = useState<
        (typeof cancelOrderCards)[number] | boolean | null
    >(null);
    const id = useId();

    const { user: clerkUser } = useUser();

    const [updateOrderStatus, { isLoading, isSuccess, isError }] =
        useUpdateOrderStatusMutation();

    const onDelete = async () => {
        try {
            if (clerkUser?.publicMetadata?.role === "admin") {
                updateOrderStatus({
                    id: order._id,
                    body: {
                        status: "Cancelled",
                    },
                });
            } else {
                toast.error("You do not have permission to cancel the order.");
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            setActive(null);
            toast.success("User deleted successfully");
        }
        if (isError) {
            setActive(null);
            toast.error("Failed to delete User");
        }
    }, [isError, isSuccess]);

    return (
        <div>
            <ExpandableCard
                {...{
                    active,
                    setActive,
                    onDelete,
                    deleteLoading: isLoading,
                    id,
                }}
            />
            <div>
                {cancelOrderCards.map((card) => (
                    <motion.div
                        layoutId={`card-${card.title}-${id}`}
                        key={`card-${card.title}-${id}`}
                        onClick={() => setActive(card)}
                        className="hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
                    >
                        <motion.button
                            layoutId={`button-${card.title}-${id}`}
                            className="flex items-center text-red-600 underline disabled:cursor-not-allowed disabled:text-muted-foreground/40 "
                            disabled={
                                ![
                                    "Order Placed",
                                    "Order Confirmed",
                                    "Cooking",
                                ].includes(order.orderStatus)
                            }
                        >
                            {card.ctaText}
                        </motion.button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default CancelOrder;

const cancelOrderCards = [
    {
        title: "Are you sure to cancel the order?",
        description: "This action cannot be undone.",
        ctaText: "Cancel",
    },
];
