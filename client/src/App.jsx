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
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files?.[0] || null)
    setError('')
    setResult(null)
  }

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setStatus('error')
      setError('Please choose a document first.')
      return
    }

    setLoading(true)
    setStatus('loading')
    setError('')
    setResult(null)

    try {
      const response = await submitFormattingRequest(selectedFile, {
        checks: ['titleFormatting', 'marginSpacing', 'fontConsistency'],
      })

      setStatus('success')
      setResult(response)
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Validation failed.')
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
            {status === 'loading' && <p>Preparing Gemini analysis...</p>}
            {status === 'error' && <p className="error-text">{error}</p>}
            {status === 'success' && result && (
              <>
                <p>{result.message || 'Validation completed.'}</p>
                {result.issues && result.issues.length > 0 ? (
                  <ul className="issue-list">
                    {result.issues.map((issue, index) => (
                      <li key={index}>{issue}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No formatting issues detected.</p>
                )}
              </>
            )}
            {status === 'idle' && (
              <>
                <p>No analysis has been run yet.</p>
                <span>Results will appear here after processing.</span>
              </>
            )}
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
