import React, { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

export default function QRCode({ value }) {
  const qrCodeRef = useRef(null);

  useEffect(() => {
    if (!qrCodeRef.current) return;

    const qrCode = new QRCodeStyling({
      width: 200,
      height: 200,
      type: "svg",
      data: value,
      qrOptions: {
        typeNumber: 6,
        mode: "Byte",
        errorCorrectionLevel: "Q",
      },
      dotsOptions: {
        type: "extra-rounded",
        color: "#4267b2",
      },
      backgroundOptions: {
        color: "#F1F5F9",
      },
    });

    qrCode.append(qrCodeRef.current);
  }, []);

  return <div ref={qrCodeRef}></div>;
}
