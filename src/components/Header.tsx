"use client";
import { useSearch } from "@/app/actions/store/globalStore";
import { Input } from "@/components/ui/SearchInput";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const { search, setSearch } = useSearch();

  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (search) {
        router.push(`/?s=${encodeURIComponent(search)}`);
      } else {
        router.push(`/`);
      }
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <Link
          href="/"
          className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0"
          onClick={(e) => {
            e.preventDefault();
            location.href = "/";
          }}
        >
          <Image
            src="/images/logo.png"
            alt="logo"
            width={150}
            height={100}
            objectFit="contain"
            className="rounded-md"
          />
        </Link>
        <div className="flex space-x-4">
          <Link
            href="/about"
            className="cursor-pointer flex items-center mr-6 hover:text-blue-500 border-b-2 border-blue-500"
          >
            About
          </Link>

          <Input
            type="search"
            placeholder="Search movies..."
            className="max-w-xs"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            onKeyPress={handleSearch}
          />
        </div>
      </div>
      {/* <div>
        <AdBanner
          height={90}
          width={728}
          id="3dfc2513e4419023095db69838be11e5"
        />
      </div> */}
    </header>
  );
}
