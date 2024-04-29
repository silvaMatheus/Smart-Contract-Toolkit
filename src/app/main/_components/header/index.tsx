"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";

export default function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });
  const { data: session, status } = useSession();

  return (
    <div className="flex w-full items-center justify-end gap-4">
      {session ? (
        <div className="flex items-center gap-2 w-full justify-between">
          <Button
            onClick={(e) => {
              e.preventDefault();
              disconnect();
              signOut();
            }}
            variant="outline"
          >
            Disconnect
          </Button>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex">
              {ensName ? `${ensName} (${address})` : address}
            </div>

            <Avatar>
              <AvatarImage
                src={ensAvatar || ""}
                alt={`Avatar for ${ensName || "user"}`}
              />
              <AvatarFallback>{ensName || "User"}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      ) : (
        <Button onClick={() => console.log("Add connection logic here")}>
          Connect Wallet
        </Button>
      )}
    </div>
  );
}
