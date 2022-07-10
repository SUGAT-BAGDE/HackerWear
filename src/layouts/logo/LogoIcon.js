import React from "react";
import Link from "next/link";
import Image from "next/image";
import LogoDark from "../../../public/favicon.ico";
// import LogoDark from "../../../assets/images/logos/hackerwear-black.png";

const LogoIcon = () => {
  return (
    <Link href="/">
        <a>
        <div className='space-x-2 py-2 px-2 flex justify-center flex-col items-center rounded-xl bg-black'>

          <Image src={LogoDark} alt={LogoDark} width={90} height={90} className="inline" />
          <div className="font-bold text-[#0f0]">Hacker Wear</div>

        </div>
      </a>
    </Link>
  );
};

export default LogoIcon;
