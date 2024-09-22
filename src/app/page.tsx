import Cards from "@/components/ui/Cards";
import Link from "next/link";

const Home = async () => {
  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <header className="p-4 bg-[#111]">
          <nav className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-red-600">
              Best Movies Hub
            </Link>
            <div className="space-x-4">
              <Link href="#" className="hover:text-blue-400">
                Disclaimer
              </Link>
              <Link href="#" className="hover:text-blue-400">
                How To Download ?
              </Link>
              <Link href="#" className="hover:text-blue-400">
                Join Our Group !
              </Link>
              <Link href="#" className="hover:text-blue-400">
                Movie Request Page
              </Link>
            </div>
          </nav>
        </header>
        <Cards movies={[]} />
      </div>
    </>
  );
};

export default Home;

// Define getStaticProps to fetch data at build time
