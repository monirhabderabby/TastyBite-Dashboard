import Menu from "./components/menu";

const MenuFormPage = ({ params }: { params: { menuId: string } }) => {
    return (
        <div>
            <Menu menuId={params.menuId}></Menu>
        </div>
    );
};

export default MenuFormPage;
