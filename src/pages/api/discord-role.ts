import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const reqBody = JSON.parse(req.body);
    const { serverId, userId, roleId } = reqBody;
    // const serverId = req.body.serverId;
    // const userId = req.body.userId;
    // const roleId = req.body.roleId;

    console.log("req.body", req.body, serverId);

    const ROLE_DISCORD_URL = `https://discord.com/api/guilds/${serverId}/members/${userId}/roles/${roleId}`;

    console.log("URL", ROLE_DISCORD_URL);

    const response = await fetch(ROLE_DISCORD_URL, {
      method: "PUT",
      headers: {
        Authorization: `Bot ${process.env.NEXT_PUBLIC_BOT_TOKEN}`,
      },
    });

    if (response.ok) {
      return res.status(200).json({ message: "Done" });
    }

    const data = await response.json();
    console.log("Error granting role", data);

    return res.status(401).json({ message: "Error", error: data });
  } catch (e) {
    return res.status(401).json({ message: "Error", error: e });
  }
}
