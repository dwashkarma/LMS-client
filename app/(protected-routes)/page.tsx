"use client";
import CourseCard from "@/components/courseCard";
import Navbar from "@/components/navbar";
// import Celete from "@/components/delete";
// import NavBar from "@/components/navbar";

import { useSession, signOut } from "next-auth/react";
export default function Home() {
  const { data: session } = useSession();

  return (
    <div>
      {/* //   <Image
    //     src={image}
    //     alt="profileImage"
    //     height={80}
    //     width={80}
    //     className="rounded-full"
    //   />
    //   <p>hello {session.user?.name}</p>

    //   <button className="bg-sky-700" onClick={() => signOut()}>
    //     Signout
    //   </button>
    */}

  
          {/* <Celete session={session} signOut={() => signOut()} /> */}
      <Navbar session={session} signOut={() => signOut()}/>
      <CourseCard />
    </div>
  );
}
