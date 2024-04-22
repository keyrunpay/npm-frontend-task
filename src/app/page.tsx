"use client";
import CryptoConvertor from "@/features/crypto-converter";
import { Web3ReactHooks, Web3ReactProvider } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { hooks as metaMaskHooks, metaMask } from "@/utils/metamask";

const connectors: [MetaMask, Web3ReactHooks][] = [[metaMask, metaMaskHooks]];

export default function Home() {
  return (
    <Web3ReactProvider connectors={connectors}>
      <CryptoConvertor />
    </Web3ReactProvider>
  );
}
