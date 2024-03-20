import { Construction } from "lucide-react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function BarrierComponent() {
  return (
    <div className="grid justify-items-center m-12 p-14">
      <div>Barier Control</div>
      <div><Construction /></div>
      <div className="flex m-12">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Choose..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Slow">Slow</SelectItem>
          <SelectItem value="Mid">Mid</SelectItem>
          <SelectItem value="Fast">Fast</SelectItem>
        </SelectContent>
      </Select>
      <Button size="sm" className="border ms-4">Open</Button>
      </div>
    </div>
  );
}
