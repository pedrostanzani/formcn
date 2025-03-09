"use server";
import { signIn as signInWithProvider } from "@/auth";

export async function signIn() {
  await signInWithProvider("github");
}
