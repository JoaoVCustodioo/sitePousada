# Spec: Otimização de Performance — Pousada Rosália

**Data:** 2026-04-10
**Status:** Aprovado
**Contexto:** SPA React/CRA com PageSpeed mobile 45/100, LCP 37.4s, TBT 2040ms. Meta: suportar Google Ads e SEO orgânico via Vercel.

---

## Objetivo

Elevar o PageSpeed Insights mobile de 45 para ≥85/100, reduzindo o LCP para abaixo de 2.5s e o TBT para abaixo de 200ms. O payload total deve cair de 7MB para abaixo de 2MB.

---

## Abordagem escolhida

**Migração CRA → Vite + otimizações manuais de imagem.**

Razões:
- CRA (react-scripts) está em manutenção reduzida e bloqueia configuração de webpack
- Vite oferece build 10-30x mais rápido, code splitting granular e PostCSS/Tailwind purge nativos
- Imagens pré-processadas offline (Sharp) evitam problemas com binários nativos no Windows
- Vercel já fornece Brotli/gzip e CDN automáticos — não é necessário Edge Config adicional

---

## Checkpoint de verificação

Após concluir a Seção 1 (migração Vite), verificar antes de prosseguir:
1. `npm run build` completa sem erros
2. `npm run preview` renderiza a Home corretamente no browser
3. `/Acomodacoes` carrega e renderiza corretamente

Só avançar para as seções de imagens e CSS após este checkpoint passar.

---

## Seção 1: Migração CRA → Vite

### Dependências

**Remover:**
- `react-scripts`
- `feather-icons` (duplica `lucide-react`)
- `@material-tailwind/react` (não tem imports em `src/` — já é dead code; remover diretamente)
- `@testing-library/jest-dom`, `@testing-library/react`, `@testing-library/user-event` — mover de `dependencies` para `devDependencies` (ou remover se não houver testes configurados para Vite). O runner `react-scripts test` não existirá mais após a migração. Configuração de testes com Vitest está fora do escopo desta sprint.

**Adicionar:**
- `vite`
- `@vitejs/plugin-react`
- `vite-plugin-critters` (CSS crítico inline — puro JS, sem binários nativos, mantido pelo time do Chrome)

### Arquivos modificados

| Arquivo | Ação |
|---------|------|
| `package.json` | Remove `react-scripts` e libs acima; adiciona Vite e plugins; atualiza scripts |
| `vite.config.js` | Criado — configura plugin React, critters e alias `@/` → `src/` |
| `index.html` | Movido de `public/` para raiz; adiciona `<script type="module" src="/src/main.jsx">`; substitui `%PUBLIC_URL%` por `/` ou string vazia |
| `src/index.js` | Renomeado para `src/main.jsx` |
| `.env` | Prefixo de variáveis muda de `REACT_APP_` para `VITE_` |
| `tailwind.config.js` | Atualizado `content` para `./src/**/*.{js,jsx,ts,tsx}` |
| `postcss.config.js` | Criado se ausente — `tailwindcss` + `autoprefixer` |

### index.html — tokens do CRA

O `public/index.html` do CRA contém tokens `%PUBLIC_URL%` (ex: `href="%PUBLIC_URL%/favicon.ico"`). O Vite não processa esses tokens — substituir todas as ocorrências por `/` ou string vazia antes de mover o arquivo para a raiz. Não fazer isso resulta em favicon e OG image quebrados em produção.

### Scripts npm

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

### Alias de paths

```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import critters from 'vite-plugin-critters'   // default export, não named
import path from 'path'
import { fileURLToPath } from 'url'

// __dirname não existe em ESM; usar import.meta.url
const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [react(), critters()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
  }
})
```

### Variáveis de ambiente — checklist obrigatório

A chave do Google Maps está em `.env` com prefixo `REACT_APP_`. Após a migração, o Vite não lança erro para variáveis com prefixo errado — elas silenciosamente retornam `undefined`.

