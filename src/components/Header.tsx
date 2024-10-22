"use client";
import { useSearch } from "@/app/actions/store/globalStore";
import { Input } from "@/components/ui/SearchInput";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";
import { useState } from "react";
import Modal from "./Model";
import addRequest from "@/app/actions/request";

export default function Header() {
  const { search, setSearch } = useSearch();

  const router = useRouter();

  const [showRequestPopup, setShowRequestPopup] = useState(false);
  const [requestData, setRequestData] = useState("");

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
    <>
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
          <div className="flex flex-wrap  sm:flex-nowrap justify-center">
            <Button
              variant="outline"
              onClick={() => {
                setShowRequestPopup(true);
              }}
              className="w-60 font-medium mx-3 border-blue-950 hover:bg-slate-100 hover:text-blue-500 hover:border-blue-500"
            >
              Request Movies or Suggest
            </Button>

            <Link
              href="/about"
              className="cursor-pointer flex items-center mx-3 hover:text-blue-500 border-b-2 border-blue-500"
            >
              About
            </Link>

            <Input
              type="search"
              placeholder="Search movies..."
              className="max-w-[305px] mx-3"
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

      <Modal
        isOpen={showRequestPopup}
        onClose={() => setShowRequestPopup(false)}
        title="Movie Request or Suggestion"
      >
        <form>
          <div className="mb-4">
            <textarea
              placeholder="Enter your request here..."
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300`}
              onChange={(e) => setRequestData(e.target.value)}
            />

            <Button
              variant="default"
              onClick={(e) => {
                e.preventDefault();
                addRequest({
                  requestData,
                  userId: localStorage.getItem("userUUID"),
                }).then(() => setShowRequestPopup(false));
              }}
              className="w-full font-medium mr-6 border-blue-950 hover:bg-slate-100 hover:text-blue-500 hover:border-blue-500"
            >
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
