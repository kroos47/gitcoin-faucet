import { useSession, signIn, signOut } from "next-auth/react";
import { useAccount } from "wagmi";
import { Button } from "./ui/button";
import GrantRole from "./GrantRole";
export default function Grant() {
  const { address, isConnected } = useAccount();
  const { data: session } = useSession();
  const handleGrantClick = async () => {
    if (session?.discordUserId) {
      await GrantRole(session.discordUserId);
    }
  };
  if (session) {
    return (
      <div className="flex gap-4">
        <Button onClick={() => handleGrantClick()}>Give Role</Button>
      </div>
    );
  }
}
