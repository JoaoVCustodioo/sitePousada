# Performance Optimization Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrar de CRA para Vite, otimizar imagens para WebP, adicionar code splitting e cache headers — elevando o PageSpeed mobile de 45 para ≥85/100 e o LCP de 37.4s para <2.5s.

**Architecture:** Substituir `react-scripts` por Vite com `@vitejs/plugin-react` e `vite-plugin-critters`. Imagens convertidas para WebP offline com Sharp (script idempotente). Hero com preload dinâmico via `useEffect`. Route `/Acomodacoes` lazy-loaded com `React.lazy`. Cache de 1 ano para assets com hash via `vercel.json`.

**Tech Stack:** React 18, Vite 5, Tailwind CSS 3, vite-plugin-critters, Sharp (Node.js), Vercel

**Spec:** `docs/superpowers/specs/2026-04-10-performance-design.md`

---

## File Map

| Arquivo | Status | Responsabilidade |
|---------|--------|-----------------|
| `package.json` | Modificar | Scripts, deps |
| `vite.config.js` | Criar | Build config, alias, critters |
| `postcss.config.js` | Criar | Tailwind + autoprefixer |
| `index.html` | Criar (mover de `public/`) | Entry HTML, sem `%PUBLIC_URL%` |
| `vercel.json` | Criar | Cache headers |
| `scripts/convert-images.mjs` | Criar | Conversão WebP com Sharp |
| `src/main.jsx` | Criar (renomear de `src/index.js`) | Entry point React |
| `src/App.jsx` | Modificar | React.lazy + Suspense para Acomodacoes |
| `.env` | Modificar | Prefixo VITE_ |
| `src/Components/Location/Location.jsx` | Modificar | `import.meta.env.VITE_*` |
| `src/Components/Hero/Hero.jsx` | Modificar | WebP <picture>, preloads, eager |
| `src/Components/Gallery/Gallery.jsx` | Modificar | WebP em allPhotos, <picture> no grid |
| `src/Components/RoomsPreview/RoomsPreview.jsx` | Modificar | WebP <picture> lazy |
| `src/Components/Rooms/Rooms.jsx` | Modificar | WebP para backgroundImage + imports WebP |
| `src/Components/RoomSwiper/RoomSwiper.jsx` | Modificar | width/height nos <img> |

---

## Task 1: Instalar Vite e atualizar package.json

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Remover react-scripts e deps mortas**

```bash
npm uninstall react-scripts @material-tailwind/react feather-icons
```

- [ ] **Step 2: Instalar Vite e plugins**

Pinamos `vite-plugin-critters` na versão `0.0.6` — versões mais novas podem mudar o estilo de export, causando falha silenciosa no build:

```bash
npm install --save-dev vite @vitejs/plugin-react vite-plugin-critters@0.0.6
```

- [ ] **Step 3: Instalar sharp (para o script de conversão)**

```bash
npm install --save-dev sharp glob
```

