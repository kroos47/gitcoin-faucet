import type { SIWESession } from "@web3modal/core";
import type { NextApiRequest, NextApiResponse } from "next";
import credentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";
import { ethers } from "ethers";
import nextAuth, { User } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session extends SIWESession {
    ethereumAuthenticated?: boolean;
    discordUserId?: string;
    address: string;
    chainId: number;
  }
  interface User {
    ethereumAuthenticated?: boolean;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    ethereumAuthenticated?: boolean;
    discordUserId?: string;
    address?: string;
    chainId?: number;
  }
}

/*
 * For more information on each option (and a full list of options) go to
 * https://next-auth.js.org/configuration/options
 */
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const nextAuthSecret = process.env["NEXTAUTH_SECRET"];
  if (!nextAuthSecret) {
    throw new Error("NEXTAUTH_SECRET is not set");
  }
  // Get your projectId on https://cloud.walletconnect.com
  const projectId = process.env["NEXT_PUBLIC_PROJECT_ID"];
  if (!projectId) {
    throw new Error("NEXT_PUBLIC_PROJECT_ID is not set");
  }

  const providers = [
    credentialsProvider({
      name: "Ethereum",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.message) {
            throw new Error("SiweMessage is undefined");
          }
          const siwe = new SiweMessage(credentials.message);
          const provider = new ethers.JsonRpcProvider(
            `https://rpc.walletconnect.com/v1?chainId=eip155:${siwe.chainId}&projectId=${projectId}`
          );
          console.log(provider);
          const nonce = await getCsrfToken({ req: { headers: req.headers } });
          const result = await siwe.verify(
            {
              signature: credentials?.signature || "",
              nonce,
            },
            { provider }
          );

          if (result.success) {
            return {
              id: `eip155:${siwe.chainId}:${siwe.address}`,
              ethereumAuthenticated: true,
            };
          }

          return null;
        } catch (e) {
          return null;
        }
      },
    }),
    DiscordProvider({
      clientId: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
    }),
  ];

  const isDefaultSigninPage =
    req.method === "GET" && req.query?.["nextauth"]?.includes("signin");

  // Hide Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    providers.pop();
  }

  return await nextAuth(req, res, {
    // https://next-auth.js.org/configuration/providers/oauth
    secret: nextAuthSecret,
    providers,
    session: {
      strategy: "jwt",
    },
    callbacks: {
      async jwt({ token, user, account }) {
        // Set Ethereum authentication flag in JWT
        if (user?.ethereumAuthenticated) {
          token.ethereumAuthenticated = true;
        }

        // Set Discord user ID in JWT
        if (account && account.provider === "discord") {
          token.discordUserId = account.providerAccountId;
        }

        return token;
      },

      async session({ session, token }) {
        // Add Ethereum and Discord details to session
        session.ethereumAuthenticated = token.ethereumAuthenticated || false;
        if (token.discordUserId) {
          session.discordUserId = token.discordUserId;
        }
        if (token.address && token.chainId) {
          session.address = token.address;
          session.chainId = token.chainId;
        }

        return session;
      },
    },
  });
}
