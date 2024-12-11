import Food from "./components/food";

const FoodFormPage = ({ params }: { params: { foodId: string } }) => {
  return (
    <div className="pb-[50px]">
      <Food foodId={params.foodId}></Food>
    </div>
  );
};

export default FoodFormPage;
