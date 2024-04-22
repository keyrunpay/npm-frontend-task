import { KDialogActions, KDialogHeader } from "@/components/KDialog";
import { shortenAddress, useBalances } from "@/utils/metamask";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { formatEther } from "@ethersproject/units";
import { KSpinner } from "@/components/KSpinner";
import { fractionFormatter } from "@/utils/general";

const allowedChains = [97];

export default function WalletDetails({ onClose }: any) {
  const [walletState, setWalletState] = useState<string>("idle");
  const { account, chainId, connector, isActive, isActivating, provider } =
    useWeb3React();

  const balance = useBalances(provider, account);

  const handleMetamaskConnect = () => {
    connector.activate(allowedChains);
  };

  const handleMetamaskDisconnect = () => {
    if (isActive) connector.resetState();
  };

  useEffect(() => {
    if (!window.ethereum) setWalletState("no-wallet");
    else if (isActive) setWalletState("connected");
    else setWalletState("idle");
  }, [isActive]);

  useEffect(() => {
    // @ts-ignore
    if (!!window.ethereum) connector.connectEagerly([97]);
  }, []);

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
        <div className="wallet-details">
          <div className="wallet-detail-item">
            <p className="text-sm text-dim">KEY</p>
            <p className="text-sm text-dim">VALUE</p>
          </div>

          <div className="wallet-detail-item">
            <p className="text-md">Account</p>
            <p className="text-md">{account ? shortenAddress(account) : "-"}</p>
          </div>

          <div className="wallet-detail-item">
            <p className="text-md">Chain ID</p>
            <p className="text-md">{chainId}</p>
          </div>

          <div className="wallet-detail-item">
            <p className="text-md">Balance</p>
            <p className="text-md">
              {balance
                ? `Ξ ${fractionFormatter(parseFloat(formatEther(balance)))}`
                : "-"}
            </p>
          </div>

          <div className="actions">
            <KDialogActions>
              <button onClick={handleMetamaskDisconnect} className="danger">
                Disconnect
              </button>
              <button onClick={onClose} className="secondary">
                Cancel
              </button>
            </KDialogActions>
          </div>
        </div>
      )}
    </>
  );
}
