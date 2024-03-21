"use client"
import { Car, Construction } from "lucide-react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useEffect, useState } from "react";
import { Radio } from "react-loader-spinner";
import { motion } from "framer-motion";


export default function BarrierComponent() {
  const [data, setData] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHiddenRadio, setIsHiddenRadio] = useState(true);
  const [isHiddenCar, setIsHiddenCar] = useState(true);

  const handleRadioClick = () => {
    setData(true);
    setIsAnimating(true);
  };

  const handleCarClick = () => {
    setData(false);
    setIsAnimating(true)
  };

  useEffect(() => {
    if (isAnimating) {
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    }
  }, [isAnimating]);

  const radioVariant = {
    hidden: { x: -300 },
    visible: { x: 10 },
  };

  return (
    <div className="grid grid-rows-2 grid-flow-col gap-4 min-h-96 relative">
      {data ? (
        <motion.div className="grid row-span-2 text-center m-auto transform-rota"
          initial={{ x: -300 }}
          animate={{ x: 10 }}
          transition={{ duration: 0.5 }}
        >
          <Radio
            visible={true}
            height="200"
            width="200"
            colors={["#ffffff", "#ffffff", "#ffffff"]}
            ariaLabel="radio-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </motion.div>
      ) : (<>
        <motion.div
          className={`grid row-span-2 text-center m-auto transform-rota ${isHiddenRadio && "hidden"}`}
          initial="visible"
          animate="hidden"
          variants={radioVariant}
          transition={{ duration: 1 }}
        >
          <Radio
            visible={true}
            height="200"
            width="200"
            colors={["#ffffff", "#ffffff", "#ffffff"]}
            ariaLabel="radio-loading"
            wrapperStyle={{}}
            wrapperClass="" />
        </motion.div>
        <motion.div
          className="grid row-span-2 text-center m-auto transform-rota"
          initial={{ x: -320 }}
          animate={{ x: 10 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Car
            height="200"
            width="200" />
        </motion.div>
      </>
      )}
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
        <Button size="sm" className="border ms-4" onClick={handleCarClick}>Open</Button>
        <Button size="sm" className="border ms-2" onClick={handleRadioClick}>Close</Button>
      </div>
    </div>
  );
}
