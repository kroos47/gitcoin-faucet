import { useSession, signIn, signOut } from "next-auth/react";
import { useAccount } from "wagmi";
import { Button } from "./ui/button";
export default function SignIn() {
  const { address, isConnected } = useAccount();
  const { data: session } = useSession();

  console.log(session);
  if (session) {
    return (
      <div className="flex gap-4">
        <Button
          className="border border-dashed border-white p-2 cursor-pointer rounded fixed top-20 right-3"
          onClick={() => signOut()}
        >
          {session.discordUserId}
        </Button>
      </div>
    );
  } else {
    return (
      <div className="flex gap-4">
        <Button onClick={() => signIn("discord")}>Connect Discord</Button>
      </div>
    );
  }
}
