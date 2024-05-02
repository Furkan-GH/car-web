"use client"
import React, { useEffect, useState } from "react";
import fireGif from "@/components/images/fire.gif";
import Image from 'next/image';
import { PiFanLight } from "react-icons/pi";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Car, Pi } from "lucide-react";
import { UpdateFannAction } from "@/actions/fan-action";
import { OperationStatus } from "@prisma/client";


export default function FanComponent() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHiddenFire, setIsHiddenFire] = useState(true);
  const [checkState, setCheckState] = useState(false);
  const [isRotating, setRotatingState] = useState(false);
  const [selectedValue, setSelectedValue] = useState<OperationStatus>(OperationStatus.NONE);

  const handleSelectChange = (newValue: OperationStatus) => {
    setSelectedValue(newValue);
  };

  const handleFanClick = async (id: string, selectedValue: OperationStatus) => {
    if(selectedValue){
      try{
        console.log("OPEATİON STATUS IS ===" + selectedValue);
        const updatedCar = await UpdateFannAction(id, selectedValue);
        console.log("Fan status updated:",updatedCar)
      }catch (error){
        console.error("Error updating fan status:",error)
      }
    }else {
      console.error("Please select a value.");
    }
  }

  const handleCarClick = (id:string) => {  
    if(selectedValue !== OperationStatus.NONE){
      setRotatingState(true);
      handleFanClick(id,selectedValue);
    }else{
      console.error("Please select a value.");
    }
  };

  const clickEndFan = () => {
    setRotatingState(false);
  };

  const handleChange = () => {
    setCheckState((prevState) => !prevState);
    setIsHiddenFire((prevState) => !prevState);
  };

  useEffect(() => {
    if (isAnimating) {
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    }
  }, [isAnimating]);


  return (
    <div className="min-h-[600px]">
      <div className={`z-50 fixed w-32 mt-44 ml-80 ${isHiddenFire && "hidden"}`} >
        <Image className="rounded-full " src={fireGif} alt="fireGif" />
      </div>
      <div className="grid grid-rows-2 grid-flow-col gap-4 min-h-96">
        <div className="m-auto">
          <motion.div
            className=""
            initial={{rotate: 0}}
            animate={{
              rotate: isRotating ? 360 : 0.0,
            }}
            exit={{rotate: 0}}
            transition={{
              duration: 1,
              repeat: isRotating ? Infinity : 0.0,
              ease: "linear",
            }}
          >
          <PiFanLight size={150} />
          </motion.div>
        </div>
        <div className="m-auto">
          <motion.div
            className="grid row-span-2 text-center m-auto"
            initial={{ x: -320 }}
            animate={{ x: 10 }}
            transition={{ duration: 0.5 }}
          >
            <Car
              height="200"
              width="200" />
          </motion.div>
        </div>
        <div className="m-auto">

          <div className="text-white text-3xl font-extrabold m-auto p-12">Drying Controller</div>

          <div className="flex m-auto -mb-8">
            <Select
              value={selectedValue}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Choose..." />
              </SelectTrigger>
              <SelectContent className="bg-white cursor-pointer">
                {Object.values(OperationStatus).map((status) => (
                  <SelectItem
                    key={status}
                    className="cursor-pointer"
                    value={status}
                  >
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button size="sm" className="border ms-4 bg-white text-black" onClick={() => handleCarClick("clvo5vlkp00031dkwiwwkyv2v")}>Start</Button>
            <Button size="sm" className="border ms-2 bg-white text-black" onClick={clickEndFan}>Finish</Button>
          </div>
        </div>
        <div className="m-auto">
          <div className="flex justify-items-center">
            <div className="border p-2 m-4 rounded-md mr-0"><h3 className="text-white">Tempeture:</h3>
            </div>
            <div className="border p-2 m-4 rounded-md ml-0"><h1 className="text-white font-bold">30°C</h1>
            </div>
          </div>
          <div className="flex m-auto ">
            <h3 className="font-semibold text-white">Heating system</h3>
            <Switch className="ml-2" checked={checkState} onCheckedChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
}
function UpdateFanAction(id: string, selectedValue: string) {
  throw new Error("Function not implemented.");
}

