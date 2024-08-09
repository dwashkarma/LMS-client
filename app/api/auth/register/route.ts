import { connectDB } from "@/libs/mongodb";
import User from "@/modals/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

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
    if (error instanceof mongoose.Error.ValidationError) {
      // This block catches Mongoose validation errors
      const errorMessages = Object.values(error.errors).map((e) => e.message);
      return NextResponse.json(
        { message: errorMessages.join(", "), status: "error" },
        { status: 400 }
      );
    } else if (error.code === 11000) {
      // This block catches duplicate key errors (e.g., email already exists)
      return NextResponse.json(
        { message: "Email already exists", status: "error" },
        { status: 400 }
      );
    } else {
      // This block catches all other errors
      return NextResponse.json(
        { message: "An unexpected error occurred", status: "error" },
        { status: 500 }
      );
    }
  }
}
