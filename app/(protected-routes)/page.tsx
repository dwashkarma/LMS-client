"use client";
import NavBar from "@/components/navbar";
import { connectDB } from "@/libs/mongodb";
import { useSession, signIn, signOut } from "next-auth/react";
export default function Home() {
  const db = connectDB();
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <div className="flex flex-col">
      {/* <NavBar /> */}
      <h1>Home</h1>
      <b>signIn</b>
      <div>
        <button className="bg-sky-700" onClick={() => signIn("google")}>
          SignIn
        </button>
      </div>
      <div>
        <button className="bg-sky-700" onClick={() => signOut()}>
          Signout
        </button>
      </div>
    </div>
  );
}
