import { useAccount, useSignMessage } from "wagmi";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GrantRole(userId: string) {
  const score = 1.2;
  const discordServerId = "1095316600716013589";
  const roleId = "1184939254925758555";
  if (score > 1) {
    const { data: session } = useSession();
    // const userId = session?.discordUserId;
    console.log(
      `https://discordapp.com/api/guilds/${discordServerId}/members/${userId}/roles/${roleId}`
    );
    console.log(userId);
    const response = await fetch(
      // Discord Developer Docs for this API Request: https://discord.com/developers/docs/resources/guild#add-guild-member-role
      `https://discordapp.com/api/guilds/${discordServerId}/members/${userId}/roles/${roleId}`,
      {
        headers: {
          // Use the bot token to grant the role
          Authorization: `Bot ${process.env.BOT_TOKEN}`,
        },
        method: "PUT",
      }
    );
    if (response.ok) {
      console.log("failed");
    }

    // Something went wrong granting the role, but they do have an NFT
    else {
      const resp = await response.json();
      console.error(resp);
      console.log("failed");
    }
  } else {
    console.log("failed");
  }
}
