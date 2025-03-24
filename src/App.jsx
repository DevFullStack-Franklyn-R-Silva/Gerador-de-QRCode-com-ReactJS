import { useState, useRef } from "react";
import { QRCode } from "react-qrcode-logo";
import {
  AiOutlineDownload,
  AiOutlineCopy,
  AiOutlineShareAlt,
} from "react-icons/ai";
import * as htmlToImage from "html-to-image";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [qrSize, setQrSize] = useState(200);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [qrStyle, setQrStyle] = useState("squares"); // 'squares' ou 'dots'
  const [theme, setTheme] = useState("light");
  const [logoImage, setLogoImage] = useState("");

  const qrRef = useRef(null);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleDownload = () => {
    if (!qrRef.current) return;
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

  // Função para upload do logo
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Copiar o texto para a área de transferência
  const handleCopyText = () => {
    if (text) {
      navigator.clipboard
        .writeText(text)
        .then(() => alert("Texto copiado para a área de transferência!"))
        .catch((err) => console.error("Erro ao copiar:", err));
    }
  };

  // Gerando links para compartilhamento (encodificando o texto)
  const shareTextEncoded = encodeURIComponent(text);
  const whatsappShare = `https://wa.me/?text=${shareTextEncoded}`;
  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${shareTextEncoded}`;
  const twitterShare = `https://twitter.com/intent/tweet?text=${shareTextEncoded}`;

  return (
    <div className={`container ${theme}`}>
      <div className="card">
        <div className="header">
          <h1>Gerador de QR Code</h1>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === "light" ? "Modo Escuro" : "Modo Claro"}
          </button>
        </div>

        {/* Área do QR Code com animação e ref para exportação */}
        <div className="qrcode-preview" ref={qrRef}>
          <QRCode
            value={text || " "}
            size={qrSize}
            fgColor={fgColor}
            bgColor={bgColor}
            qrStyle={qrStyle}
            ecLevel="H"
            logoImage={logoImage}
            // Logo dimensionado para 20% do tamanho total do QR Code
            logoWidth={qrSize * 0.2}
            logoHeight={qrSize * 0.2}
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

          <div className="logo-control">
            <label htmlFor="logo-upload">Insira um logo:</label>
            <input
              id="logo-upload"
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
            />
          </div>

          <div className="share-controls">
            <button onClick={handleCopyText} className="copy-btn">
              <AiOutlineCopy size={20} /> Copiar Texto
            </button>
            <a
              href={whatsappShare}
              target="_blank"
              rel="noreferrer"
              className="share-btn"
            >
              <AiOutlineShareAlt size={20} /> WhatsApp
            </a>
            <a
              href={facebookShare}
              target="_blank"
              rel="noreferrer"
              className="share-btn"
            >
              <AiOutlineShareAlt size={20} /> Facebook
            </a>
            <a
              href={twitterShare}
              target="_blank"
              rel="noreferrer"
              className="share-btn"
            >
              <AiOutlineShareAlt size={20} /> Twitter
            </a>
          </div>

          <button onClick={handleDownload} className="download-btn">
            <AiOutlineDownload size={40} /> Baixar QR Code
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
