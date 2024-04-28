import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { base, mainnet } from "wagmi/chains";

import { coinbaseWallet, metaMask } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, base],
  ssr: true,
  multiInjectedProviderDiscovery: false,
  connectors: [
    metaMask(),
    coinbaseWallet({
      appName: "My Wagmi App",
    }),
  ],
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
});
