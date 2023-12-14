import { useAccount } from "wagmi";
import { Badge } from "./ui/badge";
import { useSession } from "next-auth/react";

function DiscodAcc() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { data: session } = useSession();
  if (isConnecting) return <div>Connecting…</div>;
  if (isDisconnected) return <div>Disconnected</div>;
  return (
    <div className="flex gap-4">
      <span>
        <Badge>Connected</Badge>
      </span>
      <span className="text-grey-400">{session?.discordUserId}</span>
    </div>
  );
}

export default DiscodAcc;
