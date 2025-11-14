const Navbar = () => (
  <nav className="bg-blue-700 text-white p-4 flex justify-between items-center">
    <h1 className="text-2xl font-bold">Medication Finder</h1>
    <div>
      <button className="mx-2 hover:underline">Home</button>
      <button className="mx-2 hover:underline">Profile</button>
      <button className="mx-2 hover:underline">Logout</button>
    </div>
  </nav>
);
export default Navbar;
