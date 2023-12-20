import { useWeb3Modal } from "@web3modal/wagmi/react";
import { Button } from "./ui/button";
import { useAccount, useConnect, useNetwork, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { InjectedConnector } from "wagmi/connectors/injected";

import { useEffect } from "react";

export default function ConnectButton() {
  const { signMessageAsync } = useSignMessage();
  const { open } = useWeb3Modal();
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { data: session } = useSession();

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const handleLogin = async () => {
    try {
      const callbackUrl = "/protected";
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId: chain?.id,
        nonce: await getCsrfToken(),
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });
      signIn("credentials", {
        message: JSON.stringify(message),
        redirect: false,
        signature,
        callbackUrl,
      });
    } catch (error) {
      window.alert(error);
    }
  };
  // useEffect(() => {
  //   console.log(isConnected);
  //   if (isConnected && !session) {
  //     handleLogin();
  //   }
  // }, [isConnected]);
  if (address) return <></>;

  return (
    <div className="flex gap-4">
      <Button
        onClick={() => {
          open();
        }}
      >
        Connect Wallet
      </Button>
    </div>
  );
}
