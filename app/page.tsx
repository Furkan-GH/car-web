"use client"
import MainComponent from "@/components/main/MainComponent";
import useCurrentCarData from "@/hooks/use-current-car-data";
import { CarStatus } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import useTemperature from "@/hooks/use-current-temp";


export default function Home() {
  const { setCarId,setCarBarierStatus,setCarWaterTankStatus, setCarCameraStatus,carId,setIsOver,setCarFanStatus,setError,error } = useCurrentCarData();
  const [state,setState] = useState("barrier");
  const {setTemp} = useTemperature();


  useEffect(() => {
    const fetchDataTemp = async () => {
      try {
        const response = await axios.get('/api/temperature');
        console.log(response.data.entity);
        setTemp(response.data.entity);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const intervalId = setInterval(fetchDataTemp, 1000); 
    return () => clearInterval(intervalId); 
  }, []);



  const fetchData = async () => {
    try {
      const response = await axios.get(`https://carweb31.vercel.app/api/sensor/${state}`); 
      console.log("API response:", response.data);
      if (response.data && response.data.entity) {
        const status = response.data.entity.status; 

        switch (status) {
          case CarStatus.BARRIER:
            setCarId(response.data.entity.id)
            console.log("ZUSTAND BARRIER ATAMASI OLDU")
            setCarBarierStatus();
            setState("watertank");
            break;
          case CarStatus.WATERTANK:
            console.log("ZUSTAND WATERTANK ATAMASI OLDU")
            setCarWaterTankStatus();
            setState("fan");
            break;
          case CarStatus.FAN:
            console.log("ZUSTAND FAN ATAMASI OLDU")
            setCarFanStatus();
            setState("camera");
            break;
          case CarStatus.CAMERA:
            console.log("ZUSTAND CAMERA ATAMASI OLDU")
            setCarCameraStatus();
            setState("isover");
            break;  
          case CarStatus.FINISH:
            console.log("ZUSTAND SIFIRLANDI.")
            setIsOver();
            break;    
          default:
            break;
        }
        }
        else {
          setError("Invalid API response data"); 
        }
      }
     catch (error:any) {
      console.error("Error fetching data:", error);
      setError(error.message || "Unknown error fetching data");
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);


  return (
    <main className="min-h-screen flex flex-col items-center justify-between px-24 py-10 gap-4">
      <MainComponent />
    </main>
  );
}
