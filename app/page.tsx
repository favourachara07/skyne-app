import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <div
      className="relative flex items-center justify-center min-h-[75vh] md:min-h-[80vh] overflow-hidden"
      style={{
        backgroundImage:
          'linear-gradient(rgba(30,30,30,0.55),rgba(30,30,30,0.55)), url("/hero.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className=" md:hidden  absolute z-100 inset-0">
        <Link
          href="/"
          className="text-xl font-semibold text-amber-800 flex items-center"
        >
          <Image width={80} height={80} src="/skyne.png" className="max-h-20" alt="" />
        </Link>
      </div>
      <div className="z-10 w-full text-center flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg tracking-tight">
          Welcome to Skyne
        </h1>
        <p className="text-lg md:text-2xl text-gray-100 mb-8 max-w-xl mx-auto drop-shadow">
          Discover the best skincare products and trusted brands.
        </p>
        <Link
          href="/brands"
          className="inline-block bg-gradient-to-r from-amber-700 to-amber-900 text-white px-8 py-4 rounded-full shadow-xl hover:scale-105 hover:from-amber-800 hover:to-amber-950 transition-all font-semibold text-lg"
        >
          Explore Brands
        </Link>
      </div>
      {/* Optional: Decorative overlay for extra slickness */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
    </div>
  );
};

export default Home;
