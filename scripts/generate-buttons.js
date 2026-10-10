const fs = require("node:fs");
const path = require("node:path");

const rootDir = path.join(__dirname, "..");
const templatePath = path.join(rootDir, "templates", "button.svg");
const outputDir = path.join(rootDir, "assets");

const portfolioIconPath = path.join(outputDir, "portfolio-icon.webp");
const portfolioIconBase64 = fs.readFileSync(portfolioIconPath).toString("base64");

const icons = {
  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"/></svg>`,
  portfolio: `<svg xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    aria-hidden="true">
    <image
      href="data:image/webp;base64,${portfolioIconBase64}"
      x="0"
      y="0"
      width="24"
      height="24"
      preserveAspectRatio="xMidYMid meet"
    />
  </svg>`,
  lattes: `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 100 100"
    fill="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient
        id="lattes-gradient"
        x1="15"
        y1="15"
        x2="78"
        y2="88"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#454572" />
        <stop offset="0.45" stop-color="#7778AC" />
        <stop offset="0.75" stop-color="#32336D" />
        <stop offset="1" stop-color="#17174A" />
      </linearGradient>
    </defs>
    <path
      fill="url(#lattes-gradient)"
      d="
        M67 12
        C51 3 30 4 17 17
        C3 31 3 52 11 71
        L23 96
        C43 95 67 86 80 70
        C94 53 91 34 77 23
        C84 38 82 53 73 64
        C63 76 48 83 31 86
        L20 63
        C14 48 15 32 25 23
        C35 14 51 12 67 16
        Z
      "
    />
    <path
      fill="url(#lattes-gradient)"
      fill-rule="evenodd"
      d="
        M57 20
        A19 19 0 1 1 57 58
        A19 19 0 1 1 57 20
        Z

        M57 27
        A12 12 0 1 0 57 51
        A12 12 0 1 0 57 27
        Z
      "
    />
    <path
      fill="url(#lattes-gradient)"
      d="
        M39 49
        C44 57 52 61 61 60
        L67 73
        C57 80 45 84 33 85
        L25 65
        L43 61
        Z
      "
    />
  </svg>`,
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
    iconSvg: icons.linkedin,
  },
  {
    file: "button-portfolio.svg",
    label: "Portfólio",
    background: "#020617",
    foreground: "#f8fafc",
    border: "#242948",
    radius: 10,
    iconSvg: icons.portfolio,
  },
  {
    file: "button-lattes.svg",
    label: "Lattes CNPq",
    background: "#f4f4f4",
    foreground: "#006fba",
    border: "#e3e3e3",
    radius: 10,
    iconSvg: icons.lattes,
  },
  {
    file: "button-gmail.svg",
    label: "Gmail",
    background: "#EA4335",
    foreground: "#FFFFFF",
    border: "#EA4335",
    radius: 10,
    iconSvg: icons.gmail,
  },
  {
    file: "button-behance.svg",
    label: "Behance",
    background: "#F1F1F1",
    foreground: "#10131A",
    border: "#D9D9D9",
    radius: 10,
    iconSvg: icons.behance,
  },
  {
    file: "button-buymeacoffee.svg",
    label: "Buy Me a Coffee",
    background: "#FFDD00",
    foreground: "#10131A",
    border: "#E8C900",
    radius: 10,
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

function estimateTextWidth(text, fontSize = 13) {
  const narrow = new Set(" ilI.,:;'!|");
  const wide = new Set("MW@%&");
  let units = 0;

  for (const character of text) {
    if (narrow.has(character)) units += 0.32;
    else if (wide.has(character)) units += 0.88;
    else if (/[A-Z0-9]/.test(character)) units += 0.66;
    else if (character === " ") units += 0.34;
    else units += 0.56;
  }

  return Math.ceil(units * fontSize);
}

function renderButton(template, button) {
  const fontSize = button.fontSize ?? 13;
  const horizontalPadding = button.horizontalPadding ?? 16;
  const iconWidth = button.iconSvg ? (button.iconWidth ?? 16) : 0;
  const iconGap = button.iconSvg ? (button.iconGap ?? 8) : 0;
  const contentWidth = estimateTextWidth(button.label, fontSize) + iconWidth + iconGap;
  const width = button.width ?? Math.ceil(contentWidth + horizontalPadding * 2 + 2);

  const values = {
    "{{WIDTH}}": width,
    "{{HEIGHT}}": button.height ?? 40,
    "{{LABEL}}": escapeXml(button.label),
    "{{BACKGROUND}}": button.background ?? "#10131A",
    "{{FOREGROUND}}": button.foreground ?? "#FFFFFF",
    "{{BORDER}}": button.border ?? button.background ?? "#10131A",
    "{{RADIUS}}": button.radius ?? 10,
    "{{ICON_GAP}}": button.iconSvg ? (button.iconGap ?? 8) : 0,
    "{{HORIZONTAL_PADDING}}": button.horizontalPadding ?? 16,
    "{{FONT_SIZE}}": fontSize,
    "{{ICON_SVG}}": button.iconSvg ? button.iconSvg.replaceAll('width="16"', `width="${iconWidth}"`).replaceAll('height="16"', `height="${button.iconHeight ?? 16}"`) : "",
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
