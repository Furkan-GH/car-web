import React, { useState } from 'react';
import Image from 'next/image';
import Araba from "@/components/images/araba.jpg";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import axios from 'axios';
import useCurrentCarData from "@/hooks/use-current-car-data";
const {carId} = useCurrentCarData();
interface CameraComponentProps {}

const CameraComponent: React.FC<CameraComponentProps> = () => {
  const [recipientEmail, setRecipientEmail] = useState("");

  const popUp = async () => {
    try {
      const response = await axios.post("/api/send", { recipientEmail });
      const response2 = await axios.post("/api/sensor/camera",{carId});
      if (response.status === 200 && response2.status === 200) {
        console.log("Email başariyla gönderildi!");
      } else {
        console.error("E-posta gönderirken hata oluştu:", response.data);
      }
    } catch (error) {
      console.error("E-posta gönderirken hata oluştu:", error);
    }
  };
 
  return (
    <>
    <div className='justify-items-center'>
      <div>
        <Image className='rounded-full m-auto' src={Araba} alt="Araba" width={500} height={500} />
      </div>
      <div className='justify-items-center items-center'>
      <AlertDialog>
        <div className='text-center'>
        <AlertDialogTrigger className='mx-auto text-8xl font-extrabold'>SEND</AlertDialogTrigger>
        </div>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-white'>Are you absolutely sure?</AlertDialogTitle>
            <Textarea
              placeholder="E-posta adresini girin"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
            />
            <AlertDialogDescription className='text-white'>
            The photo of your car will be sent to your desired location.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className='text-white'>Cancel</AlertDialogCancel>
            <AlertDialogAction className='text-white' onClick={popUp}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </div>
      </div>
    </>
  );
}

export default CameraComponent;
