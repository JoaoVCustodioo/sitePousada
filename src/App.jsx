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
