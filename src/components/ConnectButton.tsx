import { useWeb3Modal } from "@web3modal/wagmi/react";
import { Button } from "./ui/button";
import { useAccount } from "wagmi";

export default function ConnectButton() {
  // 4. Use modal hook
  const { open } = useWeb3Modal();
  const { address } = useAccount();
  return (
    <div className="flex gap-4">
      {!address && <Button onClick={() => open()}>Connect Wallet</Button>}
      {address && (
        <Button
          className="border border-dashed border-white p-2 cursor-pointer rounded fixed top-4 right-3"
          onClick={() => open()}
        >
          {address}
        </Button>
      )}
    </div>
  );
}
