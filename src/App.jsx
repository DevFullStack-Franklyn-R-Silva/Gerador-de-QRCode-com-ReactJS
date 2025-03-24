import { useState, useRef } from "react";
import { QRCode } from "react-qrcode-logo";
import {
  AiOutlineDownload,
  AiOutlineCopy,
  AiOutlineShareAlt,
} from "react-icons/ai";
import "./App.css";

function App() {
  // Estados para customizações
  const [text, setText] = useState("");
  const [qrSize, setQrSize] = useState(200);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [ecLevel, setEcLevel] = useState("H"); // "L", "M", "Q", "H"
  const [qrStyle, setQrStyle] = useState("squares"); // "squares" ou "dots"
  const [eyeStyle, setEyeStyle] = useState("square"); // "square" ou "circle"
  const [logoImage, setLogoImage] = useState("");
  const [logoOpacity, setLogoOpacity] = useState(1);
  const [removeQrCodeBehindLogo, setRemoveQrCodeBehindLogo] = useState(false);
  const [theme, setTheme] = useState("light");

  // Ref para o container do QR Code (usado para copiar/baixar)
  const qrRef = useRef(null);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  // Define o arredondamento dos olhos com base no estilo escolhido
  const eyeRadius = eyeStyle === "circle" ? 10 : 0;

  /**
   * Baixa SOMENTE o QR Code (canvas) como PNG
   */
  const handleDownload = () => {
    try {
      const canvas = qrRef.current.querySelector("canvas");
      if (!canvas) {
        alert("Nenhum canvas do QR Code foi encontrado!");
        return;
      }
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "qrcode.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Erro ao baixar QR Code:", err);
    }
  };

  /**
   * Copia SOMENTE o QR Code (canvas) para a área de transferência
   */
  const handleCopyQRCode = async () => {
    try {
      const canvas = qrRef.current.querySelector("canvas");
      if (!canvas) {
        alert("Nenhum canvas do QR Code foi encontrado!");
        return;
      }
      const dataUrl = canvas.toDataURL("image/png");
      const blob = await (await fetch(dataUrl)).blob();
      const clipboardItem = new ClipboardItem({ "image/png": blob });
      await navigator.clipboard.write([clipboardItem]);
      alert("QR Code copiado para a área de transferência!");
    } catch (err) {
      console.error("Erro ao copiar QR Code:", err);
    }
  };

  // Upload do logo
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Copiar texto para a área de transferência
  const handleCopyText = () => {
    if (text) {
      navigator.clipboard
        .writeText(text)
        .then(() => alert("Texto copiado para a área de transferência!"))
        .catch((err) => console.error("Erro ao copiar:", err));
    }
  };

  // Gera links de compartilhamento
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

        {/* Visualização do QR Code */}
        <div className="qrcode-preview" ref={qrRef}>
          <QRCode
            value={text || " "}
            size={qrSize}
            fgColor={fgColor}
            bgColor={bgColor}
            ecLevel={ecLevel}
            qrStyle={qrStyle}
            logoImage={logoImage}
            logoWidth={qrSize * 0.2}
            logoHeight={qrSize * 0.2}
            logoOpacity={logoOpacity}
            removeQrCodeBehindLogo={removeQrCodeBehindLogo}
            eyeRadius={eyeRadius}
          />
        </div>

        {/* Controles para customização */}
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

          {/* Estilo dos módulos */}
          <div className="style-control">
            <label htmlFor="qr-style">Estilo dos módulos:</label>
            <select
              id="qr-style"
              value={qrStyle}
              onChange={(e) => setQrStyle(e.target.value)}
            >
              <option value="squares">Quadrados</option>
              <option value="dots">Pontos</option>
            </select>
          </div>

          {/* Estilo dos olhos */}
          <div className="style-control">
            <label htmlFor="eye-style">Estilo dos olhos:</label>
            <select
              id="eye-style"
              value={eyeStyle}
              onChange={(e) => setEyeStyle(e.target.value)}
            >
              <option value="square">Quadrados</option>
              <option value="circle">Redondos</option>
            </select>
          </div>

          {/* Nível de Correção de Erro */}
          <div className="style-control">
            <label htmlFor="ec-level">Nível de Correção de Erro:</label>
            <select
              id="ec-level"
              value={ecLevel}
              onChange={(e) => setEcLevel(e.target.value)}
            >
              <option value="L">L (Baixo)</option>
              <option value="M">M (Médio)</option>
              <option value="Q">Q (Quase)</option>
              <option value="H">H (Alto)</option>
            </select>
          </div>

          {/* Opacidade do Logo */}
          <div className="style-control">
            <label htmlFor="logo-opacity">Opacidade do Logo:</label>
            <input
              id="logo-opacity"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={logoOpacity}
              onChange={(e) => setLogoOpacity(Number(e.target.value))}
            />
          </div>

          {/* Remover QR Code por trás do logo */}
          <div className="style-control">
            <label htmlFor="remove-behind-logo">
              Remover QR Code por trás do logo:
            </label>
            <input
              id="remove-behind-logo"
              type="checkbox"
              checked={removeQrCodeBehindLogo}
              onChange={(e) => setRemoveQrCodeBehindLogo(e.target.checked)}
            />
          </div>

          {/* Upload do logo */}
          <div className="logo-control">
            <label htmlFor="logo-upload">Insira um logo:</label>
            <input
              id="logo-upload"
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
            />
          </div>

          {/* Botões de compartilhamento */}
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

          {/* Ações de copiar/baixar */}
          <div className="action-buttons">
            <button onClick={handleCopyQRCode} className="copy-btn">
              <AiOutlineCopy size={20} /> Copiar QR Code
            </button>
            <button onClick={handleDownload} className="download-btn">
              <AiOutlineDownload size={40} /> Baixar QR Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
