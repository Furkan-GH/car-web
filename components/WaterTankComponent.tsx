"use client"
import { Car } from "lucide-react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { MdOutlineLocalCarWash } from "react-icons/md";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GiWateringCan } from "react-icons/gi";
import Image from 'next/image';
import rainGif from "@/components/images/rain.gif";
import { OperationStatus } from "@prisma/client";
import { UpdateWaterTankAction } from "@/actions/watertank-action";

export default function WaterTankComponent() {
  const [isHiddenRain, setIsHiddenRain] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedValue, setSelectedValue] = useState<OperationStatus>(OperationStatus.NONE);
  const handleSelectChange = (newValue: OperationStatus) => {
    setSelectedValue(newValue);
  };
  const rotateVariants = {
    start: { rotate: 0 },
    end: { rotate: 30 },
  };
  const handleWaterTankClick = async (id:string,selectedValue: OperationStatus) => {
    if(selectedValue){
      try{
        console.log("OPEATİON STATUS IS ===" + selectedValue);
        const updatedCar = await UpdateWaterTankAction(id,selectedValue);
        console.log("Barrier status updated:", updatedCar);
      }catch(error){
        console.error("Error updating barrier status:",error);
      }
    }else{
        console.error("Please select a value.");
      }
    }
  
  const handleClick = (id:string) => {
    if(selectedValue !== OperationStatus.NONE){
      handleWaterTankClick(id, selectedValue);
      setIsHiddenRain(false);
    }else{
      console.error("Please select a value.");
    }
  };
  const clickNonGif = () => {
    setIsHiddenRain(true);
  };


  useEffect(() => {
    if (isAnimating) {
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    }
  }, [isAnimating]);

  return (
    <>
    <div className="min-h-[600px]">
      <div className={`z-50 fixed w-32 mt-28 ml-96 ${isHiddenRain && "hidden"}`} >
        <Image className="rounded-full " src={rainGif} alt="yagmurGif" width={500} height={500} />
      </div>
      <div className="grid grid-rows-2 grid-flow-col gap-4 min-h-96 relative">
        <div className="grid m-auto">
          <motion.div
            initial={{}}
            animate={{ rotate: 30, }}
            transition={{ duration: 0.5 }}
          >
            <GiWateringCan size={120} color="#ffffff" />
          </motion.div>
        </div>
        <div className="grid m-auto">
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
        <div className="grid m-auto mb-4">
          <div className="text-white text-3xl font-extrabold">Water Tank Controller</div>
          <div className="m-auto"><MdOutlineLocalCarWash color="#ffffff" size={50} /></div>
        </div>
        <div className="flex m-auto mt-4">
          <Select
            value = {selectedValue}
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
          <Button size="sm" onClick={() => handleClick("clvo5vlkp00031dkwiwwkyv2v")} className="border ms-4 bg-white text-black">Start</Button>
          <Button size="sm" onClick={clickNonGif} className="border ms-2 bg-white text-black">Finish</Button>
        </div>
      </div>
    </div>
    </>
  );
}
