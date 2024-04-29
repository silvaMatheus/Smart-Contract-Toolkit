import { PropsWithChildren } from "react";
import Account from "./_components/header";

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <header className="top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Account />
      </header>
      <main className="h-[calc(100vh-4rem)]">{children}</main>
    </>
  );
}
