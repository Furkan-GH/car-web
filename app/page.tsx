import BarrierComponent from "@/components/BarrierComponent";
import CameraComponent from "@/components/CameraComponent";
import FanComponent from "@/components/FanComponent";
import WaterTankComponent from "@/components/WaterTankComponent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-between px-24 py-10 gap-4">
      {/* Tab Header */}
      <Tabs defaultValue="watertank" className="w-full rounded-md shadow-md overflow-hidden">
        <TabsList className="flex justify-evenly bg-rose-950">
          <TabsTrigger
            value="barrier"
            className="px-4 py-2 text-white hover:text-black hover:bg-white focus:outline-none ease-in-out transform hover:scale-105 font-bold border-b-8 border-transparent hover:border-white focus:border-white cursor-pointer transition duration-300"
          >
            Barrier
          </TabsTrigger>
          <TabsTrigger
            value="watertank"
            className="px-4 py-2 text-white hover:text-black hover:bg-white focus:outline-none ease-in-out transform hover:scale-105 font-bold border-b-8 border-transparent hover:border-white focus:border-white cursor-pointer transition duration-300"
          >
            Watertank
          </TabsTrigger>
          <TabsTrigger
            value="fan"
            className="px-4 py-2 text-white hover:text-black hover:bg-white focus:outline-none ease-in-out transform hover:scale-105 font-bold border-b-8 border-transparent hover:border-white focus:border-white cursor-pointer transition duration-300"
          >
            Fan
          </TabsTrigger>
          <TabsTrigger
            value="camera"
            className="px-4 py-2 text-white hover:text-black hover:bg-white focus:outline-none ease-in-out transform hover:scale-105 font-bold border-b-8 border-transparent hover:border-white focus:border-white cursor-pointer transition duration-300"
          >
            Camera
          </TabsTrigger>
        </TabsList>



        {/* Tab Contents */}
        <div className="flex-grow w-full min-h-96 bg-rose-800 rounded-lg">
          <TabsContent value="barrier">
            <BarrierComponent />
          </TabsContent>
          <TabsContent value="watertank">
            <WaterTankComponent />
          </TabsContent>
          <TabsContent value="fan">
            <FanComponent />
          </TabsContent>
          <TabsContent value="camera">
            <CameraComponent />
          </TabsContent>
        </div>
      </Tabs>
    </main>
  );
}
