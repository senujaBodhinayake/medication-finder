import { useState } from "react";
import { Button } from "../components/ui/button"; // optional if you're using shadcn/ui

export const SearchBar = ({ onSearch }) => {
  const [medicine, setMedicine] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!medicine || !location) return;
    onSearch(medicine, location);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-center gap-3 w-full max-w-2xl mx-auto mt-8"
    >
      <input
        type="text"
        placeholder="Enter medicine name"
        value={medicine}
        onChange={(e) => setMedicine(e.target.value)}
        className="w-full md:w-1/2 px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="text"
        placeholder="Enter your location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full md:w-1/2 px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <Button type="submit" className="w-full md:w-auto px-6 py-3 rounded-xl">
        Search
      </Button>
    </form>
  );
};
