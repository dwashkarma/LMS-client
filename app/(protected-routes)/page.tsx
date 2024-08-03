"use client";
import CourseCard from "@/components/courseCard";
import NavBar from "@/components/navbar";

import NavBarComponent from "@/components/navbarComponent";
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
      <NavBarComponent session={session} signOut={() => signOut()} />
      <NavBar />
      <CourseCard />
    </div>
  );
}
