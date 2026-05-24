const Navbar = () => {

  return (
    <nav className="backdrop-blur-lg bg-white/10 border-b border-white/20 shadow-lg p-5">

      <div className="max-w-5xl mx-auto flex justify-between items-center">

        <h1 className="text-4xl font-bold text-white">

          Expense Tracker

        </h1>

        <div className="text-white font-semibold">

          Dashboard

        </div>

      </div>

    </nav>
  );
};

export default Navbar;