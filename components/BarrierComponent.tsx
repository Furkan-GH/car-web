"use client"

import { Car, Construction } from "lucide-react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useEffect, useState } from "react";
import { Radio } from "react-loader-spinner";
import { motion } from "framer-motion";
import { useCurrentTab } from "@/hooks/use-current-tab";
import useBarrierDataStore from "@/hooks/use-get-data";
import { UpdateBarrierAction } from "@/actions/barrier-action";
import { CarStatus, OperationStatus } from "@prisma/client";
import useCurrentCarData from "@/hooks/use-current-car-data";
import axios from "axios";

export default function BarrierComponent() {
  const [data, setData] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHiddenRadio, setIsHiddenRadio] = useState(true);
  const [isHiddenCar, setIsHiddenCar] = useState(true);
  const tabManager = useCurrentTab();
  const carIsBarrier = useBarrierDataStore((state) => state.carIsBarrier);
  const [selectedValue, setSelectedValue] = useState<OperationStatus>(OperationStatus.NONE);
  const { carId, carStatus} = useCurrentCarData();
  const { setCarId,setCarStatus } = useCurrentCarData();
  enum CarStatus2 {
    NONE = "NONE",
    BARRIER = "BARRIER",
    // Diğer durumlar buraya eklenebilir
  }
  const handleSelectChange = (newValue: OperationStatus) => {
    setSelectedValue(newValue);
  };

  const handleRadioClick = () => {
    setData(true);
    setIsAnimating(true);
  };

  const handleBarrierClick = async (id: string|null, selectedValue: OperationStatus) => {
    if (selectedValue) {
      try {
        console.log("OPERATION STATUS IS ====" + selectedValue)
        const updatedCar = await UpdateBarrierAction(id, selectedValue);
        console.log("Barrier status updated:", updatedCar);
      } catch (error) {
        console.error("Error updating barrier status:", error);
      }
    } else {
      console.error("Please select a value.");
    }
  };

  const handleCarClick = (id: string|null) => {
    if (selectedValue !== OperationStatus.NONE) {
      setData(false);
      setIsAnimating(true);
      handleBarrierClick(id, selectedValue);
    } else {
      console.error("Please select a value.");
    }
  };

  useEffect(() => {
    // (TODO) setCarStatus is not working !!!!!
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/sensor/barrier");
        console.log("API response:", response.data);
        if (response.data && response.data.entity) {
          const barrierStatus = response.data.entity.status;
          setCarStatus(barrierStatus);
          console.log("STATUSSSS =========>>>>"+carStatus);
        } else {
          console.error("Invalid API response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    const interval = setInterval(fetchData, 1000); 
  
    return () => clearInterval(interval); 
  }, []); 
  
  

  useEffect(() => {
    if (carIsBarrier) {
      setData(false);
      setIsAnimating(true);
    }
  }, [carIsBarrier]);

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
    <div className="grid grid-rows-2 grid-flow-col gap-4 min-h-[600px] relative">
      {data ? (
        <motion.div className="grid row-span-2 text-center m-auto"
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
          className="grid row-span-2 text-center m-auto"
          initial={{ x: -320 }}
          animate={{ x: 10 }}
          transition={{ duration: 0.5 }}
        >
          <Car
            height="200"
            width="200" />
        </motion.div>
      </>
      )}
      <div className="flex justify-items-center flex-col m-auto mb-4">
        <div className="font-extrabold text-white text-3xl">Barrier Control</div>
        <div className="m-auto "><Construction color="#ffffff" size={50} /></div></div>
      <div className="flex m-auto mt-4">
        {carStatus != CarStatus2.NONE &&(
        <Select
          value={selectedValue}
          onValueChange={handleSelectChange}
        >
          <SelectTrigger className="w-[180px] bg-white ">
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
        )}
        <Button size="sm" className="border ms-4 bg-white text-black" onClick={() => handleCarClick(carId)}>Open</Button>
        <Button size="sm" className="border ms-2 bg-white text-black" onClick={handleRadioClick}>Close</Button>
      </div>
    </div>
  );
}
