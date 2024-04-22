import { initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import type { BigNumber } from "@ethersproject/bignumber";
import type { Web3ReactHooks } from "@web3-react/core";
import { useEffect, useState } from "react";

export const [metaMask, hooks] = initializeConnector<MetaMask>(
  (actions) => new MetaMask({ actions })
);

export function useBalances(
  provider?: ReturnType<Web3ReactHooks["useProvider"]>,
  account?: string
): BigNumber | undefined {
  const [balance, setBalance] = useState<BigNumber | undefined>();

  useEffect(() => {
    if (provider && account) {
      let stale = false;

      provider.getBalance(account).then((balances) => {
        if (stale) return;
        setBalance(balances);
      });

      return () => {
        stale = true;
        setBalance(undefined);
      };
    }
  }, [provider, account]);

  return balance;
}
