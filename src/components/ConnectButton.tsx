import { useWeb3Modal } from "@web3modal/wagmi/react";
import { Button } from "./ui/button";
import { useAccount } from "wagmi";

export default function ConnectButton() {
  // 4. Use modal hook
  const { open } = useWeb3Modal();
  const { address } = useAccount();
  if (address) return <></>;
  
  return (
    <div className="flex gap-4">
      <Button onClick={() => {
        open()
        }}>Connect Wallet</Button>
    </div>
  );
}
