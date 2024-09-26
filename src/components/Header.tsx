import { Input } from "@/components/ui/SearchInput";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <Link
          href="/"
          className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0"
        >
          {/* <img href="/" src="/images/logo.png" alt="Logo" /> */}
          {/* <div className="relative w-[100px] "> */}
          <Image
            src="/images/logo.png"
            alt="logo"
            // fill={true}
            width={150}
            height={100}
            // height={"auto"}
            // objectFit="fit"
            objectFit="contain"
            className="rounded-md"
          />
          {/* </div> */}
        </Link>
        <Input
          type="search"
          placeholder="Search movies..."
          className="max-w-xs"
        />
      </div>
    </header>
  );
}
