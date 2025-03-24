# Gerador de QR Code com ReactJS

Este projeto é um **gerador de QR Code** desenvolvido com **ReactJS**. O usuário pode inserir um texto ou URL e gerar um código QR correspondente, com a possibilidade de fazer o download como um arquivo PNG.

[![Wakatime](https://wakatime.com/badge/user/268de5b9-4dbd-4873-9ede-a165e5745754/project/9ef7b6c4-80ab-4866-be52-b446eedd73d3.svg)](https://wakatime.com/badge/user/268de5b9-4dbd-4873-9ede-a165e5745754/project/9ef7b6c4-80ab-4866-be52-b446eedd73d3)

## Funcionalidades

- Geração de QR Code a partir de um link ou texto.
- Download do QR Code gerado em formato PNG.
- Interface simples e intuitiva.

## Como Usar

1. Clone este repositório:

   ```bash
   git clone https://github.com/DevFullStack-Franklyn-R-Silva/gerador-qr-code.git
   ```

2. Instale as dependências:

   ```bash
   cd gerador-qr-code
   npm install
   ```

3. Inicie o servidor local:

   ```bash
   npm start
   ```

4. Acesse o gerador no navegador em [http://localhost:3000](http://localhost:3000).

5. Para gerar um QR Code:
   - Insira um texto ou URL.
   - Clique em "Gerar QR Code".
   - Baixe o código QR clicando em "Baixar QR Code".

**Veja o site em funcionamento**: [Clique aqui](https://gerador-de-qr-code-reactjs.netlify.app/)

## Tecnologias Utilizadas

- **ReactJS**: Biblioteca JavaScript para interfaces de usuário.
- **JavaScript**: Linguagem principal.
- **HTML**: Estrutura da página.
- **CSS**: Estilização da página.
- **react-qr-code**: Biblioteca para gerar QR Codes.
- **qrcode**: Biblioteca auxiliar para manipulação de QR Codes.
- **react-icons**: Biblioteca para ícones.

## Como Contribuir

1. Faça um fork deste repositório.
2. Realize as modificações desejadas.
3. Envie um pull request.

## Imagem do Projeto

![Exemplo de QR Code gerado](foto.png)

## Instalação de Bibliotecas

Instale as bibliotecas necessárias com os seguintes comandos:

```bash
yarn add react-qr-code
yarn add qrcode
npm install react-icons
```

## Scripts

### `npm start`

Inicia a aplicação no modo de desenvolvimento. Acesse [http://localhost:3000](http://localhost:3000).

### `npm test`

Roda os testes no modo interativo.

### `npm run build`

Cria uma versão otimizada para produção.

### `npm run eject`

Desfaz a configuração padrão do `create-react-app` (não reversível).

## Referências

- [Create React App - Documentação](https://facebook.github.io/create-react-app/docs/getting-started)
- [Documentação do React](https://reactjs.org/)
