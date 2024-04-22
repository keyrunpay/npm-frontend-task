import { KDialogActions, KDialogHeader } from "@/components/KDialog";
import { useBalances } from "@/utils/metamask";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { formatEther } from "@ethersproject/units";
import { KSpinner } from "@/components/KSpinner";

export default function WalletDetails({ onClose }: any) {
  const [walletState, setWalletState] = useState<string>("idle");
  const { account, chainId, connector, isActive, isActivating, provider } =
    useWeb3React();

  const balance = useBalances(provider, account);

  const handleMetamaskConnect = () => {
    connector.activate([97]);
  };

  const handleMetamaskDisconnect = () => {
    if (isActive) connector.resetState();
  };

  useEffect(() => {
    if (!window.ethereum) setWalletState("no-wallet");
    else if (isActive) setWalletState("connected");
    else setWalletState("idle");
  }, [isActive]);

  return (
    <>
      <KDialogHeader title="Wallet Details" onClose={onClose} />
      {walletState == "idle" && (
        <>
          <p className="text-error">
            Wallet not connected. Please click the "Connect Now" button below
          </p>

          <KDialogActions>
            <button
              autoFocus
              onClick={handleMetamaskConnect}
              className="primary"
            >
              {isActivating ? <KSpinner /> : "Connect"}
            </button>
            <button onClick={onClose} className="secondary">
              Cancel
            </button>
          </KDialogActions>
        </>
      )}

      {walletState == "no-wallet" && (
        <>
          <p className="text-error">
            MetaMask not installed, please install extension.
          </p>

          <KDialogActions>
            <a
              className="d-block"
              target="_blank"
              rel="noopener noreferrer"
              href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
            >
              <button autoFocus className="primary w-full">
                Install
              </button>
            </a>
            <button onClick={onClose} className="secondary">
              Cancel
            </button>
          </KDialogActions>
        </>
      )}

      {walletState == "connected" && (
        <>
          <p className="text-error">Account: {account}</p>
          <p className="text-error">ChainId: {chainId}</p>
          {balance && (
            <p className="text-error">Balance: Ξ {formatEther(balance)}</p>
          )}

          <KDialogActions>
            <button onClick={handleMetamaskDisconnect} className="primary">
              Disconnect
            </button>
            <button onClick={onClose} className="secondary">
              Cancel
            </button>
          </KDialogActions>
        </>
      )}
    </>
  );
}
