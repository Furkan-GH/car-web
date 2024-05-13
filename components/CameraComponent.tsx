import Video from 'next-video';
const awesomeVideo = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export default function CameraComponent() {
  return (
    <>
      {/* <div className='flex justify-center min-h-[600px]'>
        <Video className='max-w-screen-lg justify-center' src={awesomeVideo} placeholder="blur" />
      </div> */}
      <iframe src="https://carweb31.vercel.app/" width="100%" height="300">
      </iframe>

    </>
  );
}


// https://www.npmjs.com/package/next-video