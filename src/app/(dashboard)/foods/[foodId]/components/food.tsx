import FoodForm from "./food-form";

const Food = ({ foodId }: { foodId: string }) => {
    console.log(foodId);
    return (
        <div>
            <FoodForm />
        </div>
    );
};

export default Food;
