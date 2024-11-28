import { SignIn } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <SignIn routing="hash" />
    </div>
  );
};

export default page;
