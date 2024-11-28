import Link from "next/link";

const Logo = () => {
    return (
        <Link
            href="/"
            className="font-courgette text-white font-semibold text-[30px]"
        >
            <span className="text-primary-orange">Tasty </span>
            <span className="text-primary-black">Bite</span>
        </Link>
    );
};

export default Logo;
