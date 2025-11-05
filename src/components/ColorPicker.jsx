import React, { useState, useEffect } from 'react'
import './ColorPicker.css'

const ColorPicker = () => {
  const [color, setColor] = useState('#6366f1')
  const [copied, setCopied] = useState(null)
  const [colorHistory, setColorHistory] = useState([])
  const [showPalette, setShowPalette] = useState(true)

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null
  }

  const rgbToHsl = (r, g, b) => {
    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h, s, l = (max + min) / 2

    if (max === min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6
          break
        case g:
          h = ((b - r) / d + 2) / 6
          break
        case b:
          h = ((r - g) / d + 4) / 6
          break
        default:
          h = 0
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    }
  }

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  useEffect(() => {
    if (color && !colorHistory.includes(color)) {
      setColorHistory(prev => [color, ...prev.slice(0, 11)])
    }
  }, [color])

  const generateRandomColor = () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
    setColor(randomColor)
  }

  const generateComplementary = (hex) => {
    const rgb = hexToRgb(hex)
    if (!rgb) return hex
    const complementary = '#' +
      (255 - rgb.r).toString(16).padStart(2, '0') +
      (255 - rgb.g).toString(16).padStart(2, '0') +
      (255 - rgb.b).toString(16).padStart(2, '0')
    return complementary
  }

  const generateAnalogous = (hex) => {
    const rgb = hexToRgb(hex)
    if (!rgb) return [hex, hex]
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

    const analogous1 = hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l)
    const analogous2 = hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l)

    return [analogous1, analogous2]
  }

  const hslToHex = (h, s, l) => {
    l /= 100
    const a = s * Math.min(l, 1 - l) / 100
    const f = n => {
      const k = (n + h / 30) % 12
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
      return Math.round(255 * color).toString(16).padStart(2, '0')
    }
    return `#${f(0)}${f(8)}${f(4)}`
  }

  const generateTriadic = (hex) => {
    const rgb = hexToRgb(hex)
    if (!rgb) return [hex, hex]
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

    const triadic1 = hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l)
    const triadic2 = hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l)

    return [triadic1, triadic2]
  }

  const popularColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
    '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
    '#F8B500', '#6C5CE7', '#00D2D3', '#FF7675'
  ]

  const rgb = hexToRgb(color)
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null

  const colorFormats = [
    { label: 'HEX', value: color.toUpperCase(), type: 'hex' },
    { label: 'RGB', value: rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : 'N/A', type: 'rgb' },
    { label: 'HSL', value: hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : 'N/A', type: 'hsl' },
  ]

  const complementaryColor = generateComplementary(color)
  const [analogous1, analogous2] = generateAnalogous(color)
  const [triadic1, triadic2] = generateTriadic(color)

  return (
    <section id="picker" className="color-picker-section">
      <div className="container">
        <div className="section-header">
          <h1 className="section-title">
            HTML <span className="color-accent">Color</span> Picker
          </h1>
          <p className="section-subtitle">
            Pick any color and get instant HTML color codes in multiple formats
          </p>
        </div>

        <div className="color-picker-container">
          <div className="color-display-wrapper">
            <div className="color-display" style={{ backgroundColor: color }}>
              <div className="color-overlay">
                <div className="color-value-display">
                  <span className="color-hex-large">{color.toUpperCase()}</span>
                </div>
              </div>
            </div>

            <div className="color-input-wrapper">
              <label htmlFor="color-input" className="color-input-label">
                Select Color
              </label>
              <div className="color-input-container">
                <input
                  type="color"
                  id="color-input"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="color-input"
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => {
                    if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                      setColor(e.target.value)
                    } else if (e.target.value.length <= 7) {
                      setColor(e.target.value)
                    }
                  }}
                  className="color-text-input"
                  placeholder="#000000"
                />
              </div>
              <button onClick={generateRandomColor} className="random-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0118.8-4.3M22 12.5a10 10 0 01-18.8 4.2"/>
                </svg>
                Random Color
              </button>
            </div>
          </div>

          <div className="color-codes-panel">
            <h2 className="panel-title">Color Codes</h2>
            <div className="color-codes-grid">
              {colorFormats.map((format) => (
                <div key={format.type} className="color-code-card">
                  <div className="code-label">{format.label}</div>
                  <div className="code-value-wrapper">
                    <code className="code-value">{format.value}</code>
                    <button
                      className={`copy-btn ${copied === format.type ? 'copied' : ''}`}
                      onClick={() => copyToClipboard(format.value, format.type)}
                      aria-label={`Copy ${format.label} code`}
                    >
                      {copied === format.type ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M16 8h2a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V10a2 2 0 012-2h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <rect x="8" y="8" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {rgb && (
              <div className="color-details">
                <h3 className="details-title">Color Details</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Red</span>
                    <span className="detail-value">{rgb.r}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Green</span>
                    <span className="detail-value">{rgb.g}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Blue</span>
                    <span className="detail-value">{rgb.b}</span>
                  </div>
                  {hsl && (
                    <>
                      <div className="detail-item">
                        <span className="detail-label">Hue</span>
                        <span className="detail-value">{hsl.h}°</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Saturation</span>
                        <span className="detail-value">{hsl.s}%</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Lightness</span>
                        <span className="detail-value">{hsl.l}%</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ColorPicker

