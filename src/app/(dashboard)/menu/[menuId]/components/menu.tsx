import MenuForm from "./menu-form";

const Menu = ({ menuId }: { menuId: string }) => {
    console.log(menuId);
    return (
        <div>
            <MenuForm />
        </div>
    );
};

export default Menu;
