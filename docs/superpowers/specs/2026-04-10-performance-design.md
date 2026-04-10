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

## Seção 1: Migração CRA → Vite

### Dependências

**Remover:**
- `react-scripts`

**Adicionar:**
- `vite`
- `@vitejs/plugin-react`
- `vite-plugin-critical` (CSS crítico inline)

### Arquivos modificados

| Arquivo | Ação |
|---------|------|
| `package.json` | Remove `react-scripts`, adiciona Vite e plugins; atualiza scripts |
| `vite.config.js` | Criado — configura plugin React e alias `@/` → `src/` |
| `index.html` | Movido de `public/` para raiz; adiciona `<script type="module" src="/src/main.jsx">` |
| `src/index.js` | Renomeado para `src/main.jsx` |
| `.env` | Prefixo de variáveis muda de `REACT_APP_` para `VITE_` |
| `tailwind.config.js` | Atualizado `content` para `./src/**/*.{js,jsx,ts,tsx}` |
| `postcss.config.js` | Criado se ausente — `tailwindcss` + `autoprefixer` |

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
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
  }
})
```

### Script do booking widget (futuro)

Quando o fornecedor entregar o script embed, adicioná-lo no `index.html` raiz com `defer`:

```html
<script defer src="https://url-do-fornecedor.com/widget.js"></script>
```

---

## Seção 2: Otimização de Imagens

### Pipeline de conversão

Um script Node.js em `scripts/convert-images.js` usa `sharp` para:
1. Percorrer `src/assets/images/**/*.{jpg,jpeg,png,JPG}`
2. Gerar versão desktop: redimensionar para max 1200px largura, qualidade 80, formato WebP
3. Gerar versão mobile: redimensionar para max 800px largura, qualidade 75, formato WebP
4. Salvar ao lado do original com sufixo: `foto.jpg` → `foto-desktop.webp` + `foto-mobile.webp`

Rodar uma vez: `node scripts/convert-images.js`. Resultado commitado no repo.

**Meta de tamanho:** ≤150KB por imagem WebP do hero.

### Padrão de markup

Substituir todos os `<img src={foto}>` por `<picture>` com srcset:

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

### Hero — tratamento especial (LCP)

A primeira imagem do hero (`kombifachada`) é o LCP candidate:

- `loading="eager"` (sem lazy)
- `fetchpriority="high"`
- `<link rel="preload">` no `index.html` para as 3 imagens do hero (a primeira com `fetchpriority="high"`)

```html
<!-- index.html -->
<link rel="preload" as="image" href="/src/assets/images/kombifachada-desktop.webp" fetchpriority="high" />
<link rel="preload" as="image" href="/src/assets/images/parquinho-desktop.webp" />
<link rel="preload" as="image" href="/src/assets/images/cafe-desktop.webp" />
```

### Regras gerais para todas as imagens

- `width` e `height` explícitos em todas as `<img>` — elimina CLS
- `loading="lazy"` em todas as imagens fora do hero (below the fold)
- Nenhuma imagem importada deve exceder 1200px de largura

---

## Seção 3: JavaScript

### Code splitting por rota

```jsx
// src/App.jsx
import React, { Suspense } from 'react'
import Home from './pages/Home/Home'

const Acomodacoes = React.lazy(() => import('./pages/Acomodacoes/Acomodacoes'))

// Home carrega normalmente (rota principal)
// Acomodacoes só é baixada quando o usuário navegar para lá
```

### Auditoria de dependências

| Lib | Diagnóstico | Ação |
|-----|------------|------|
| `@material-tailwind/react` | Bundle pesado; uso provável mínimo | Auditar uso; remover se não estiver sendo usado |
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

O plugin `vite-plugin-critical` extrai o CSS above-the-fold e injeta inline no `<head>` durante o build. Isso elimina o render-blocking do CSS principal.

### Tailwind purge

Vite + Tailwind com PostCSS remove automaticamente classes não utilizadas no build de produção. Nenhuma ação extra além da configuração correta do `content` no `tailwind.config.js`.

### Minificação

O Vite minifica CSS automaticamente via esbuild em modo produção.

---

## Seção 5: Cache e Deploy (Vercel)

### vercel.json

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
- Testes automatizados de performance (Lighthouse CI)
