import Image from "next/image";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-dark ">
      <Image
        src="/icons/loadingballs.svg"
        alt="Loading..."
        width={96}
        height={96}
        className="animate-spin"
      />{" "}
    </div>
  );
};

export default Loading;
