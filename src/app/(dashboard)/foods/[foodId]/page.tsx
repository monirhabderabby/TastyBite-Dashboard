import Food from "./components/food";

const FoodFormPage = ({ params }: { params: { foodId: string } }) => {
    return (
        <div>
            <Food foodId={params.foodId}></Food>
        </div>
    );
};

export default FoodFormPage;
