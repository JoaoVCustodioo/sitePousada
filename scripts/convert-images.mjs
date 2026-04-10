import sharp from 'sharp'
import { glob } from 'glob'
import path from 'path'
import fs from 'fs'

const IMAGES_DIR = 'src/assets/images'

// glob case-insensitive para capturar .JPG, .JPEG, .jpg, .jpeg, .png
const files = await glob(`${IMAGES_DIR}/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}`, {
  nocase: true,
  dot: false,
})

// Filtra arquivos que já são WebP convertidos (evitar re-processar)
const originals = files.filter(f => !f.includes('-desktop.webp') && !f.includes('-mobile.webp'))

let converted = 0
let skipped = 0

for (const file of originals) {
  const dir = path.dirname(file)
  const base = path.basename(file, path.extname(file))

  const desktopPath = path.join(dir, `${base}-desktop.webp`)
  const mobilePath = path.join(dir, `${base}-mobile.webp`)

  // Idempotente: pula se ambos já existem
  const desktopExists = fs.existsSync(desktopPath)
  const mobileExists = fs.existsSync(mobilePath)

  if (desktopExists && mobileExists) {
    console.log(`⏭  Skipped (already exists): ${base}`)
    skipped++
    continue
  }

  const image = sharp(file)
  const meta = await image.metadata()

  // Desktop: max 1200px de largura
  if (!desktopExists) {
    await image
      .clone()
      .resize({ width: Math.min(meta.width, 1200), withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(desktopPath)
  }

  // Mobile: max 800px de largura
  if (!mobileExists) {
    await image
      .clone()
      .resize({ width: Math.min(meta.width, 800), withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(mobilePath)
  }

  const desktopStat = fs.statSync(desktopPath)
  console.log(`✅ ${base}: desktop ${(desktopStat.size / 1024).toFixed(0)}KB`)
  converted++
}

console.log(`\nDone: ${converted} converted, ${skipped} skipped.`)
