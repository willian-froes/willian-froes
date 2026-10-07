const fs = require("fs")
const path = require("path")

const rootDir = path.join(__dirname, "..")

const templatePath = path.join(
  rootDir,
  "templates",
  "header.svg"
)

const outputDir = rootDir + "/assets"

const template = fs.readFileSync(
  templatePath,
  "utf8"
)

const headers = [
    {
        filename: "terminal-technologies.svg",
        profile: "willian@github ~",
        command: "./tecnologias",
        param: "",
    },
    {
        filename: "terminal-history.svg",
        profile: "willian@github ~",
        command: "./histórico",
        param: "--código",
    },
    {
        filename: "terminal-links.svg",
        profile: "willian@github ~",
        command: "./links",
        param: "",
    },
]

function generateHeader({
  filename,
  profile,
  command,
  param,
}) {
  const svg = template
    .replaceAll("{{PROFILE}}", profile)
    .replaceAll("{{COMMAND}}", command)
    .replaceAll("{{PARAM}}", param)

  const outputPath = path.join(
    outputDir,
    filename
  )

  fs.writeFileSync(
    outputPath,
    svg,
    "utf8"
  )

  console.log(`✓ ${filename}`)
}

headers.forEach(generateHeader)