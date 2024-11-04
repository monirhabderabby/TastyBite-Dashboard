import Stuff from "./components/stuff";

const StuffFormPage = ({ params }: { params: { stuffId: string } }) => {
    return (
        <div>
            <Stuff stuffId={params.stuffId}></Stuff>
        </div>
    );
};

export default StuffFormPage;
