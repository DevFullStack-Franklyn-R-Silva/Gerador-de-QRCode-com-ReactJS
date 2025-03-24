import { useState, useRef } from "react";
import { QRCode } from "react-qrcode-logo";
import { AiOutlineDownload } from "react-icons/ai";
import * as htmlToImage from "html-to-image";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [qrSize, setQrSize] = useState(200);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [qrStyle, setQrStyle] = useState("squares"); // 'squares' ou 'dots'
  const [theme, setTheme] = useState("light");

  const qrRef = useRef(null);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleDownload = () => {
    if (qrRef.current === null) return;
    htmlToImage
      .toPng(qrRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "qrcode.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Erro ao baixar a imagem:", err);
      });
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

        {/* Área do QR Code com ref para exportação */}
        <div className="qrcode-preview" ref={qrRef}>
          <QRCode
            value={text || " "}
            size={qrSize}
            fgColor={fgColor}
            bgColor={bgColor}
            qrStyle={qrStyle}
            ecLevel="H"
          />
        </div>

        <div className="controls">
          <input
            className="input"
            type="text"
            placeholder="Digite qualquer texto ou link..."
            value={text}
            onChange={(e) => setText(e.target.value)}
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

          <div className="style-control">
            <label htmlFor="qr-style">Estilo do QR Code:</label>
            <select
              id="qr-style"
              value={qrStyle}
              onChange={(e) => setQrStyle(e.target.value)}
            >
              <option value="squares">Quadrado</option>
              <option value="dots">Ponto</option>
            </select>
          </div>

          <button onClick={handleDownload} className="download-btn">
            <AiOutlineDownload size={40} />
            Baixar QR Code
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
