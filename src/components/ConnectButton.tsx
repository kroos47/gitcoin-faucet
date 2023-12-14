import { useWeb3Modal } from "@web3modal/wagmi/react";
import { Button } from "./ui/button";

export default function ConnectButton() {
  // 4. Use modal hook
  const { open } = useWeb3Modal();

  return (
    <div className="flex gap-4">
      <Button onClick={() => open()}>Connect Wallet</Button>
      <Button variant="outline" onClick={() => open({ view: "Networks" })}>
        Select Network
      </Button>
    </div>
  );
}
