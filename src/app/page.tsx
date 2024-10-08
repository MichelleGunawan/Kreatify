"use client";
import { useGlobalContext } from "@/context";
import { useSession } from "@/hooks/useSession";
import { redirect } from "next/navigation";
export default function Home({}) {
  const { sessionLoading } = useSession({});
  const { userId } = useGlobalContext();

  if (userId) {
    redirect("/home");
  }
  redirect("/login");
}
