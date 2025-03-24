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
  const [qrStyle, setQrStyle] = useState("squares"); // "squares" ou "dots"
  const [theme, setTheme] = useState("light");
  const [logoImage, setLogoImage] = useState("");

  // Ref para pegar o container do QR Code (usado para download)
  const qrRef = useRef(null);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  /**
   * Baixa o container inteiro do QR Code usando html-to-image
   * (caso você queira só o QR Code puro, pode trocar a lógica
   * para usar o <canvas> como no handleCopyQRCode).
   */
  const handleDownload = () => {
    try {
      // Pegamos o canvas gerado pelo QRCode
      const canvas = qrRef.current.querySelector("canvas");
      if (!canvas) {
        alert("Nenhum canvas do QR Code foi encontrado!");
        return;
      }
      // Gera o dataURL (imagem PNG) do canvas
      const dataUrl = canvas.toDataURL("image/png");

      // Cria um link temporário para baixar
      const link = document.createElement("a");
      link.download = "qrcode.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Erro ao baixar QR Code:", err);
    }
  };

  /**
   * Copia apenas o <canvas> gerado pelo QRCode,
   * garantindo que fique sem fundo extra (apenas o QR Code).
   */
  const handleCopyQRCode = async () => {
    try {
      // Dentro do container (qrRef.current), pegamos o <canvas> do QR Code
      const canvas = qrRef.current.querySelector("canvas");
      if (!canvas) {
        alert("Nenhum canvas do QR Code foi encontrado!");
        return;
      }

      // Convertemos o canvas em DataURL (imagem PNG)
      const dataUrl = canvas.toDataURL("image/png");

      // Transformamos em Blob para criar o ClipboardItem
      const blob = await (await fetch(dataUrl)).blob();
      const clipboardItem = new ClipboardItem({ "image/png": blob });

      // Copiamos para a área de transferência
      await navigator.clipboard.write([clipboardItem]);
      alert("QR Code copiado para a área de transferência!");
    } catch (err) {
      console.error("Erro ao copiar QR Code:", err);
    }
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

        {/* Área do QR Code (para visualização e download) */}
        <div className="qrcode-preview" ref={qrRef}>
          <QRCode
            value={text || " "}
            size={qrSize}
            fgColor={fgColor}
            bgColor={bgColor}
            qrStyle={qrStyle}
            ecLevel="H"
            logoImage={logoImage}
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
