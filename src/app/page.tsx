"use client";
import KDialog, { useDialog } from "@/components/KDialog";
import KLogo from "@/components/KLogo";
import { ChangeEvent, useState } from "react";
import { fractionFormatter } from "@/utils/general.utils";

export default function Home() {
  const { ref, onOpen, onClose } = useDialog();
  const [nepAmount, setNepAmount] = useState<string>("");
  const [busdAmount, setBusdAmount] = useState<string>("");

  const handleNepChange = (e: ChangeEvent<HTMLInputElement>) => {
    const _val = e.target.value || "";
    const _busdVal = _val ? parseInt(_val) * 3 : 0;
    setNepAmount(_val);
    setBusdAmount(fractionFormatter(_busdVal));
  };

  const handleBusdChange = (e: ChangeEvent<HTMLInputElement>) => {
    const _val = e.target.value || "";
    const _nepVal = _val ? parseInt(_val) / 3 : 0;
    setBusdAmount(_val);
    setNepAmount(fractionFormatter(_nepVal));
  };

  return (
    <main>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 94,
          marginBottom: 24,
        }}
      >
        <KLogo />
      </div>

      <section className="crypto-convertor-box">
        <h1 style={{ marginBottom: 16 }}>Crypto Converter</h1>

        <div className="input-item">
          <label htmlFor="nep-currency">NEP</label>
          <input
            id="nep-currency"
            value={nepAmount}
            onChange={handleNepChange}
            placeholder="0.00"
            type="number"
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "12px 0",
          }}
        >
          <img style={{ width: 24 }} src="/svg/exchange.svg" alt="" />
        </div>

        <div className="input-item">
          <label htmlFor="busd-currency">BUSD</label>
          <input
            id="busd-currency"
            onChange={handleBusdChange}
            value={busdAmount}
            placeholder="0.00"
            type="number"
          />
        </div>

        <div>
          <button className="link-btn">Check Wallet Details</button>
        </div>
      </section>
    </main>
  );
}
