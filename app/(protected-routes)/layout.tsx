"use client";
import { signIn, useSession } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { status } = useSession();
  if (status === "authenticated") {
    return <div>{children}</div>;
  } else if (status === "loading") {
    return <div>Loading.......</div>;
  } else {
    return (
      <div className="grid place-content-center place-items-center h-screen">
        {" "}
        <button
          className="text-slate-50 bg-cyan-600 p-2 rounded-md hover:bg-cyan-800 hover:shadow"
          onClick={() => signIn("google")}
        >
          Sign In
        </button>
      </div>
    );
  }
}
