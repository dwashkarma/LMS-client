import RegisterComponent from "@/components/register";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

async function Register() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="place-items-center h-screen grid">
      <RegisterComponent />
    </div>
  );
}

export default Register;
