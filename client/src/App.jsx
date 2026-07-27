import { useState } from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import './App.css'
import { submitFormattingRequest } from './services/formattingService.js'

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
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('No analysis has been run yet.')

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files?.[0] || null)
  }

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setMessage('Please choose a document first.')
      return
    }

    setLoading(true)
    setMessage('Sending document for validation...')

    try {
      const response = await submitFormattingRequest(selectedFile, {
        titleFormatting: true,
      })
      setMessage(response.message || 'Validation request submitted successfully.')
    } catch (error) {
      setMessage(error.message || 'Validation failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="tool-card">
      <div className="tool-header">
        <div>
          <p className="eyebrow">Formatting Tool</p>
          <h2>Check document formatting</h2>
        </div>
        <button type="button" className="primary-btn" onClick={handleAnalyze} disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze Document'}
        </button>
      </div>

      <div className="tool-grid">
        <div className="panel">
          <h3>Upload document</h3>
          <div className="upload-box">
            <p>Choose a PDF or DOCX file</p>
            <span>Maximum size: 10MB</span>
            <label className="secondary-btn file-label">
              Choose File
              <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
            </label>
            {selectedFile ? <p className="file-name">Selected: {selectedFile.name}</p> : null}
          </div>
        </div>

        <div className="panel">
          <h3>Results</h3>
          <div className="results-box">
            <p>{message}</p>
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
