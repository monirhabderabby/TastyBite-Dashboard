import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

interface Props {
    title: string;
    subTitle: string;
    btnLink?: string;
}

const SectionHeader: React.FC<Props> = ({ title, subTitle, btnLink }) => {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-primary-black text-[30px] font-bold">
                    {title}
                </h2>
                <p className="text-primary-gray text-sm mb-1">{subTitle}</p>
            </div>
            {btnLink && (
                <Link href={btnLink}>
                    <Button
                        className="text-sm bg-primary-black hover:bg-primary-orange text-white hover:text-primary-black rounded-md px-3 py-2 duration-300"
                        size="sm"
                    >
                        <Plus className="h-4 w-4" />
                        Add New
                    </Button>
                </Link>
            )}
        </div>
    );
};

export default SectionHeader;
