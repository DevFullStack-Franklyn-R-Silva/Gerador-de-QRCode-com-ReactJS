import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import QRCodeLink from "qrcode";
import { AiOutlineDownload } from "react-icons/ai";
import "./App.css";

function App() {
  const [link, setLink] = useState("");
  const [qrcodeLink, setQrcodeLink] = useState("");
  const [qrSize, setQrSize] = useState(200); // Tamanho inicial em pixels
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!link) {
      setQrcodeLink("");
      return;
    }

    const generateQRCode = async () => {
      try {
        const url = await QRCodeLink.toDataURL(link, {
          width: qrSize,
          margin: 3,
        });
        setQrcodeLink(url);
        setError(null);
      } catch (err) {
        console.error("Erro ao gerar o QR Code:", err);
        setError("Erro ao gerar QR Code.");
      }
    };

    // Debounce para evitar chamadas excessivas enquanto o usuário digita
    const debounceTimer = setTimeout(() => {
      generateQRCode();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [link, qrSize]);

  return (
    <div className="container">
      <div className="qrcode-preview">
        <QRCode value={link || " "} size={qrSize} />
      </div>

      <input
        className="input"
        type="text"
        placeholder="Digite seu link..."
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />

      <div className="size-control">
        <label htmlFor="qr-size">Tamanho do QR Code: {qrSize}px</label>
        <input
          id="qr-size"
          type="range"
          min="100"
          max="600"
          step="50"
          value={qrSize}
          onChange={(e) => setQrSize(Number(e.target.value))}
        />
      </div>

      {error && <p className="error">{error}</p>}

      {qrcodeLink && (
        <a href={qrcodeLink} download="qrcode.png" className="download-btn">
          <AiOutlineDownload size={40} />
          Baixar QR Code
        </a>
      )}
    </div>
  );
}

export default App;
