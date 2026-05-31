import {
  Lightbulb,
  Unplug,
  Thermometer,
  Zap,
  Droplet,
  Wind,
  Fan,
  Award,
  SunDim,
  MoonStar,
} from "lucide-react";

const Tips = () => {
  const tipsObj = [
    {
      icon: <Lightbulb size={30} className="text-button" />,
      head: "Switch to LED Bulbs",
      savings: "Up to 15% savings",
      theTip:
        "Replace all incandescent and CFL bulbs with LEDs. They use up to 90% less energy and last 25 times longer.",
    },
    {
      icon: <Thermometer size={30} className="text-button" />,
      head: "Smart Thermostat",
      savings: "Up to 10% savings",
      theTip:
        "Install a programmable thermostat. It can automatically adjust heating and cooling when you're asleep or away.",
    },
    {
      icon: <Unplug size={30} className="text-button" />,
      head: "Unplug Phantom Loads",
      savings: "Up to 5% savings",
      theTip:
        "Electronics draw power even when turned off. Use smart power strips or unplug devices when not in use.",
    },
    {
      icon: <Zap size={30} className="text-button" />,
      head: "Optimize Fridge Temp",
      savings: "Up to 3% savings",
      theTip:
        "Keep your refrigerator at 37°F (3°C) and freezer at 0°F (-18°C). Ensure seals are tight.",
    },
    {
      icon: <Droplet size={30} className="text-button" />,
      head: "Wash in Cold Water",
      savings: "Up to 12% savings",
      theTip:
        "Heating water accounts for 90% of a washing machine's energy use. Switch to cold water cycles.",
    },
    {
      icon: <Wind size={30} className="text-button" />,
      head: "Air Dry Clothes",
      savings: "Up to 8% savings",
      theTip:
        "Dryers are massive energy hogs. Use a drying rack or clothesline whenever possible.",
    },
    {
      icon: <Fan size={30} className="text-button" />,
      head: "Use Ceiling Fans",
      savings: "Up to 4% savings",
      theTip:
        "Fans allow you to raise your thermostat setting by 4 degrees without reducing comfort.",
    },
    {
      icon: <Award size={30} className="text-button" />,
      head: "Energy Star Appliances",
      savings: "Long-term efficiency",
      theTip:
        "When replacing appliances, look for the Energy Star label to ensure maximum efficiency.",
    },
    {
      icon: <SunDim size={30} className="text-button" />,
      head: "Adjust Display Brightness",
      savings: "Up to 2% savings",
      theTip:
        "Lower the brightness on your monitors and TVs. Use power-saving modes on all electronics.",
    },
    {
      icon: <MoonStar size={30} className="text-button" />,
      head: "Charge Off-Peak",
      savings: "Cost reduction",
      theTip:
        "Run dishwashers, washing machines, and charge devices during off-peak hours (usually late night).",
    },
  ];

  return (
    <div className="p-4 sm:p-6">
      {/* Heading */}
      <header className="flex flex-col justify-center items-center bg-[#e1f5ea] text-center h-40 md:h-55 gap-4 rounded-xl mb-7">
        <h1 className="text-2xl md:text-5xl font-bold">Smart Energy Tips</h1>
        <span className="text-slate-600 md:text-xl px-3 lg:w-2xl">
          Small changes in your daily habits can lead to significant reductions
          in your energy consumption and monthly bills
        </span>
      </header>

      {/* Tip cards */}
      <section className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] md:grid-cols-2 gap-4 w-full">
        {tipsObj.map((tip, index) => (
          <article
            key={index}
            className="flex flex-col gap-4 p-6 bg-white border border-slate-200 rounded-3xl shadow-sm transition-all hover:shadow-md hover:border-emerald-200"
          >
            <header className="flex gap-2 items-center">
              <span className="bg-[#e1f5ea] p-2 rounded-full">{tip.icon}</span>
              <div className="flex flex-col gap-2">
                <h1 className="text-md font-bold md:text-xl">{tip.head}</h1>
                <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md mt-1 w-fit">
                  {tip.savings}
                </span>
              </div>
            </header>

            <aside>{tip.theTip}</aside>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Tips;
