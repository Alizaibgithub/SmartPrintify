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

function CheckPage() {
  return (
    <section className="tool-card">
      <div className="tool-header">
        <div>
          <p className="eyebrow">Formatting Tool</p>
          <h2>Check document formatting</h2>
        </div>
        <button type="button" className="primary-btn">
          Analyze Document
        </button>
      </div>

      <div className="tool-grid">
        <div className="panel">
          <h3>Upload document</h3>
          <div className="upload-box">
            <p>Drop your PDF or DOCX here</p>
            <span>Maximum size: 10MB</span>
            <button type="button" className="secondary-btn">
              Choose File
            </button>
          </div>

          <div className="options-list">
            <label>
              <input type="checkbox" defaultChecked />
              Title formatting
            </label>
            <label>
              <input type="checkbox" defaultChecked />
              Margin and spacing
            </label>
            <label>
              <input type="checkbox" defaultChecked />
              Font consistency
            </label>
          </div>
        </div>

        <div className="panel">
          <h3>Results</h3>
          <div className="results-box">
            <p>No analysis has been run yet.</p>
            <span>Results will appear here after processing.</span>
          </div>
        </div>
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
          <Route path="/check" element={<CheckPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
