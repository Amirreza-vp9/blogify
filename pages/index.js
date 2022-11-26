import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Blog-tor</title>
      </Head>
      <video
        className="h-[100vh] w-[100vw] object-cover"
        playsInline
        autoPlay
        muted
        loop
        preload="auto"
      >
        <source src="../videos/library.mp4" type="video/mp4"></source>
      </video>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font text-[4em] text-center font-bold text-white">
        <div>WELCOME</div>
        <div>TO</div>
        <div>BLOGTOR</div>
      </div>
    </>
  );
}
