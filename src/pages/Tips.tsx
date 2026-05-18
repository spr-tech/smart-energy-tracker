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
      icon: <Lightbulb />,
      head: "Switch to Led Bulbs",
      savings: "Up to 15% savings",
      theTip:
        "Replace all incandescent and CFL bulbs with LEDs. They use up to 90% less energy and last 25 times longer.",
    },
    {
      icon: <Thermometer />,
      head: "Smart Thermostat",
      savings: "Up to 10% savings",
      theTip:
        "Install a programmable thermostat. It can automatically adjust heating and cooling when you're asleep or away.",
    },
    {
      icon: <Unplug />,
      head: "Unplug Phantom Loads",
      savings: "Up to 5% savings",
      theTip:
        "Electronics draw power even when turned off. Use smart power strips or unplug devices when not in use.",
    },
    {
      icon: <Zap />,
      head: "Optimize Fridge Temp",
      savings: "Up to 3% savings",
      theTip:
        "Keep your refrigerator at 37°F (3°C) and freezer at 0°F (-18°C). Ensure seals are tight.",
    },
    {
      icon: <Droplet />,
      head: "Wash in Cold Water",
      savings: "Up to 12% savings",
      theTip:
        "Heating water accounts for 90% of a washing machine's energy use. Switch to cold water cycles.",
    },
    {
      icon: <Wind />,
      head: "Air Dry Clothes",
      savings: "Up to 8% savings",
      theTip:
        "Dryers are massive energy hogs. Use a drying rack or clothesline whenever possible..",
    },
    {
      icon: <Fan />,
      head: "Use Ceiling Fans",
      savings: "Up to 4% savings",
      theTip:
        "Fans allow you to raise your thermostat setting by 4 degrees without reducing comfort..",
    },
    {
      icon: <Award />,
      head: "Energy Star Appliances",
      savings: "Long-term efficiency",
      theTip:
        "When replacing appliances, look for the Energy Star label to ensure maximum efficiency.",
    },
    {
      icon: <SunDim />,
      head: "Adjust Display BrightnessSwitch to Led Bulbs",
      savings: "Up to 2% savings",
      theTip:
        "Lower the brightness on your monitors and TVs. Use power-saving modes on all electronics.",
    },
    {
      icon: <MoonStar />,
      head: "Charge Off-Peak",
      savings: "Cost reduction",
      theTip:
        "Run dishwashers, washing machines, and charge devices during off-peak hours (usually late night).",
    },
  ];

  return (
    <div>
      {/* Heading */}
      <header className="flex flex-col justify-center items-center bg-[#e1f5ea] text-center h-55 gap-4 rounded-xl">
        <h1 className="text-5xl font-bold">Smart Energy Tips</h1>
        <span className="text-slate-600 text-xl text-wrap lg:w-2xl">
          Small changes in your daily habits can lead to significant reductions
          in your energy consumption and monthly bills
        </span>
      </header>

      {/* tip cards */}
      <section className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-30 w-full h-50 round">
        {tipsObj.map((tip, index) => (
          <article key={index}>
            <header>
              <span><FaLig></></span>
            </header>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Tips;
