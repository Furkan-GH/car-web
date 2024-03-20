import BarrierComponent from "@/components/BarrierComponent";
import FanComponent from "@/components/FanComponent";
import WaterTankComponent from "@/components/WaterTankComponent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {

  return (
    <main className="min-h-screen items-center justify-between p-24">

      <Tabs defaultValue="account" className="w-full" >
        <TabsList className="flex rounded-md shadow-md"> {/* Added base styles */}
          <TabsTrigger value="account" className="px-4 py-2 hover:bg-gray-200 focus:outline-none">
            Watertank
          </TabsTrigger>
          <TabsTrigger value="password" className="px-4 py-2 hover:bg-gray-200 focus:outline-none">
            Barrier
          </TabsTrigger>
          <TabsTrigger value="password2" className="px-4 py-2 hover:bg-gray-200 focus:outline-none">
            Fan
          </TabsTrigger>
          <TabsTrigger value="password3" className="px-4 py-2 hover:bg-gray-200 focus:outline-none">
            Camera
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <BarrierComponent />
        </TabsContent>
        <TabsContent value="password">
          <FanComponent />
        </TabsContent>
        <TabsContent value="password2">
          <WaterTankComponent />
        </TabsContent>
        <TabsContent value="password3">
          <FanComponent />
        </TabsContent>
      </Tabs>
    </main>
  );
}
