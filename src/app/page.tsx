import { LayoutDashboard } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex justify-center items-center bg-primary-brack">
      <div className="flex flex-col text-white items-center gap-y-3">
        <LayoutDashboard className="text-white h-10 w-10" />
        <span className="font-pacifico text-primary-orange text-[30px]">
          TastyBite
        </span>
      </div>
    </main>
  );
}