- [ ] **Step 4: Mover @testing-library/* para devDependencies**

Editar `package.json` manualmente: mover as três entradas de `@testing-library/*` e `web-vitals` da seção `dependencies` para `devDependencies`.

- [ ] **Step 5: Atualizar scripts no package.json**

Substituir a seção `"scripts"` por:
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

- [ ] **Step 6: Verificar package.json**

Confirmar que não existe mais `react-scripts`, `@material-tailwind/react`, `feather-icons` em `dependencies`. Verificar que `vite`, `@vitejs/plugin-react`, `vite-plugin-critters` estão em `devDependencies`.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: migrate from CRA to Vite, remove dead dependencies"
```

---

## Task 2: Criar vite.config.js e postcss.config.js

**Files:**
- Create: `vite.config.js`
- Create: `postcss.config.js`

- [ ] **Step 1: Criar vite.config.js**

Criar o arquivo `vite.config.js` na raiz do projeto:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import critters from 'vite-plugin-critters'
import path from 'path'
import { fileURLToPath } from 'url'

// __dirname não existe em ESM quando Vite processa este arquivo com import syntax
const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    critters(), // injeta critical CSS inline no <head> durante build
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

- [ ] **Step 2: Criar postcss.config.js**

Criar o arquivo `postcss.config.js` na raiz (formato CommonJS — package.json não tem `"type": "module"`):

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 3: Verificar critters após o build (Task 7)**

Após o build de produção (Task 7), verificar que o `dist/index.html` contém CSS inline no `<head>`:

```bash
node -e "const h=require('fs').readFileSync('dist/index.html','utf8'); console.log(h.includes('<style>') ? '✅ critters OK' : '❌ critters não rodou — verificar import em vite.config.js');"
```

Se retornar `❌`, o import de `vite-plugin-critters` está incorreto. Verificar que o arquivo usa `import critters from 'vite-plugin-critters'` (default, não named).

- [ ] **Step 4: Commit**

```bash
git add vite.config.js postcss.config.js
git commit -m "chore: add vite.config.js and postcss.config.js"
```

---

## Task 3: Migrar index.html para a raiz

**Files:**
- Create: `index.html` (na raiz)
- Manter: `public/index.html` pode ser deletado após confirmação do build

O Vite exige que o `index.html` esteja na **raiz do projeto**, não em `public/`. O CRA colocava em `public/` e injetava tokens como `%PUBLIC_URL%` que o Vite não reconhece.

- [ ] **Step 1: Criar index.html na raiz**

Criar `index.html` na raiz com o conteúdo abaixo. As diferenças em relação ao `public/index.html` original são: (a) `%PUBLIC_URL%` substituído por string vazia, (b) `<script type="module">` adicionado antes de `</body>`:

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/logo-pousada.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#846D54" />

    <!-- SEO -->
    <title>Pousada Rosália — Hospedagem a 1km do Beto Carrero World | Penha/SC</title>
    <meta name="description" content="Pousada familiar em Penha/SC, a 1km do Beto Carrero World. Café da manhã incluso, transporte gratuito ao parque e quartos para famílias. Fale conosco pelo WhatsApp!" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://pousadarosalia.com.br" />

    <!-- Open Graph -->
    <meta property="og:title" content="Pousada Rosália — Sua casa no litoral catarinense" />
    <meta property="og:description" content="Pousada familiar em Penha/SC, a 1km do Beto Carrero World. Café da manhã incluso, transporte gratuito e quartos para famílias." />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:url" content="https://pousadarosalia.com.br" />
    <meta property="og:image" content="/logo-pousada.png" />
    <meta property="og:site_name" content="Pousada Rosália" />

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-GMY02QPWC6"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-GMY02QPWC6');
    </script>

    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      "name": "Pousada Rosália",
      "description": "Pousada familiar em Penha/SC, a 1km do Beto Carrero World",
      "url": "https://pousadarosalia.com.br",
      "telephone": "+554733451821",
      "email": "pousadarosalia@hotmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Rua Inácio Francisco de Souza, 208",
        "addressLocality": "Penha",
        "addressRegion": "SC",
        "postalCode": "88385-000",
        "addressCountry": "BR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-26.786944",
        "longitude": "-48.611111"
      },
      "amenityFeature": [
        {"@type": "LocationFeatureSpecification", "name": "Wi-Fi Gratuito"},
        {"@type": "LocationFeatureSpecification", "name": "Estacionamento Gratuito"},
        {"@type": "LocationFeatureSpecification", "name": "Café da Manhã Incluso"},
        {"@type": "LocationFeatureSpecification", "name": "Transporte para Beto Carrero"}
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "200"
      }
    }
    </script>
  </head>

  <body>
    <noscript>Você precisa habilitar o JavaScript para visualizar este site.</noscript>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Remover public/index.html via git**

Usar `git rm` (não `rm`) para que a deleção seja staged automaticamente:

```bash
git rm public/index.html
```

O arquivo `public/logo-pousada.png` e `public/manifest.json` devem permanecer em `public/` — o Vite copia os arquivos de `public/` para a raiz do output automaticamente.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "chore: migrate index.html to root for Vite, remove %PUBLIC_URL% tokens"
```

---

## Task 4: Criar src/main.jsx (renomear entry point)

**Files:**
- Create: `src/main.jsx`
- Delete: `src/index.js`

- [ ] **Step 1: Criar src/main.jsx**

Criar `src/main.jsx` com o conteúdo exato abaixo (sem mudanças de lógica, apenas renomeação):

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

- [ ] **Step 2: Deletar src/index.js**

```bash
rm src/index.js
```

- [ ] **Step 3: Commit**

```bash
git add src/main.jsx src/index.js
git commit -m "chore: rename entry point to main.jsx for Vite"
```

---

## Task 5: Atualizar App.jsx com React.lazy

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Substituir o conteúdo de src/App.jsx**

```jsx
import { useEffect, Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { LanguageProvider } from './i18n/LanguageContext'
import Home from './pages/Home/Home'

// Acomodacoes só é baixada quando o usuário navegar para lá
const Acomodacoes = lazy(() => import('./pages/Acomodacoes/Acomodacoes'))

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: 'ease-out-cubic',
    })
  }, [])

  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Suspense obrigatório — sem ele React lança erro ao navegar para rota lazy */}
        <Route
          path="/Acomodacoes"
          element={
            <Suspense fallback={null}>
              <Acomodacoes />
            </Suspense>
          }
        />
        <Route path="/Home" element={<Navigate to="/" replace />} />
      </Routes>
    </LanguageProvider>
  )
}

