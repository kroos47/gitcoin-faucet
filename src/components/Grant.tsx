import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import useGrantRole from "../hooks/useGrantRole";

type Props = {
  score: number;
  setScore: (v: number) => void;
};

export default function Grant({ score, setScore }: Props) {
  const { data: session } = useSession();
  // console.log(session?.address);

  const { grant } = useGrantRole(session?.discordUserId || "");

  const handleGrantClick = async () => {
    if (session?.discordUserId) {
      await grant(score);
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
