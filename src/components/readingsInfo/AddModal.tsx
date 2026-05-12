const AddModal = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm ">
      <form action="" className="flex flex-col gap-3 bg-white  ">
        <div>
          <h1 className="font-semibold text-lg">Add Reading</h1>
          <p className="text-slate-300">
            Enter your energy consumption details below.
          </p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="date" className="text-left">
            Date
          </label>
          <input type="date" id="date" className="w-full h-3" />
        </div>

        <div>
          <label htmlFor="energy"> Energy Used (kWh)</label>
          <input type="number" id="energy" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="states">States</label>
          <input id="states" type="text" className="ring ring-slate-200" />
        </div>
      </form>
    </div>
  );
};

export default AddModal;
