import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import QRCodeLink from "qrcode";
import { AiOutlineDownload } from "react-icons/ai";
import "./App.css";

function App() {
  const [link, setLink] = useState("");
  const [qrcodeLink, setQrcodeLink] = useState("");
  const [qrSize, setQrSize] = useState(200);
  const [theme, setTheme] = useState("light");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");

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
          color: {
            dark: fgColor,
            light: bgColor,
          },
        });
        setQrcodeLink(url);
      } catch (err) {
        console.error("Erro ao gerar o QR Code:", err);
      }
    };

    const debounceTimer = setTimeout(() => {
      generateQRCode();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [link, qrSize, fgColor, bgColor]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className={`container ${theme}`}>
      <div className="card">
        <div className="header">
          <h1>Gerador de QR Code</h1>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === "light" ? "Modo Escuro" : "Modo Claro"}
          </button>
        </div>

        <div className="qrcode-preview">
          {qrcodeLink ? (
            <img
              src={qrcodeLink}
              alt="QR Code gerado"
              style={{ width: qrSize, height: qrSize }}
            />
          ) : (
            <QRCode
              value={link || " "}
              size={qrSize}
              fgColor={fgColor}
              bgColor={bgColor}
            />
          )}
        </div>

        <div className="controls">
          <input
            className="input"
            type="text"
            placeholder="Digite qualquer texto ou link..."
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

          <div className="color-controls">
            <div>
              <label>Cor do QR Code:</label>
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
              />
            </div>
            <div>
              <label>Cor de Fundo:</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
              />
            </div>
          </div>

          {qrcodeLink && (
            <a href={qrcodeLink} download="qrcode.png" className="download-btn">
              <AiOutlineDownload size={40} />
              Baixar QR Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
