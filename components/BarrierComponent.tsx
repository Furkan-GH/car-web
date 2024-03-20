import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function BarrierComponent() {
  return (
    <div className="">
      <div>Barier Control</div>
      <div className="relative">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Slow</SelectItem>
          <SelectItem value="dark">Mid</SelectItem>
          <SelectItem value="system">Fast</SelectItem>
        </SelectContent>
      </Select>
      </div>
      <Button size="sm" className="border mt-4 relative">Open</Button>
    </div>
  );
}
