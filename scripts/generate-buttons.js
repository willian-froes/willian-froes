const fs = require("node:fs");
const path = require("node:path");

const rootDir = path.join(__dirname, "..");
const templatePath = path.join(rootDir, "templates", "button.svg");
const outputDir = path.join(rootDir, "assets");

// Ícones SVG inline: não dependem de CDN, fontes ou imagens externas.
const icons = {
  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"/></svg>`,
  portfolio: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9.5" stroke="currentColor" stroke-width="2"/><path d="M2.8 9h18.4M2.8 15h18.4M12 2.5c2.5 2.6 3.7 5.8 3.7 9.5s-1.2 6.9-3.7 9.5C9.5 18.9 8.3 15.7 8.3 12S9.5 5.1 12 2.5Z" stroke="currentColor" stroke-width="1.5"/></svg>`,
  lattes: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 5.5A2.5 2.5 0 0 1 5.5 3H11v17H5.5A2.5 2.5 0 0 0 3 22V5.5ZM21 5.5A2.5 2.5 0 0 0 18.5 3H13v17h5.5A2.5 2.5 0 0 1 21 22V5.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  gmail: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 18.5V6.8c0-1.5 1.7-2.3 2.9-1.4L12 10l6.1-4.6c1.2-.9 2.9-.1 2.9 1.4v11.7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 7l9 6.5L21 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  behance: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9.7 11.1c1.4-.7 2.1-1.7 2.1-3.1 0-2.6-1.9-3.8-4.7-3.8H1v15.6h6.3c3.2 0 5.5-1.4 5.5-4.4 0-2-1.1-3.6-3.1-4.3ZM4.2 6.8h2.6c1.3 0 2 .5 2 1.6 0 1.1-.7 1.7-2 1.7H4.2V6.8Zm2.9 10.4H4.2v-4.4h2.9c1.7 0 2.5.7 2.5 2.2 0 1.4-.9 2.2-2.5 2.2ZM17.9 8.1c-3.4 0-5.6 2.4-5.6 5.9 0 3.6 2.2 5.9 5.9 5.9 2.7 0 4.5-1.3 5.1-3.5h-3.1c-.3.8-1 1.2-2 1.2-1.5 0-2.4-.9-2.6-2.5h7.9v-.9c0-3.8-2.1-6.1-5.6-6.1Zm-2.3 4.7c.2-1.3 1-2 2.3-2 1.3 0 2 .7 2.2 2h-4.5ZM15 4h6v2h-6V4Z"/></svg>`,
  coffee: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 7h14v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V7Zm14 2h2a3 3 0 1 1 0 6h-2v-2h2a1 1 0 1 0 0-2h-2V9ZM5 3h2v3H5V3Zm4 0h2v3H9V3Zm4 0h2v3h-2V3Z"/></svg>`,
};

const buttons = [
  {
    file: "button-linkedin.svg",
    label: "LinkedIn",
    background: "#0A66C2",
    foreground: "#FFFFFF",
    border: "#0A66C2",
    radius: 10,
    width: 150,
    iconSvg: icons.linkedin,
  },
  {
    file: "button-portfolio.svg",
    label: "Portfólio",
    background: "#10131A",
    foreground: "#FFFFFF",
    border: "#242948",
    radius: 10,
    width: 150,
    iconSvg: icons.portfolio,
  },
  {
    file: "button-lattes.svg",
    label: "Lattes CNPq",
    background: "#0066CC",
    foreground: "#FFFFFF",
    border: "#0066CC",
    radius: 10,
    width: 165,
    iconSvg: icons.lattes,
  },
  {
    file: "button-gmail.svg",
    label: "Gmail",
    background: "#EA4335",
    foreground: "#FFFFFF",
    border: "#EA4335",
    radius: 10,
    width: 135,
    iconSvg: icons.gmail,
  },
  {
    file: "button-behance.svg",
    label: "Behance",
    background: "#F1F1F1",
    foreground: "#10131A",
    border: "#D9D9D9",
    radius: 10,
    width: 150,
    iconSvg: icons.behance,
  },
  {
    file: "button-buymeacoffee.svg",
    label: "Buy Me a Coffee",
    background: "#FFDD00",
    foreground: "#10131A",
    border: "#E8C900",
    radius: 10,
    width: 205,
    iconSvg: icons.coffee,
  },
];

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function renderButton(template, button) {
  const values = {
    "{{WIDTH}}": button.width ?? 160,
    "{{HEIGHT}}": button.height ?? 40,
    "{{LABEL}}": escapeXml(button.label),
    "{{BACKGROUND}}": button.background ?? "#10131A",
    "{{FOREGROUND}}": button.foreground ?? "#FFFFFF",
    "{{BORDER}}": button.border ?? button.background ?? "#10131A",
    "{{RADIUS}}": button.radius ?? 10,
    // Conteúdo SVG confiável definido localmente acima: não escapar as tags.
    "{{ICON_SVG}}": button.iconSvg ?? "",
  };

  return Object.entries(values).reduce(
    (svg, [placeholder, value]) => svg.replaceAll(placeholder, String(value)),
    template,
  );
}

function main() {
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template não encontrado: ${templatePath}`);
  }

  fs.mkdirSync(outputDir, { recursive: true });
  const template = fs.readFileSync(templatePath, "utf8");

  for (const button of buttons) {
    const outputPath = path.join(outputDir, button.file);
    fs.writeFileSync(outputPath, renderButton(template, button), "utf8");
    console.log(`Gerado: ${path.relative(rootDir, outputPath)}`);
  }

  console.log(`\n${buttons.length} botões SVG gerados com ícones inline.`);
}

main();
