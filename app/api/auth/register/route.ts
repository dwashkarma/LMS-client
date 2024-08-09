import { connectDB } from "@/libs/mongodb";
import User from "@/modals/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, name, password } = await request.json();
    await connectDB();
    const userExists = await User.findOne({ email });
    if (userExists) {
      return new Response("User already exists", { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    const saveUser = await user.save();
    return NextResponse.json(
      {
        message: "User created successfully",
        name: saveUser.name,
        email: saveUser.email,
        password: saveUser.password,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error.message);
  }
}
