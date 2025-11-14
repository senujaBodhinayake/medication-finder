export const PharmacyCard = ({ pharmacy }) => {
  const getStockColor = (level) => {
    switch (level) {
      case "high":
        return "text-green-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-red-600";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="border border-border rounded-2xl p-6 bg-card shadow-sm hover:shadow-md transition">
      <h3 className="text-xl font-bold text-foreground mb-2">
        {pharmacy.name}
      </h3>
      <p className="text-muted-foreground mb-1">{pharmacy.address}</p>
      <p className="text-muted-foreground mb-1">{pharmacy.distance}</p>
      <p className="text-muted-foreground mb-2">{pharmacy.phone}</p>
      <p className={`font-semibold ${getStockColor(pharmacy.stockLevel)}`}>
        Stock: {pharmacy.stockLevel}
      </p>
      <p
        className={`mt-2 text-sm ${
          pharmacy.isOpen ? "text-green-500" : "text-red-500"
        }`}
      >
        {pharmacy.isOpen ? "Open Now" : "Closed"}
      </p>
    </div>
  );
};
