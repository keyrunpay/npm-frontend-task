import { fractionFormatter } from "@/utils/general";
import React, { ChangeEvent, useState } from "react";

interface IProps {
  onWalletDetailsClicked: () => void;
}

export default function Convertor({ onWalletDetailsClicked }: IProps) {
  const [nepAmount, setNepAmount] = useState<string>("");
  const [busdAmount, setBusdAmount] = useState<string>("");

  const handleNepChange = (e: ChangeEvent<HTMLInputElement>) => {
    const _val = e.target.value || "";
    const _busdVal = _val ? parseFloat(_val) * 3 : 0;
    setNepAmount(_val);
    setBusdAmount(fractionFormatter(_busdVal));
  };

  const handleBusdChange = (e: ChangeEvent<HTMLInputElement>) => {
    const _val = e.target.value || "";
    const _nepVal = _val ? parseFloat(_val) / 3 : 0;
    setBusdAmount(_val);
    setNepAmount(fractionFormatter(_nepVal));
  };

  return (
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

      <div className="flex-center actions">
        <button onClick={onWalletDetailsClicked} className="link">
          Check Wallet Details
        </button>
      </div>
    </section>
  );
}
