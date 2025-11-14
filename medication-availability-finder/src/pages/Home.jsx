
import { useState } from "react";
import { HeroSection } from "../components/HeroSection";
import { SearchBar } from "../components/SearchBar";
import { PharmacyCard } from "../components/PharmacyCard";
import { FeaturesSection } from "../components/FeaturesSection";
import { Activity } from "lucide-react";
import { toast } from "sonner";

// Mock data for demo
const mockPharmacies = [
  {
    id: "1",
    name: "HealthPlus Pharmacy",
    address: "123 Main Street, Colombo 07",
    distance: "0.5 km away",
    phone: "+94 11 234 5678",
    isOpen: true,
    stockLevel: "high",
  },
  {
    id: "2",
    name: "MediCare Pharmacy",
    address: "456 Galle Road, Colombo 03",
    distance: "1.2 km away",
    phone: "+94 11 345 6789",
    isOpen: true,
    stockLevel: "medium",
  },
  {
    id: "3",
    name: "City Pharmacy",
    address: "789 Hospital Road, Colombo 05",
    distance: "2.1 km away",
    phone: "+94 11 456 7890",
    isOpen: false,
    stockLevel: "low",
  },
  {
    id: "4",
    name: "Wellness Pharmacy",
    address: "321 Park Street, Colombo 02",
    distance: "2.8 km away",
    phone: "+94 11 567 8901",
    isOpen: true,
    stockLevel: "high",
  },
];

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (medicine, location) => {
    toast.success(`Searching for "${medicine}" near ${location}...`);
    setSearchResults(mockPharmacies);
    setHasSearched(true);

    // Smooth scroll to results
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 py-6 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="text-card" size={32} />
            <span className="text-2xl font-bold text-card">MedFinder</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection>
        <SearchBar onSearch={handleSearch} />
      </HeroSection>

      {/* Search Results */}
      {hasSearched && (
        <section id="results" className="py-16 px-4 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Available Pharmacies
              </h2>
              <p className="text-muted-foreground">
                Found {searchResults.length} pharmacies with your medicine in stock
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {searchResults.map((pharmacy) => (
                <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {!hasSearched && <FeaturesSection />}

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Activity className="text-primary" size={24} />
            <span className="text-xl font-bold text-foreground">MedFinder</span>
          </div>
          <p className="text-muted-foreground">
            Helping you find the medicines you need, when you need them.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
