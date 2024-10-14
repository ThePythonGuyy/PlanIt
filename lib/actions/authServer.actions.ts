"use server"

import { auth } from "@clerk/nextjs/server";

interface userIdType{
    userId: string
  }

export const fetchUserId = async() => {
  try {
    const { sessionClaims } = auth();
    const userId: userIdType = sessionClaims?.userId as userIdType;

    return userId.userId as string
  } catch (error){
    console.error(error);
  }
}