export default App
```

- [ ] **Step 2: Commit**

```bash
git add src/App.jsx
git commit -m "feat: add React.lazy code splitting for Acomodacoes route"
```

---

## Task 6: Corrigir variáveis de ambiente

**Files:**
- Modify: `.env`
- Modify: `src/Components/Location/Location.jsx`

O Vite usa o prefixo `VITE_` em vez de `REACT_APP_`. Variáveis com prefixo errado retornam `undefined` silenciosamente.

- [ ] **Step 1: Atualizar .env**

Abrir `.env` e renomear:
```
REACT_APP_GOOGLE_MAPS_API_KEY=<valor>
```
para:
```
VITE_GOOGLE_MAPS_API_KEY=<valor>
```

- [ ] **Step 2: Atualizar Location.jsx linha 32**

Localizar em `src/Components/Location/Location.jsx` a ocorrência de `process.env.REACT_APP_GOOGLE_MAPS_API_KEY` e substituir por `import.meta.env.VITE_GOOGLE_MAPS_API_KEY`.

A linha ficará:
```jsx
src={`https://www.google.com/maps/embed/v1/place?q=place_id:ChIJmYV7L7HR2JQRBFMaw9-GScg&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`}
```

- [ ] **Step 3: Atualizar Vercel dashboard**

**AÇÃO MANUAL NECESSÁRIA:** Acessar dashboard do Vercel → projeto → Settings → Environment Variables → renomear `REACT_APP_GOOGLE_MAPS_API_KEY` para `VITE_GOOGLE_MAPS_API_KEY`. Sem isso, o mapa ficará quebrado em produção mesmo com o código correto.

- [ ] **Step 4: Commit**

```bash
git add .env src/Components/Location/Location.jsx
git commit -m "fix: migrate env var prefix from REACT_APP_ to VITE_"
```

---

## Task 7: CHECKPOINT — Verificar build Vite

**Antes de prosseguir para imagens e CSS, verificar que o build funciona.**

- [ ] **Step 1: Instalar dependências**

```bash
npm install
```

- [ ] **Step 2: Testar build de produção**

```bash
npm run build
```

Esperado: build completa sem erros. Output em `dist/`.

- [ ] **Step 3: Testar preview**

```bash
npm run preview
```

Abrir `http://localhost:4173` no browser. Verificar:
- Home renderiza corretamente
- Navegação para `/Acomodacoes` funciona
- Mapa do Google aparece (precisa da variável .env)
- Console sem erros críticos

**Se o build falhar:** investigar erros antes de continuar. Problemas comuns:
- Imports usando `process.env.*` não migrados → substituir por `import.meta.env.VITE_*`
- Paths absolutos com `%PUBLIC_URL%` restantes
- Dependências não instaladas

- [ ] **Step 4: Commit (se necessário)**

Se houver fixes adicionais durante o checkpoint, commitá-los antes de prosseguir.

---

## Task 8: Criar e rodar script de conversão de imagens

**Files:**
- Create: `scripts/convert-images.mjs`

- [ ] **Step 1: Criar scripts/convert-images.mjs**

O arquivo usa extensão `.mjs` para suportar `import` ESM e `top-level await` sem alterar `package.json`.

```js
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
```

- [ ] **Step 2: Rodar o script**

```bash
node scripts/convert-images.mjs
```

Esperado: lista de imagens convertidas com tamanho em KB. Meta: hero images ≤150KB cada.

- [ ] **Step 3: Verificar tamanhos das imagens hero (compatível com Windows)**

```bash
node -e "const fs=require('fs'); ['kombifachada','parquinho','cafe'].forEach(n => { const p='src/assets/images/'+n+'-desktop.webp'; const kb=(fs.statSync(p).size/1024).toFixed(0); console.log(p, kb+'KB'); })"
```

