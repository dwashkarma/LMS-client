import Image from "next/image";
import React, { useEffect, useState } from "react";
interface NavBarProps {
  session: any;
  signOut: () => void;
}
const NavBar: React.FC<NavBarProps> = ({ signOut, session }) => {
  const [image, setImage] = useState<string>("");
  useEffect(() => {
    setImage(session?.user?.image);
  }, [session]);
  return (
    <div className="flex justify-between p-4 bg-slate-400">
      <div className="flex gap-2 items-center text-sm font-normal">
        {" "}
        <Image
          className="rounded-full"
          src={image}
          alt="ProfileImage"
          height={40}
          width={40}
        />
        <h2>{session?.user?.email}</h2>
      </div>
      <div>
        <button
          className="flex gap-4 hover:bg-green-800 hover:shadow-lg bg-green-700 text-slate-50 p-2 rounded-xl"
          onClick={signOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default NavBar;
