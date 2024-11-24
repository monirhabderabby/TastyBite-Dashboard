import SectionHeader from "@/components/common/section-header/section-header";
import { Separator } from "@/components/ui/separator";
import UsersTable from "./_components/users-table";

const UsersPage = () => {
    return (
        <div>
            <SectionHeader title="Users" subTitle="Manage all users" />
            <Separator className="mb-4" />
            <UsersTable />
        </div>
    );
};

export default UsersPage;
