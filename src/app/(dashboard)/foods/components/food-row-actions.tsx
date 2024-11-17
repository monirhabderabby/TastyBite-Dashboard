// Packages
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";

// Components
import { ExpandableCard } from "@/components/common/expandable-card/expandable-card";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteCards } from "@/lib/delete-cards";
import { useDeleteFoodMutation } from "@/redux/features/food/foodApi";
import { TFood } from "@/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { toast } from "sonner";

const FoodRowActions = ({ food }: { food: TFood }) => {
    const [active, setActive] = useState<
        (typeof deleteCards)[number] | boolean | null
    >(null);
    const id = useId();

    const [
        deleteFood,
        {
            isLoading: deleteFoodLoading,
            isSuccess: deleteFoodSuccess,
            isError: deleteFoodError,
        },
    ] = useDeleteFoodMutation();

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success(`Food id copied to clipboard.`);
    };

    const onDelete = async () => {
        try {
            await deleteFood(food._id);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (deleteFoodSuccess) {
            setActive(null);
            toast.success("Food deleted successfully");
        }
        if (deleteFoodError) {
            setActive(null);
            toast.error("Failed to delete Food");
        }
    }, [deleteFoodError, deleteFoodSuccess]);

    return (
        <div>
            <ExpandableCard
                {...{
                    active,
                    setActive,
                    onDelete,
                    deleteLoading: deleteFoodLoading,
                    id,
                }}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4 " />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onCopy(food._id)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Id
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link
                            href={`/foods/${food._id}`}
                            className="flex items-center gap-x-2"
                        >
                            <Edit className="mr-2 h-4 w-4" />
                            Update
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <div>
                            {deleteCards.map((card) => (
                                <motion.div
                                    layoutId={`card-${card.title}-${id}`}
                                    key={`card-${card.title}-${id}`}
                                    onClick={() => setActive(card)}
                                    className="hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
                                >
                                    <motion.button
                                        layoutId={`button-${card.title}-${id}`}
                                        className="flex items-center gap-x-2"
                                    >
                                        <Trash className="mr-2 h-4 w-4" />
                                        {card.ctaText}
                                    </motion.button>
                                </motion.div>
                            ))}
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default FoodRowActions;
