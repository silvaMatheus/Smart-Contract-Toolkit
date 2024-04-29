import Image from "next/image";
import WalletConnect from "./_components/wallet-connections";

export default function Page() {
  return (
    <div className="w-full lg:grid h-screen lg:grid-cols-2">
      <div
        className="flex items-center justify-center py-12
       w-full overflow-x-auto p-8 dark:bg-[url('/dot-pattern.png')]"
      >
        <WalletConnect />
      </div>
      ,atheus
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