Se alguma exceder 150KB: deletar os arquivos gerados (`del src\assets\images\*-desktop.webp` no PowerShell ou `rm src/assets/images/*-desktop.webp` no Git Bash), editar o script reduzindo `quality` para 70, e re-rodar.

- [ ] **Step 4: Commit**

```bash
git add scripts/convert-images.mjs src/assets/images/
git commit -m "feat: add Sharp image conversion script + WebP assets"
```

---

## Task 9: Atualizar Hero.jsx — WebP + preload + eager

**Files:**
- Modify: `src/Components/Hero/Hero.jsx`

O Hero tem 3 imagens em slideshow. A primeira (`kombifachada`) é o LCP candidate — deve ser `loading="eager"` com `fetchPriority="high"`. As outras duas são `loading="lazy"`. Todas recebem preload via `useEffect`.

- [ ] **Step 1: Substituir imports de imagem no topo do Hero.jsx**

Localizar as 3 linhas de import originais:
```js
import Kombi from "../../assets/images/kombifachada.jpg";
import Parquinho from "../../assets/images/parquinho.JPG";
import Cafe from "../../assets/images/cafe.jpg";
```

Substituir por:
```js
// Originais (fallback para browsers sem suporte WebP)
import KombiOriginal from '../../assets/images/kombifachada.jpg'
import ParquinhoOriginal from '../../assets/images/parquinho.JPG'
import CafeOriginal from '../../assets/images/cafe.jpg'

// WebP desktop (max 1200px)
import KombiDesktopWebp from '../../assets/images/kombifachada-desktop.webp'
import ParquinhoDesktopWebp from '../../assets/images/parquinho-desktop.webp'
import CafeDesktopWebp from '../../assets/images/cafe-desktop.webp'

// WebP mobile (max 800px)
import KombiMobileWebp from '../../assets/images/kombifachada-mobile.webp'
import ParquinhoMobileWebp from '../../assets/images/parquinho-mobile.webp'
import CafeMobileWebp from '../../assets/images/cafe-mobile.webp'
```

- [ ] **Step 2: Atualizar slideImages para usar originais como fallback**

Localizar:
```js
const slideImages = [Kombi, Parquinho, Cafe];
```

Substituir por:
```js
const slideImages = [
  { original: KombiOriginal, desktopWebp: KombiDesktopWebp, mobileWebp: KombiMobileWebp },
  { original: ParquinhoOriginal, desktopWebp: ParquinhoDesktopWebp, mobileWebp: ParquinhoMobileWebp },
  { original: CafeOriginal, desktopWebp: CafeDesktopWebp, mobileWebp: CafeMobileWebp },
]
```

- [ ] **Step 3: Adicionar useEffect de preload**

Adicionar logo após a declaração das refs existentes (após `const timerRef = useRef(null)`):

```js
// Preload das imagens do hero com URLs resolvidas pelo Vite (com hash de produção)
useEffect(() => {
  const isMobile = window.innerWidth <= 768

  const link1 = Object.assign(document.createElement('link'), {
    rel: 'preload', as: 'image',
    href: isMobile ? KombiMobileWebp : KombiDesktopWebp,
    fetchPriority: 'high',
  })
  const link2 = Object.assign(document.createElement('link'), {
    rel: 'preload', as: 'image',
    href: isMobile ? ParquinhoMobileWebp : ParquinhoDesktopWebp,
  })
  const link3 = Object.assign(document.createElement('link'), {
    rel: 'preload', as: 'image',
    href: isMobile ? CafeMobileWebp : CafeDesktopWebp,
  })
  document.head.append(link1, link2, link3)
  return () => { link1.remove(); link2.remove(); link3.remove() }
}, [])
```

- [ ] **Step 4: Atualizar o JSX de renderização das slides**

Localizar o bloco que renderiza cada slide:
```jsx
<img
  src={slideImages[index]}
  alt={slide.title}
  className={`...`}
/>
```

Substituir por (atenção ao `loading` e `fetchPriority` diferenciados para o índice 0):

**IMPORTANTE:** O `className` da `<img>` deve preservar `${imagePositions[index]}` — esse array controla o posicionamento (`object-center`, `object-[center_top]`, etc.) de cada foto no slideshow. Omiti-lo quebra o Ken Burns effect e o alinhamento visual das imagens.

