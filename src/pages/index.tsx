import ConnectButton from "@/components/ConnectButton";
import Sign from "@/components/Sign";
import Account from "@/components/Account";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Gitpass from "@/components/Gitpass";

export default function Home() {
  const [isNetworkSwitchHighlighted, setIsNetworkSwitchHighlighted] =
    useState(false);
  const [isConnectHighlighted, setIsConnectHighlighted] = useState(false);

  const closeAll = () => {
    setIsNetworkSwitchHighlighted(false);
    setIsConnectHighlighted(false);
  };
  return (
    <>
      <Head>
        <title>WalletConnect | Next Starter Template</title>
        <meta name="description" content="Generated by create-wc-dapp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid min-h-screen items-center">
        <div className="flex items-center flex-col gap-12">
          <h1 className="text-3xl font-bold">Avail</h1>

          <ConnectButton />
          <Account></Account>
          <Gitpass></Gitpass>
        </div>
      </main>
    </>
  );
}