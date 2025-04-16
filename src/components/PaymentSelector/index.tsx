import { FC } from "react";

interface PaymentSelectorProps {
  selected: "credito" | "debito" | "dinheiro" | "pix";
  onChange: (value: "credito" | "debito" | "dinheiro" | "pix") => void;
}

export const PaymentSelector: FC<PaymentSelectorProps> = ({ selected, onChange }) => {
  return (
    <div style={{ marginTop: "1rem" }}>
      <h3>Forma de pagamento</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "0.5rem" }}>
        {["credito", "debito", "dinheiro", "pix"].map((method) => (
          <label key={method} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              type="radio"
              name="payment"
              value={method}
              checked={selected === method}
              onChange={() => onChange(method as PaymentSelectorProps["selected"])}
            />
            {method.charAt(0).toUpperCase() + method.slice(1)}
          </label>
        ))}
      </div>
    </div>
  );
};