```jsx
<picture>
  <source
    srcSet={`${slideImages[index].mobileWebp} 800w, ${slideImages[index].desktopWebp} 1200w`}
    sizes="(max-width: 768px) 100vw, 1200px"
    type="image/webp"
  />
  <img
    src={slideImages[index].original}
    alt={slide.title}
    width={1200}
    height={800}
    loading={index === 0 ? 'eager' : 'lazy'}
    fetchPriority={index === 0 ? 'high' : 'auto'}
    className={`w-full h-full object-cover ${imagePositions[index]} transition-transform duration-[12000ms] ease-out ${currentIndex === index ? "scale-105" : "scale-100"}`}
  />
</picture>
```

- [ ] **Step 5: Verificar no browser (npm run dev)**

```bash
npm run dev
```

Abrir DevTools → Network → filtrar por "Image". Verificar que `kombifachada-desktop.webp` (ou mobile) aparece como o primeiro recurso carregado com prioridade `Highest`.

- [ ] **Step 6: Commit**

```bash
git add src/Components/Hero/Hero.jsx
git commit -m "feat: optimize hero images with WebP, eager loading, and preloads"
```

---

## Task 10: Atualizar Gallery.jsx — WebP no grid

**Files:**
- Modify: `src/Components/Gallery/Gallery.jsx`

A Gallery tem 19 imagens. O grid usa `loading="lazy"` (já correto). O lightbox pode usar o WebP desktop (qualidade suficiente para visualização fullscreen).

- [ ] **Step 1: Adicionar imports WebP desktop para cada imagem**

Após os imports originais existentes, adicionar os imports WebP desktop. Exemplo (fazer para todas as 19 imagens):

```js
// WebP desktop (lazy, below the fold)
import kombiWebp from '../../assets/images/kombi-desktop.webp'
import cafeWebp from '../../assets/images/cafe-desktop.webp'
import cafe1Webp from '../../assets/images/cafe1-desktop.webp'
import cafe2Webp from '../../assets/images/cafe2-desktop.webp'
import cafe3Webp from '../../assets/images/cafe3-desktop.webp'
import parquinhoWebp from '../../assets/images/parquinho-desktop.webp'
import parquinho1Webp from '../../assets/images/parquinho1-desktop.webp'
import parquinho2Webp from '../../assets/images/parquinho2-desktop.webp'
import parquinho3Webp from '../../assets/images/parquinho3-desktop.webp'
import fotoQuartoMainWebp from '../../assets/images/fotoNossosQuartosMain-desktop.webp'
import acomodacoesMainWebp from '../../assets/images/acomodacoesMain-desktop.webp'
import duploWebp from '../../assets/images/Duplo/duploFoto-desktop.webp'
import duplo1Webp from '../../assets/images/Duplo/duploFoto1-desktop.webp'
import triploWebp from '../../assets/images/Triplo/triplo-desktop.webp'
import quadruploWebp from '../../assets/images/Quadruplo/quadruplo-desktop.webp'
import quadruplo1Webp from '../../assets/images/Quadruplo/quadruplo1-desktop.webp'
import triploVarandaWebp from '../../assets/images/TriploVaranda/triploVaranda-desktop.webp'
import quadruploVarandaWebp from '../../assets/images/QuadruploVaranda/quadruploVaranda-desktop.webp'
import quintuploWebp from '../../assets/images/QuintuploVaranda/quintuplo-desktop.webp'
```

- [ ] **Step 2: Atualizar allPhotos para incluir srcWebp**

Adicionar campo `srcWebp` a cada entrada de `allPhotos`:

