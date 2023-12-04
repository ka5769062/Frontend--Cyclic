import Image from "next/image";
import Link from "next/link";
import React from "react";

const Erorr = () => {
  return (
    <div>
      <div className="flex justify-center ">
        <div className="flex-col ">
          <Image
            className="flex flex-col"
            src="/404.svg"
            width={500}
            height={550}
            alt="Picture of the author"
          />
        </div>
      </div>
          <h1 className="flex justify-center font-bold m-6 text-2xl">PAGE NOT FOUND </h1>
          <Link className="flex justify-center font-semibold m-6 text-2xl" href="/">Back To Home</Link>
    </div>
  );
};

export default Erorr;
