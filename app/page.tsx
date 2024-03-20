import BarrierComponent from "@/components/BarrierComponent";
import FanComponent from "@/components/FanComponent";
import WaterTankComponent from "@/components/WaterTankComponent";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Anasayfa</div>
      <BarrierComponent />
      <WaterTankComponent />
      <FanComponent />
    </main>
  );
}
