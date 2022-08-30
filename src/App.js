import { useState } from "react";
import QRCode from "react-qr-code";
import QRCodeLink from "qrcode";
import {AiOutlineDownload} from "react-icons/ai"
import "./App.css";

function App() {
    const [link, setLink] = useState("");
    const [qrcodeLink, setQrcodeLink] = useState("");

    function handleGenerate(link_url) {
        QRCodeLink.toDataURL(link_url, {
            width: 600,
            margin: 3
        }, function(error, url) {
            setQrcodeLink(url);
        });
    };

    function handleQrcode(e)  {
        setLink(e.target.value);
        handleGenerate(e.target.value);
    };

    return (
        <div className="container">
            <QRCode value={link} />

            <input
                className="input"
                placeholder="Digite seu link..."
                value={link}
                onChange={(e) => handleQrcode(e)}
            />
            {Object.keys(link).length > 0 && (
                <a href={qrcodeLink} download={`qrcode.png`}>
                    <AiOutlineDownload className="icone" size={40}/>
                Baixar QrCode
                </a>
                )}
        </div>
    );
}

export default App;
