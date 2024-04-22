"use client";
import KDialog, { useDialog } from "@/components/KDialog";
import KLogo from "@/components/KLogo";
import Convertor from "./Convertor";
import "./style.scss";
import WalletDetails from "./WalletDetails";

export default function CryptoConvertor() {
  const { ref, onOpen, onClose } = useDialog();
  return (
    <main>
      <div className="logo-wrapper flex-center">
        <KLogo />
      </div>

      <Convertor onWalletDetailsClicked={onOpen} />

      <KDialog ref={ref} onClose={onClose} size="460px">
        <WalletDetails onClose={onClose} />
      </KDialog>
    </main>
  );
}
