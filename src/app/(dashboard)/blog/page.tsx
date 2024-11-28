import SectionHeader from "@/components/common/section-header/section-header";
import { Separator } from "@/components/ui/separator";
import dynamic from "next/dynamic";

const BlogTable = dynamic(() => import("./components/blog-table"));

const BlogPage = () => {
    return (
        <div>
            <SectionHeader
                title="Blog"
                subTitle="Manage all blog"
                btnLink="/blog/create"
            />
            <Separator className="mb-4" />
            <BlogTable />
        </div>
    );
};

export default BlogPage;
