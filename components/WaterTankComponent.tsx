"use client"
import { Car } from "lucide-react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { MdOutlineLocalCarWash } from "react-icons/md";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GiWateringCan } from "react-icons/gi";

export default function WaterTankComponent() {
  const [isAnimating, setIsAnimating] = useState(false);
  const rotateVariants = {
    start: { rotate: 0 },
    end: { rotate: 30 },
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
      <div className="grid grid-rows-2 grid-flow-col gap-4 min-h-96 relative">
        <div className="grid m-auto">
          <motion.div
          initial={{  }}
          animate={{ rotate: 30, }}
          transition={{ duration: 0.5 }}
          >
            <GiWateringCan size={120} color="#ffffff"/>
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
          <Select>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Choose..." />
            </SelectTrigger>
            <SelectContent className="bg-white cursor-pointer">
              <SelectItem className="cursor-pointer" value="30">%30</SelectItem>
              <SelectItem className="cursor-pointer" value="75">%75</SelectItem>
              <SelectItem className="cursor-pointer" value="100">%100</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" className="border ms-4 bg-white text-black">Start</Button>
          <Button size="sm" className="border ms-2 bg-white text-black">Finish</Button>
        </div>
      </div>
    </>
  );
}