```js
const allPhotos = [
  { src: fotoQuartoMain, srcWebp: fotoQuartoMainWebp, alt: "Pousada overview", category: "areas_comuns" },
  { src: acomodacoesMain, srcWebp: acomodacoesMainWebp, alt: "Acomodações details", category: "areas_comuns" },
  { src: kombi, srcWebp: kombiWebp, alt: "Madagaskombi", category: "areas_comuns" },
  { src: cafe, srcWebp: cafeWebp, alt: "Breakfast", category: "cafe_da_manha" },
  { src: cafe1, srcWebp: cafe1Webp, alt: "Breakfast details", category: "cafe_da_manha" },
  { src: cafe2, srcWebp: cafe2Webp, alt: "Breakfast table", category: "cafe_da_manha" },
  { src: cafe3, srcWebp: cafe3Webp, alt: "Breakfast items", category: "cafe_da_manha" },
  { src: parquinho, srcWebp: parquinhoWebp, alt: "Playground overview", category: "areas_comuns" },
  { src: parquinho1, srcWebp: parquinho1Webp, alt: "Playground slide", category: "areas_comuns" },
  { src: parquinho2, srcWebp: parquinho2Webp, alt: "Playground area", category: "areas_comuns" },
  { src: parquinho3, srcWebp: parquinho3Webp, alt: "Playground details", category: "areas_comuns" },
  { src: duplo, srcWebp: duploWebp, alt: "Double Room", category: "quartos" },
  { src: duplo1, srcWebp: duplo1Webp, alt: "Double Room detail", category: "quartos" },
  { src: triplo, srcWebp: triploWebp, alt: "Triple Room", category: "quartos" },
  { src: quadruplo, srcWebp: quadruploWebp, alt: "Quadruple Room", category: "quartos" },
  { src: quadruplo1, srcWebp: quadruplo1Webp, alt: "Quadruple Room detail", category: "quartos" },
  { src: triploVaranda, srcWebp: triploVarandaWebp, alt: "Triple Room w/ Balcony", category: "quartos" },
  { src: quadruploVaranda, srcWebp: quadruploVarandaWebp, alt: "Quadruple Room w/ Balcony", category: "quartos" },
  { src: quintuplo, srcWebp: quintuploWebp, alt: "Quintuple Room w/ Balcony", category: "quartos" },
]
```

- [ ] **Step 3: Atualizar o JSX do grid para usar <picture>**

Localizar o `<img>` dentro do `.map()` do grid:
```jsx
<img
  src={photo.src}
  alt={photo.alt}
  className={`...`}
  loading="lazy"
/>
```

Substituir por:
```jsx
<picture>
  <source srcSet={photo.srcWebp} type="image/webp" />
  <img
    src={photo.src}
    alt={photo.alt}
    width={800}
    height={600}
    loading="lazy"
    className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
      index === 0 ? "h-full min-h-[300px] md:min-h-[400px]" : "aspect-square h-full"
    }`}
  />
</picture>
```

- [ ] **Step 4: Atualizar o lightbox para usar WebP**

O lightbox (dentro do bloco `{lightboxIndex !== null && (...)}`) renderiza uma `<img>` com `src={filteredPhotos[lightboxIndex]?.src}`. Atualizar para usar WebP:

Localizar:
```jsx
<img
  src={filteredPhotos[lightboxIndex]?.src}
  alt={filteredPhotos[lightboxIndex]?.alt}
  className="max-w-[90vw] max-h-[85vh] object-contain rounded-sm shadow-2xl"
  onClick={(e) => e.stopPropagation()}
/>
```

Substituir por:
```jsx
<picture>
  <source srcSet={filteredPhotos[lightboxIndex]?.srcWebp} type="image/webp" />
  <img
    src={filteredPhotos[lightboxIndex]?.src}
    alt={filteredPhotos[lightboxIndex]?.alt}
    className="max-w-[90vw] max-h-[85vh] object-contain rounded-sm shadow-2xl"
    onClick={(e) => e.stopPropagation()}
  />
</picture>
```

- [ ] **Step 5: Commit**

```bash
git add src/Components/Gallery/Gallery.jsx
git commit -m "feat: add WebP support to Gallery grid images and lightbox"
```

---

## Task 11: Atualizar RoomsPreview.jsx — WebP

**Files:**
- Modify: `src/Components/RoomsPreview/RoomsPreview.jsx`

- [ ] **Step 1: Adicionar imports WebP**

Após os imports originais:
```js
import duploWebp from '../../assets/images/Duplo/duploFoto-desktop.webp'
import quadruploWebp from '../../assets/images/Quadruplo/quadruplo-desktop.webp'
import quintuploWebp from '../../assets/images/QuintuploVaranda/quintuplo-desktop.webp'
```

- [ ] **Step 2: Atualizar roomImages**

```js
const roomImages = [
  { original: duplo, webp: duploWebp },
  { original: quadruplo, webp: quadruploWebp },
  { original: quintuplo, webp: quintuploWebp },
]
```

- [ ] **Step 3: Atualizar o JSX da imagem do quarto**

Localizar o `<img>` dentro do `.map()` de rooms:
```jsx
<img
  src={roomImages[index]}
  alt={room.name}
  className="w-full h-full object-cover..."
  loading="lazy"
