"use client"
import { Construction } from "lucide-react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState } from "react";
import { Radio } from "react-loader-spinner";


export default function BarrierComponent() {
  return (
    <div className="grid grid-rows-2 grid-flow-col gap-4 min-h-96">
      <div className="grid row-span-2 text-center m-auto transform-rota">
        <Radio
          visible={true}
          height="200"
          width="200"
          colors={["#ffffff", "#ffffff", "#ffffff"]}
          ariaLabel="radio-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
      <div className="flex justify-items-center flex-col m-auto mb-4">
        <div className="flex">Barrier Control</div>
        <div className="m-auto"><Construction /></div></div>
      <div className="flex m-auto mt-4">
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
