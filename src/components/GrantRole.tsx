import { useAccount, useSignMessage } from "wagmi";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GrantRole(userId: string) {
  const score = 1.2;
  const discordServerId = "1095316600716013589";
  const roleId = "1185158924295491657";
  const ROLE_DISCORD_URL = `/api/discord/${discordServerId}/members/${userId}/roles/${roleId}`;
  if (score > 1) {
    // const userId = session?.discordUserId;
    console.log(
      `https://discordapp.com/api/guilds/${discordServerId}/members/${userId}/roles/${roleId}`
    );
    console.log(userId);
    const response = await fetch(ROLE_DISCORD_URL, {
      headers: {
        // Use the bot token to grant the role
        Authorization: `Bot ${process.env.BOT_TOKEN}`,
      },
      method: "PUT",
    });
    console.log(response);

    if (response.ok) {
      console.log("failed");
    }
    if (!response.ok) {
      console.error("Error:", response.status, response.statusText);
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
