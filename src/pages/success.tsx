import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const Success = () => {
  const router = useRouter();
  return (
    <main>
      <div className="min-h-screen grid place-items-center">
        <div className="p-4 flex flex-col justify-center items-center">
          <span className="bg-green-950 rounded-full bg-opacity-30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="text-green-600 w-36"
            >
              <path
                d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"
                fill="currentColor"
              ></path>
            </svg>
          </span>

          <h1 className="text-3xl text-center mt-4 mb-1">Congratulations</h1>
          <p className="text-gray-600 mb-2">You may close this window now</p>
          <Button
            onClick={() => {
              router.push("/");
            }}
            variant={"ghost"}
          >
            Go Back
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Success;
