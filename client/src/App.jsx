import { NavLink, Routes, Route } from 'react-router-dom'
import './App.css'

function HomePage() {
  return (
    <section className="hero-card">
      <p className="eyebrow">SmartPrintify</p>
      <h1>AI-powered document formatting validation</h1>
      <p className="description">
        Upload a document, check formatting rules, and receive a highlighted report before printing.
      </p>
      <div className="feature-list">
        <span>PDF and DOCX support</span>
        <span>Instant validation</span>
        <span>Clear issue highlights</span>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">SmartPrintify</div>
        <nav className="nav-links">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
          <NavLink className="nav-link" to="/check">
            Check
          </NavLink>
        </nav>
      </header>

      <main className="page-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/check" element={<div className="hero-card">Coming soon</div>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