Ações obrigatórias:
1. Renomear `REACT_APP_GOOGLE_MAPS_API_KEY` → `VITE_GOOGLE_MAPS_API_KEY` no arquivo `.env`
2. Atualizar todas as referências no código de `process.env.REACT_APP_*` para `import.meta.env.VITE_*`
3. Acessar o dashboard do Vercel → Settings → Environment Variables e atualizar o nome da variável lá também

### Script do booking widget (futuro)

Quando o fornecedor entregar o script embed, adicioná-lo no `index.html` raiz com `defer`:

```html
<script defer src="https://url-do-fornecedor.com/widget.js"></script>
```

---

## Seção 2: Otimização de Imagens

### Pipeline de conversão

Um script Node.js em `scripts/convert-images.js` usa `sharp` para:
1. Percorrer `src/assets/images/**/*.{jpg,jpeg,png,JPG,JPEG}` — o glob deve incluir extensões maiúsculas pois a build no Vercel roda em Linux (case-sensitive); usar flag `caseSensitiveMatch: false` no glob ou listar explicitamente todas as variantes de caixa
2. Gerar versão desktop: redimensionar para max 1200px largura, qualidade 80, formato WebP
3. Gerar versão mobile: redimensionar para max 800px largura, qualidade 75, formato WebP
4. Salvar ao lado do original com sufixo: `foto.jpg` → `foto-desktop.webp` + `foto-mobile.webp`

Rodar uma vez: `node scripts/convert-images.js`. Resultado commitado no repo.

O script deve ser **idempotente**: se o arquivo WebP de destino já existir, pular sem sobrescrever. Isso evita que uma segunda execução suje o working tree com arquivos idênticos re-gerados.

**Meta de tamanho:** ≤150KB por imagem WebP do hero.

### Padrão de markup — imagens below the fold (lazy)

Usar para todas as imagens que **não** aparecem no hero:

```jsx
<picture>
  <source
    srcSet={`${fotoMobileWebp} 800w, ${fotoDesktopWebp} 1200w`}
    sizes="(max-width: 768px) 100vw, 1200px"
    type="image/webp"
  />
  <img
    src={fotoOriginal}
    alt="Descrição da imagem"
    width={1200}
    height={800}
    loading="lazy"
  />
</picture>
```

### Padrão de markup — Hero (LCP, eager)

Usar **somente** para a primeira imagem do slideshow (`kombifachada`):

```jsx
<picture>
  <source
    srcSet={`${kombifachadaMobileWebp} 800w, ${kombifachadaDesktopWebp} 1200w`}
    sizes="(max-width: 768px) 100vw, 1200px"
    type="image/webp"
  />
  <img
    src={kombifachadaOriginal}
    alt="Fachada da Pousada Rosália"
    width={1200}
    height={800}
    loading="eager"
    fetchPriority="high"
  />
</picture>
```

As imagens 2 e 3 do hero (`parquinho`, `cafe`) usam o padrão lazy padrão acima.

### Preload das imagens do hero

O Vite adiciona hash nos nomes dos assets em produção, então **não usar paths estáticos no `index.html`**. Em vez disso, injetar os preloads via `useEffect` no componente Hero, usando as URLs resolvidas pelo Vite através dos imports:

