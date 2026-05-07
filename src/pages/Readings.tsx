import Button from "../components/ui/Button";
import { Search } from "lucide-react";

const Readings = () => {
  return (
    <div className="">
      <div className="p-7 flex flex-col gap-8 md:px-26 md:py-10 ">
        <header className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-[2.6rem]">Readings</h1>
            <span className="text-xl text-slate-500">
              Manage your daily energy logs.
            </span>
          </div>

          <div>
            <Button variant="sign" className="flex gap-7 items-center">
              <span className="text-xl">+</span>
              <span className="text-xl">Add</span>
            </Button>
          </div>
        </header>

        {/* search item */}
        <section className="w-120">
          <form
            action=""
            className="flex rounded-xl gap-2 p-2 border border-gray-300 focus-within:border-emerald-500 shadow "
          >
            <Search size={30} className="text-gray-300" />
            <input
              autoFocus
              type="text"
              placeholder="Search dates or notes..."
              className="outline-0 flex-1 placeholder:text-gray-4 text-xl"
            />
          </form>
        </section>
      </div>

      {/* content */}
      <section></section>
    </div>
  );
};

export default Readings;
