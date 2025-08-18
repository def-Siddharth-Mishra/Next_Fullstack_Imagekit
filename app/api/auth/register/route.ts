import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();
        
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { error: "User has already registered" },
                { status: 400 }
            );
        }

        const userCreated = await User.create({
            email,
            password
        });

        return NextResponse.json(
            {
                message: "User is successfully created",
                user: {
                    email: userCreated.email,
                    _id: userCreated._id
                }
            },
            { status: 201 }
        );
        
    } catch (error) {
        console.error("Registration failed", error);
        return NextResponse.json(
            { error: "Failed to register user" },
            { status: 500 }
        );
    }
}
