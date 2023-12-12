import { useAccount, useSignMessage } from "wagmi";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const API_KEY = process.env.NEXT_PUBLIC_GC_API_KEY;
const SCORER_ID = parseInt(process.env.NEXT_PUBLIC_GC_SCORER_ID as string);
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

function Gitpass() {
  const { address, isConnected } = useAccount();
  const { signMessage } = useSignMessage();
  const [isLoading, setLoading] = useState(false);
  const [score, setScore] = useState<string>("");
  const [noScoreMessage, setNoScoreMessage] = useState<string>("");

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
    const signature = signMessage({ message });

    try {
      const response = await fetch(SUBMIT_PASSPORT_URI, {
        method: "POST",
        headers,
        body: JSON.stringify({ address, scorer: SCORER_ID, signature, nonce }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("data:", data);
    } catch (err) {
      console.error("Error submitting passport: ", err);
    }
    setLoading(false);
  }

  async function getScore() {
    setScore("");
    const GET_PASSPORT_SCORE_URI = `/api/gitcoin/registry/score/${SCORER_ID}/${address}`;
    try {
      const response = await fetch(GET_PASSPORT_SCORE_URI, {
        headers,
      });
      const passportData = await response.json();
      if (passportData.score) {
        // if the user has a score, round it and set it in the local state
        const roundedScore = Math.round(passportData.score * 100) / 100;
        setScore(roundedScore.toString());
        console.log("PASSPORT SCORE = ", roundedScore);
      } else {
        // if the user has no score, display a message letting them know to submit thier passporta
        console.log(
          "No score available, please add Stamps to your passport and then resubmit."
        );
        setNoScoreMessage(
          "No score available, please submit your passport after you have added some stamps."
        );
      }
    } catch (err) {
      console.log("error: ", err);
    }
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
      <Button onClick={getScore} disabled={isLoading}>
        {isLoading ? "Checking..." : "checking passport"}
      </Button>
    </>
  );
}

export default Gitpass;
