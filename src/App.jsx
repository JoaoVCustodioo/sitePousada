import { useEffect, Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageContext'
import Home from './pages/Home/Home'

// Acomodacoes só é baixada quando o usuário navegar para lá
const Acomodacoes = lazy(() => import('./pages/Acomodacoes/Acomodacoes'))
const LegalPage = lazy(() => import('./pages/Legal/LegalPage'))

const App = () => {
  useEffect(() => {
    const loadAOS = async () => {
      const [{ default: AOS }] = await Promise.all([
        import('aos'),
        import('aos/dist/aos.css'),
      ])

      AOS.init({
        duration: 800,
        once: true,
        offset: 80,
        easing: 'ease-out-cubic',
      })
    }

    const idleId = window.requestIdleCallback
      ? window.requestIdleCallback(loadAOS, { timeout: 2500 })
      : window.setTimeout(loadAOS, 1800)

    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idleId)
      else window.clearTimeout(idleId)
    }
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
        <Route
          path="/:slug"
          element={
            <Suspense fallback={null}>
              <LegalPage />
            </Suspense>
          }
        />
        <Route path="/Home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </LanguageProvider>
  )
}

export default App
