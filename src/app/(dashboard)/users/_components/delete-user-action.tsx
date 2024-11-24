// Packages
import { Trash } from "lucide-react";

// Components
import { ExpandableCard } from "@/components/common/expandable-card/expandable-card";
import { deleteCards } from "@/lib/delete-cards";
import { useDeleteUserMutation } from "@/redux/features/user/userApi";
import { TUser } from "@/types";
import { motion } from "framer-motion";
import { useEffect, useId, useState } from "react";
import { toast } from "sonner";

const DeleteUserAction = ({ user }: { user: TUser }) => {
    const [active, setActive] = useState<
        (typeof deleteCards)[number] | boolean | null
    >(null);
    const id = useId();

    const [
        deleteUser,
        {
            isLoading: deleteUserLoading,
            isSuccess: deleteUserSuccess,
            isError: deleteUserError,
        },
    ] = useDeleteUserMutation();

    const onDelete = async () => {
        try {
            await deleteUser(user.clerkId);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (deleteUserSuccess) {
            setActive(null);
            toast.success("User deleted successfully");
        }
        if (deleteUserError) {
            setActive(null);
            toast.error("Failed to delete User");
        }
    }, [deleteUserError, deleteUserSuccess]);

    return (
        <div>
            <ExpandableCard
                {...{
                    active,
                    setActive,
                    onDelete,
                    deleteLoading: deleteUserLoading,
                    id,
                }}
            />
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
                            className="flex items-center border rounded-md px-3 py-2 hover:text-red-500"
                        >
                            <Trash className="mr-2 h-4 w-4" />
                            {card.ctaText}
                        </motion.button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default DeleteUserAction;
