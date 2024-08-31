"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function IndexPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/games");
    } else {
      router.push("/auth/sign-in");
    }
  }, [session, router]);

  return <></>;
}
