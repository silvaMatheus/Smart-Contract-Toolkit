<p align="center">
  <img alt="Smart Contract Toolkit Cover Image" src="public/preview.gif">
</p>

<h1 align="center">
<a href="hgithub.com/silvamatheus/smart-contract-toolkit" target="_blank">Smart Contract Toolkit</a>
</h1>

<p align="center">
  Welcome to the Smart Contract Toolkit! This app is crafted to streamline your interaction with smart contracts. It's equipped with a user-friendly UI and a suite of tools designed for both the novice and the seasoned blockchain developer. Dive into a world where smart contract interaction is simplified, and enjoy the power of blockchain at your fingertips!
</p>

## ✨ Highlights

- ⚡️ **Next.js** - Powers the front-end for seamless server-side rendering and optimal user experience.
- 🎨 **Tailwind CSS** - Enables stylish and responsive design with utility-first CSS framework.
- 🛡️ **NextAuth** - Provides secure and flexible authentication using Next.js API routes.
- 🤝 **Wagmi** & **Ethers** - Integrate and interact with Ethereum blockchain smoothly.
- 📑 **React Hook Form & Zod** - Delivers efficient form handling and schema validation.
- 🎛️ **Radix-UI** - Offers unstyled, accessible components for building high-quality design systems.
- 🚀 **Vercel** - Ensures fast and reliable deployment, serving the app on the web.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` file:

```plaintext
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET="somereallysecretsecret"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Running locally

To get the app running locally, follow these steps:

1. Clone this repo:

```
$ git clone https://github.com/silvamatheus/smart-contract-toolkit
```

2. Then go to the project's folder:

```
cd matheusdeveloper.com
```

3. Install all dependencies:

```
pnpm install
```

4. Run locally:

```
pnpm run dev
```

## Features

- [x] **UI for Interacting with Smart Contracts** - Graphical interface to facilitate interaction with smart contracts.
- [x] **Real-Time Logging of Contract Function Calls** - Live monitoring of functions called on the contract.
- [x] **Responsive Site** - Interface adapts to various devices and screen sizes.
- [x] **Authentication with Wallets and Signatures** - Support for login and authentication using digital wallets such as Metamask and Coinbase.
- [x] **View and Filter Contract Functions** - Ability to view and filter the available functions of the smart contract.
- [ ] **Testing**
- [ ] **Contract Deployment** - Tools to facilitate the deployment of new smart contracts on the network.
- [ ] **Security Scoring and Contract Optimization** - Evaluation of potential security risks and code efficiency.
- [ ] **Transaction Simulation** - Simulation of operations to test contract behavior without spending real resources.