/>
```

Substituir por:
```jsx
<picture>
  <source srcSet={roomImages[index].webp} type="image/webp" />
  <img
    src={roomImages[index].original}
    alt={room.name}
    width={800}
    height={576}
    loading="lazy"
    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
  />
</picture>
```

- [ ] **Step 4: Commit**

```bash
git add src/Components/RoomsPreview/RoomsPreview.jsx
git commit -m "feat: add WebP support to RoomsPreview card images"
```

---

## Task 12: Atualizar Rooms.jsx e RoomSwiper.jsx

**Files:**
- Modify: `src/Components/Rooms/Rooms.jsx`
- Modify: `src/Components/RoomSwiper/RoomSwiper.jsx`

O Rooms.jsx usa `acomodacoesMain` como CSS `backgroundImage` e passa arrays de imagens para RoomSwiper. A abordagem: passar as versões WebP diretamente como `src` no RoomSwiper (WebP é suportado por >97% dos browsers alvo), e usar WebP no CSS background.

- [ ] **Step 1: Adicionar imports WebP em Rooms.jsx**

Após os imports originais, adicionar:
```js
import acomodacoesMainWebp from '../../assets/images/acomodacoesMain-desktop.webp'

// Duplo WebP
import duploWebp from '../../assets/images/Duplo/duploFoto-desktop.webp'
import duplo1Webp from '../../assets/images/Duplo/duploFoto1-desktop.webp'
import duplo2Webp from '../../assets/images/Duplo/duploFoto2-desktop.webp'

// Triplo WebP
import triploWebp from '../../assets/images/Triplo/triplo-desktop.webp'
import triplo1Webp from '../../assets/images/Triplo/triplo1-desktop.webp'
import triplo2Webp from '../../assets/images/Triplo/triplo2-desktop.webp'

// Quadruplo WebP
import quadruploWebp from '../../assets/images/Quadruplo/quadruplo-desktop.webp'
import quadruplo1Webp from '../../assets/images/Quadruplo/quadruplo1-desktop.webp'
import quadruplo2Webp from '../../assets/images/Quadruplo/quadruplo2-desktop.webp'
import quadruplo4Webp from '../../assets/images/Quadruplo/quadruplo4-desktop.webp'
import quadruplo5Webp from '../../assets/images/Quadruplo/quadruplo5-desktop.webp'

// Triplo Varanda WebP
import triploVarandaWebp from '../../assets/images/TriploVaranda/triploVaranda-desktop.webp'
import triploVaranda1Webp from '../../assets/images/TriploVaranda/triploVaranda1-desktop.webp'
import triploVaranda2Webp from '../../assets/images/TriploVaranda/triploVaranda2-desktop.webp'
import triploVaranda3Webp from '../../assets/images/TriploVaranda/triplovaranda3-desktop.webp'

// Quadruplo Varanda WebP
import quadruploVarandaWebp from '../../assets/images/QuadruploVaranda/quadruploVaranda-desktop.webp'
import quadruploVaranda1Webp from '../../assets/images/QuadruploVaranda/quadruploVaranda1-desktop.webp'
import quadruploVaranda2Webp from '../../assets/images/QuadruploVaranda/quadruploVaranda2-desktop.webp'

// Quintuplo Varanda WebP
import quintuploWebp from '../../assets/images/QuintuploVaranda/quintuplo-desktop.webp'
import quintuplo1Webp from '../../assets/images/QuintuploVaranda/quintuplo1-desktop.webp'
import quintuplo2Webp from '../../assets/images/QuintuploVaranda/quintuplo2-desktop.webp'
import quintuplo3Webp from '../../assets/images/QuintuploVaranda/quintuplo3-desktop.webp'
```

- [ ] **Step 2: Atualizar roomPhotos para usar WebP**

```js
const roomPhotos = [
  [duploWebp, duplo1Webp, duplo2Webp],
  [triploWebp, triplo1Webp, triplo2Webp],
  [triploVarandaWebp, triploVaranda1Webp, triploVaranda2Webp, triploVaranda3Webp],
  [quadruploWebp, quadruplo1Webp, quadruplo2Webp, quadruplo4Webp, quadruplo5Webp],
  [quadruploVarandaWebp, quadruploVaranda1Webp, quadruploVaranda2Webp],
  [quintuploWebp, quintuplo1Webp, quintuplo2Webp, quintuplo3Webp],
]
```

- [ ] **Step 3: Atualizar backgroundImage no hero do Rooms para WebP**

Localizar:
```js
backgroundImage: `url(${acomodacoesMain})`,
```

Substituir por:
```js
backgroundImage: `url(${acomodacoesMainWebp})`,
```

- [ ] **Step 4: Adicionar width/height no RoomSwiper.jsx**

Abrir `src/Components/RoomSwiper/RoomSwiper.jsx`. Localizar o `<img>` dentro do `.map()`:
```jsx
<img src={slide} alt={`Foto ${index + 1}`} className="w-full h-full object-cover object-center" loading="lazy" />
```

Adicionar `width` e `height`. As fotos dos quartos são JPEGs horizontais — usar `800×576` (proporção ~4:3, consistente com `RoomsPreview`). Isso elimina CLS sem distorcer a imagem, pois o CSS `object-cover` preenche o container independente da proporção declarada:
```jsx
<img
  src={slide}
  alt={`Foto ${index + 1}`}
  width={800}
  height={576}
  className="w-full h-full object-cover object-center"
  loading="lazy"
