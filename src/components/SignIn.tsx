import { useSession, signIn, signOut } from "next-auth/react";
import { useAccount } from "wagmi";
import { Button } from "./ui/button";
export default function SignIn() {
  const { address, isConnected } = useAccount();
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex gap-4">
        <Button onClick={() => signIn("discord")}>Connect Discord</Button>
      </div>
    );
  }
}
