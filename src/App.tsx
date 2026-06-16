import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ScrollToTop } from './components/ScrollToTop'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { ExhibitionsPage } from './pages/ExhibitionsPage'
import { HomePage } from './pages/HomePage'
import { MaterialPage } from './pages/MaterialPage'
import { WorkDetailPage } from './pages/WorkDetailPage'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exhibitions" element={<ExhibitionsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/material" element={<MaterialPage />} />
        <Route path="/work/:workId" element={<WorkDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}