```jsx
// src/Components/Hero/Hero.jsx
import kombifachadaDesktopWebp from '@/assets/images/kombifachada-desktop.webp'
import kombifachadaMobileWebp from '@/assets/images/kombifachada-mobile.webp'
import parquinhoDesktopWebp from '@/assets/images/parquinho-desktop.webp'
import parquinhoMobileWebp from '@/assets/images/parquinho-mobile.webp'
import cafeDesktopWebp from '@/assets/images/cafe-desktop.webp'
import cafeMobileWebp from '@/assets/images/cafe-mobile.webp'

useEffect(() => {
  const isMobile = window.innerWidth <= 768

  // Preload da primeira imagem com alta prioridade (LCP candidate)
  const link1 = Object.assign(document.createElement('link'), {
    rel: 'preload', as: 'image',
    href: isMobile ? kombifachadaMobileWebp : kombifachadaDesktopWebp,
    fetchPriority: 'high'
  })
  // Preload das demais com prioridade padrão
  const link2 = Object.assign(document.createElement('link'), {
    rel: 'preload', as: 'image',
    href: isMobile ? parquinhoMobileWebp : parquinhoDesktopWebp
  })
  const link3 = Object.assign(document.createElement('link'), {
    rel: 'preload', as: 'image',
    href: isMobile ? cafeMobileWebp : cafeDesktopWebp
  })
  document.head.append(link1, link2, link3)
  return () => { link1.remove(); link2.remove(); link3.remove() }
}, [])
```

Isso garante que o Vite resolva os paths com hash corretos em produção e que a versão mobile seja precarregada em dispositivos móveis.

### Regras gerais para todas as imagens

- `width` e `height` explícitos em todas as `<img>` — elimina CLS
- `loading="lazy"` em todas as imagens fora do hero (below the fold)
- Nenhuma imagem deve exceder 1200px de largura

---

## Seção 3: JavaScript

### Code splitting por rota

```jsx
// src/App.jsx
import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageContext'
import Home from './pages/Home/Home'

const Acomodacoes = React.lazy(() => import('./pages/Acomodacoes/Acomodacoes'))

const App = () => (
  <LanguageProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Suspense obrigatório — sem ele React lança erro ao navegar para a rota lazy */}
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

export default App
```

### Auditoria de dependências

| Lib | Diagnóstico | Ação |
|-----|------------|------|
| `@material-tailwind/react` | Sem imports em `src/` — dead code | Remover do `package.json` diretamente |
| `feather-icons` | Duplica `lucide-react` | Remover |
| `react-icons` | Tree-shaking OK no Vite | Manter — imports individuais já em uso |
| `aos` | ~14KB, aceito | Manter |
| `swiper` | ~60KB, aceito | Manter |

### Scripts externos

- `gtag.js` do Google Tag: manter `async` (já configurado)
- Booking widget futuro: usar `defer`
- Nenhum script externo deve usar `blocking` (sem `async`/`defer`)

---

## Seção 4: CSS

### Critical CSS inline

O plugin `vite-plugin-critters` (mantido pelo time do Chrome, zero dependências nativas) extrai o CSS above-the-fold e injeta inline no `<head>` durante o build. Isso elimina o render-blocking do CSS principal.

Não usar `vite-plugin-critical` — depende de Puppeteer (binários nativos, problemas no Windows, pouca manutenção desde 2022).

### Tailwind purge

Vite + Tailwind com PostCSS remove automaticamente classes não utilizadas no build de produção. Nenhuma ação extra além da configuração correta do `content` no `tailwind.config.js`.

### Minificação

O Vite minifica CSS automaticamente via esbuild em modo produção.

---

## Seção 5: Cache e Deploy (Vercel)

### vercel.json

Assume configuração padrão do Vite com `base: '/'`. Se `base` for alterado, ajustar o `source` correspondentemente.

```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

O Vite adiciona hash nos nomes dos assets de build (`main.a1b2c3.js`, `index.a4b5c6.css`), tornando o cache de 1 ano seguro.

### Brotli/gzip

Automático no Vercel — nenhuma configuração necessária.

### Payload alvo

| Métrica | Atual | Meta |
|---------|-------|------|
| LCP | 37.4s | < 2.5s |
| TBT | 2040ms | < 200ms |
| Payload total | 7MB | < 2MB |
| PageSpeed mobile | 45/100 | ≥ 85/100 |

---

## Fora do escopo

- Migração para Next.js (decisão futura, se necessário)
- Integração do booking widget (aguardando fornecedor)
- SEO on-page (meta tags, structured data) — sprint separado
- Configuração de testes com Vitest — sprint separado
- Testes automatizados de performance (Lighthouse CI)
