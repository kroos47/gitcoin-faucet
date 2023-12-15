import { useAccount } from "wagmi";
import { Badge } from "./ui/badge";

function Account() {
  const { address, isConnecting, isDisconnected } = useAccount();

  if (isConnecting) return <div>Connecting…</div>;
  if(address)
  return (
    <div className="flex gap-4">
 
      <span className="text-grey-400">{address}</span>
    </div>
  );
}

export default Account;
