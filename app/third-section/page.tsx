import Image from "next/image";
import Overview from "./bar-chart";
import { getCustomersPerMonth } from "@/lib/actions";

const ThirdSection = async () => {
  const dataChart = await getCustomersPerMonth()
  
  return (
    <div
      className="
    flex
    p-10
    flex-col md:flex-row md:justify-evenly
   
    "
    >
      <div className="flex-col md:flex-row gap-6 md:px-10 flex">
        <div className="md:w-2/3 w-full">
          <video className="rounded-xl" autoPlay muted loop>
            <source src="/content/video-3.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="flex-col border p-4 rounded-xl md:w-2/5 justify-between">
          <div
            className="text-4xl flex justify-center text-center
                md:text-6xl
                bg-gradient-to-l
                from-yellow-300
                to-blue-300
                bg-clip-text
                font-bold
                text-transparent
                
                
                "
          >
            Client reservation chart
          </div>

          <Overview data={dataChart}/>
        </div>
      </div>
    </div>
  );
};

export default ThirdSection;
