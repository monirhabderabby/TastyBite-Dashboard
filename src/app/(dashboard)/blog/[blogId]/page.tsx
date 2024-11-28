import Blog from "./components/blog";

const BlogFormPage = ({ params }: { params: { blogId: string } }) => {
    return (
        <div>
            <Blog blogId={params.blogId}></Blog>
        </div>
    );
};

export default BlogFormPage;
