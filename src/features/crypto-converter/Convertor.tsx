import { fractionFormatter } from "@/utils/general";
import React, { ChangeEvent, useCallback, useState } from "react";

interface IProps {
  onWalletDetailsClicked: () => void;
}

let numberRegex = /^[0-9]*[\.]*?[0-9]{0,2}$/;

export default function Convertor({ onWalletDetailsClicked }: IProps) {
  const [nepAmount, setNepAmount] = useState<string>("");
  const [busdAmount, setBusdAmount] = useState<string>("");

  const handleNepChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const _val = e.target.value || "";
    if (!_val) {
      setNepAmount("");
      setBusdAmount("");
    }
    if (!numberRegex.test(_val)) return;
    const _busdVal = _val ? parseFloat(_val) * 3 : 0;
    setNepAmount(_val);
    setBusdAmount(fractionFormatter(_busdVal));
  }, []);

  const handleBusdChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const _val = e.target.value || "";
    if (!_val) {
      setNepAmount("");
      setBusdAmount("");
    }
    if (!numberRegex.test(_val)) return;
    const _nepVal = _val ? parseFloat(_val) / 3 : 0;
    setBusdAmount(_val);
    setNepAmount(fractionFormatter(_nepVal));
  }, []);

  return (
    <section className="crypto-convertor-box">
      <h1 className="title">Crypto Converter</h1>

      <div className="input-item">
        <label htmlFor="nep-currency">NEP</label>
        <input
          id="nep-currency"
          value={nepAmount}
          onChange={handleNepChange}
          placeholder="0.00"
          inputMode="numeric"
        />
      </div>

      <div className="flex-center exchange-icon">
        <img src="/svg/exchange.svg" alt="" />
      </div>

      <div className="input-item">
        <label htmlFor="busd-currency">BUSD</label>
        <input
          id="busd-currency"
          onChange={handleBusdChange}
          value={busdAmount}
          placeholder="0.00"
          inputMode="numeric"
        />
      </div>

      <div className="flex-center actions">
        <button
          aria-label="Check Wallet Details"
          onClick={onWalletDetailsClicked}
          className="link"
        >
          Check Wallet Details
        </button>
      </div>
    </section>
  );
}
