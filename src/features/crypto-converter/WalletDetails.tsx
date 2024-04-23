import { KDialogActions, KDialogHeader } from "@/components/KDialog";
import { shortenAddress, useBalances } from "@/utils/metamask";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import { formatEther } from "@ethersproject/units";
import { KSpinner } from "@/components/KSpinner";
import { fractionFormatter } from "@/utils/general";

const allowedChains = [97];

export default function WalletDetails({ onClose }: any) {
  const [walletState, setWalletState] = useState<string>("idle");
  const [error, setError] = useState<string>("");
  const { account, chainId, connector, isActive, isActivating, provider } =
    useWeb3React();

  const balance = useBalances(provider, account);

  const handleMetamaskConnect = useCallback(async () => {
    try {
      await connector.activate(...allowedChains);
    } catch (error: any) {
      setWalletState("idle");
      setError(error?.message);
      localStorage.removeItem("connected");
    }
  }, []);

  const handleMetamaskDisconnect = useCallback(() => {
    if (isActive) {
      connector.resetState();
      localStorage.removeItem("connected");
    }
  }, [isActive]);

  useEffect(() => {
    if (!window.ethereum) setWalletState("no-wallet");
    else if (isActive) {
      setWalletState("connected");
      localStorage.setItem("connected", "Y");
    } else setWalletState("idle");
  }, [isActive]);

  useEffect(() => {
    if (!!window.ethereum && localStorage.getItem("connected") == "Y") {
      handleMetamaskConnect();
    }
  }, []);

  return (
    <>
      <KDialogHeader
        aria={{ close: "Close Wallet Details" }}
        title="Wallet Details"
        onClose={onClose}
      />
      {walletState == "idle" && (
        <>
          <p className="text-error">
            {error ||
              `Wallet not connected. Please click the "Connect Now" button below`}
          </p>

          <KDialogActions>
            <button
              aria-label="Connect Wallet"
              autoFocus
              onClick={handleMetamaskConnect}
              className="primary"
            >
              {isActivating ? <KSpinner type="white" /> : "Connect"}
            </button>
            <button aria-label="Cancel" onClick={onClose} className="secondary">
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
              aria-label="Install Metamask"
              className="d-block"
              target="_blank"
              rel="noopener noreferrer"
              href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
            >
              <button autoFocus className="primary w-full">
                Install
              </button>
            </a>
            <button aria-label="Cancel" onClick={onClose} className="secondary">
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
              {balance ? (
                `Ξ ${fractionFormatter(parseFloat(formatEther(balance)))}`
              ) : (
                <KSpinner type="dark" />
              )}
            </p>
          </div>

          <div className="actions">
            <KDialogActions>
              <button
                aria-label="Disconnect Wallet"
                onClick={handleMetamaskDisconnect}
                className="danger"
              >
                Disconnect
              </button>
              <button
                aria-label="Cancel"
                onClick={onClose}
                className="secondary"
              >
                Cancel
              </button>
            </KDialogActions>
          </div>
        </div>
      )}
    </>
  );
}
