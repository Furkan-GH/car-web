import React from "react";
import fireGif from "@/components/images/fire.gif";
import { PiFanFill } from "react-icons/pi";
import { PiFanLight } from "react-icons/pi";
import { PiFan } from "react-icons/pi";
import { Switch } from "./ui/switch";






export default function FanComponent() {

    return (
     <>
     <div className="grid grid-rows-2 grid-flow-col gap-4 min-h-96">
  <div className="m-auto">
    1.
  </div>
  <div className="m-auto">
    2.
  </div>
  <div className="m-auto">
    3.
  </div>
  <div className="m-auto">
    <div className="flex"><div className="border p-2 m-4 rounded-md"><h3>Tempeture:</h3></div><div className="border p-2 m-4 rounded-md left-0"><h1>30°C</h1></div></div>
    <div className="m-auto"><Switch /></div>
  </div>
</div>
     </> 
    );
  }
  