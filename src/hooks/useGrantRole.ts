import { useAccount, useSignMessage } from "wagmi";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";

export default function useGrantRole(userId: string) {
  const discordServerId = "1095316600716013589";
  const roleId = "1186272423717384232";
  const ROLE_DISCORD_URL = `/api/discord-role`;
  const router = useRouter();

  async function grant(score: number) {
    if (score > 1) {
      try {
        const response = await fetch(ROLE_DISCORD_URL, {
          method: "POST",
          body: JSON.stringify({
            serverId: discordServerId,
            userId,
            roleId,
          }),
          headers: {
            Authorization: `Bot ${process.env.NEXT_PUBLIC_BOT_TOKEN}`,
          },
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
