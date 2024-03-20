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
        <TabsList className="flex justify-evenly bg-cyan-400">
          <TabsTrigger
            value="barrier"
            className="px-4 py-2 hover:bg-gray-200 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105" 
          >
            Barrier
          </TabsTrigger>
          <TabsTrigger
            value="watertank"
            className="px-4 py-2 hover:bg-gray-200 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105" 
          >
            Watertank
          </TabsTrigger>
          <TabsTrigger
            value="fan"
            className="px-4 py-2 hover:bg-gray-200 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105" 
          >
            Fan
          </TabsTrigger>
          <TabsTrigger
            value="camera"
            className="px-4 py-2 hover:bg-gray-200 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105" 
          >
            Camera
          </TabsTrigger>
        </TabsList>

      {/* Tab Contents */}
      <div className="flex-grow w-full min-h-96 bg-cyan-100"> 
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