/>
```

- [ ] **Step 5: Commit**

```bash
git add src/Components/Rooms/Rooms.jsx src/Components/RoomSwiper/RoomSwiper.jsx
git commit -m "feat: use WebP images in Rooms page and RoomSwiper"
```

---

## Task 13: Criar vercel.json

**Files:**
- Create: `vercel.json`

- [ ] **Step 1: Criar vercel.json na raiz**

```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

O Vite emite assets com hash no nome (`assets/main.a1b2c3.js`, `assets/Hero.d4e5f6.webp`), tornando o cache de 1 ano seguro. Este arquivo assume `base: '/'` (padrão Vite).

- [ ] **Step 2: Commit**

```bash
git add vercel.json
git commit -m "feat: add vercel.json with 1-year cache headers for hashed assets"
```

---

## Task 14: Build final e verificação

- [ ] **Step 1: Build de produção**

```bash
npm run build
```

Esperado: sem erros. Verificar output em `dist/`:
- Pasta `dist/assets/` contém arquivos com hash
- `dist/index.html` contém CSS inline no `<head>` (critters funcionando)

- [ ] **Step 2: Preview e inspeção**

```bash
npm run preview
```

Abrir `http://localhost:4173`. No DevTools → Network:
- Tab "Img": verificar que as requests são para `.webp`
- Tab "JS": verificar que `/Acomodacoes` aparece como chunk separado só ao navegar
- Sem erros no console

- [ ] **Step 3: Verificar tamanho total do bundle**

```bash
npx vite-bundle-visualizer
```

Ou analisar output do `npm run build` (Vite exibe tamanhos). Alvo: JS principal < 300KB gzipped.

- [ ] **Step 4: Push e deploy no Vercel**

```bash
git push origin master
```

Aguardar o deploy automático no Vercel. Após deploy, verificar que o Vercel atualizou a variável de ambiente `VITE_GOOGLE_MAPS_API_KEY` (Task 6 Step 3 — ação manual).

- [ ] **Step 5: Rodar PageSpeed Insights**

Acessar https://pagespeed.web.dev/ com a URL de produção. Metas:
- LCP < 2.5s
- TBT < 200ms
- PageSpeed mobile ≥ 85/100

Se alguma meta não for atingida, verificar o relatório do PageSpeed para oportunidades restantes (geralmente imagens que ficaram de fora ou scripts de terceiros).

---

## Referência rápida de variáveis de ambiente

| Variável antiga (CRA) | Variável nova (Vite) | Usado em |
|----------------------|---------------------|---------|
| `process.env.REACT_APP_GOOGLE_MAPS_API_KEY` | `import.meta.env.VITE_GOOGLE_MAPS_API_KEY` | `Location.jsx:32` |

---

## Notas de manutenção futura

- **Booking widget:** Quando receber o script do fornecedor, adicionar em `index.html` antes de `</body>` com `defer`: `<script defer src="URL_DO_FORNECEDOR"></script>`
- **Novas imagens:** Rodar `node scripts/convert-images.mjs` após adicionar novas imagens para gerar WebP. Commitar os arquivos `.webp` gerados.
- **Variáveis de ambiente:** Qualquer nova variável de ambiente exposta ao frontend deve usar prefixo `VITE_` e ser acessada via `import.meta.env.VITE_*`
