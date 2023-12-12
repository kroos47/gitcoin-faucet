import { useAccount } from "wagmi";
import { Badge } from "./ui/badge";

function Account() {
  const { address, isConnecting, isDisconnected } = useAccount();

  if (isConnecting) return <div>Connecting…</div>;
  if (isDisconnected) return <div>Disconnected</div>;
  return (
    <div className="flex gap-4">
      <span>
        <Badge>Connected</Badge>
      </span>
      <span className="text-grey-400">{address}</span>
    </div>
  );
}

export default Account;
