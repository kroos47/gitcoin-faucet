import { useAccount, useSignMessage } from "wagmi";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";

export default function useGrantRole(userId: string) {
  const DISCORD_SERVER_ID = process.env.NEXT_PUBLIC_DISCORD_SERVER_ID;
  const ROLE_ID = process.env.NEXT_PUBLIC_ROLE_ID;
  const ROLE_DISCORD_URL = `/api/discord-role`;
  const router = useRouter();
  async function grant(score: number) {
    if (score > 20) {
      try {
        const response = await fetch(ROLE_DISCORD_URL, {
          method: "POST",
          body: JSON.stringify({
            serverId: DISCORD_SERVER_ID,
            userId,
            roleId: ROLE_ID,
          }),
        });

        if (response.ok) {
          console.log("Role granted successfully.");
          router.push("success");
        } else {
          const resp = await response.json();
          console.error("Error in granting role:", resp);
        }
      } catch (error) {
        console.error("Request failed:", error);
      }
    } else {
      console.log("Score requirement not met, role not granted.");
    }
  }

  return { grant };
}
