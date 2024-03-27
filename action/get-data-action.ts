"use server"

import { db } from "@/lib/db";


export const GetSensorData = async ()=>{
    const data = db.data.findMany({})

    return data
}