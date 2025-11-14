
export const HeroSection = ({ children }) => {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center py-40 px-6 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('assets/hero-pharmacy.jpg')",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10">
        <h1 className="text-5xl font-bold text-white mb-4">
          Find Your Nearest Pharmacy
        </h1>
        <p className="text-lg text-gray-200 max-w-xl mb-8 mx-auto">
          Search for available medicines at nearby pharmacies instantly.
        </p>
        {children}
      </div>
    </section>
  );
};
