import { useAccount, useSignMessage } from "wagmi";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { flushSync } from "react-dom";
import toast from "react-hot-toast";
const API_KEY = process.env.NEXT_PUBLIC_GC_API_KEY;
const SCORER_ID = process.env.NEXT_PUBLIC_GC_SCORER_ID;
const SIGNING_MESSAGE_URI = "/api/gitcoin/registry/signing-message";
const SUBMIT_PASSPORT_URI = "/api/gitcoin/registry/submit-passport";
const headers = API_KEY
  ? {
      "Content-Type": "application/json",
      "X-API-Key": API_KEY,
    }
  : undefined;
const thresholdNumber = 1;

async function getSigningMessage() {
  try {
    const response = await fetch(SIGNING_MESSAGE_URI, { headers });
    const json = await response.json();
    console.log(json);
    return json;
  } catch (err) {
    console.log("error: ", err);
  }
}

type Props = {
  score: number;
  setScore: (v: number) => void;
};

function Gitpass({ score, setScore }: Props) {
  const { address, isConnected } = useAccount();
  const [isLoading, setLoading] = useState(false);

  //   const [noScoreMessage, setNoScoreMessage] = useState<string>("");
  const { data, signMessage, isError, isSuccess } = useSignMessage();

  //   useEffect(() => {
  //     if (isConnected) {
  //       submitPassport();
  //     }
  //   }, [isConnected]);

  async function submitPassport() {
    setLoading(true);
    const headers = API_KEY
      ? {
          "Content-Type": "application/json",
          "X-API-Key": API_KEY,
        }
      : undefined;

    const { message, nonce } = await getSigningMessage();
    signMessage({ message });
    try {
      const response = await fetch(SUBMIT_PASSPORT_URI, {
        method: "POST",
        headers,
        body: JSON.stringify({ address, scorer_id: SCORER_ID, data, nonce }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res_data = await response.json();
      console.log("data:", res_data);
      setScore(res_data.score);
      if (res_data.score > 1) {
        toast.success("Succesfully Submitted");
      } else {
        toast.error("Lesser than threshold");
      }
    } catch (err) {
      setScore(-1);
      console.error("Error submitting passport: ", err);
    }
    setLoading(false);
  }

  if (!isConnected) return <></>;

  return (
    <>
      <div className="text-center">
        <p className="text-base text-gray-700 mb-4">
          Configure your passport:
          <a
            className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
            target="_blank"
            href="https://passport.gitcoin.co/#/dashboard"
          >
            here
          </a>
        </p>
        <p className="text-base text-gray-700">
          Once you've added more stamps to your passport, submit your passport
          again to recalculate your score.
        </p>
      </div>
      <Button onClick={submitPassport} disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit Passport"}
      </Button>
      {score > 0 && <p>Passport Score {score}</p>}
    </>
  );
}
export default Gitpass;
