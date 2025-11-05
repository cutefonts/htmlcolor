import React from 'react'
import './ColorFormats.css'

const ColorFormats = () => {
  const formats = [
    {
      title: 'HEX Color Codes',
      description: 'Hexadecimal color codes are the most popular format in web development. They consist of a # symbol followed by 6 characters (0-9, A-F) representing red, green, and blue values.',
      example: '#6366F1',
      usage: 'color: #6366F1;',
    },
    {
      title: 'RGB Color Codes',
      description: 'RGB (Red, Green, Blue) uses three numeric values from 0 to 255 to define colors. This format is intuitive and easy to understand, making it great for color manipulation.',
      example: 'rgb(99, 102, 241)',
      usage: 'color: rgb(99, 102, 241);',
    },
    {
      title: 'HSL Color Codes',
      description: 'HSL (Hue, Saturation, Lightness) represents colors using degrees (0-360) for hue, and percentages for saturation and lightness. Perfect for creating color variations.',
      example: 'hsl(239, 84%, 67%)',
      usage: 'color: hsl(239, 84%, 67%);',
    },
  ]

  return (
    <section id="color-formats" className="color-formats-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Understanding Color Formats
          </h2>
          <p className="section-subtitle">
            Learn about different color code formats and when to use them
          </p>
        </div>

        <div className="formats-grid">
          {formats.map((format, index) => (
            <div key={index} className="format-card">
              <h3 className="format-title">{format.title}</h3>
              <p className="format-description">{format.description}</p>
              <div className="format-example">
                <div className="example-label">Example:</div>
                <code className="example-code">{format.example}</code>
              </div>
              <div className="format-usage">
                <div className="usage-label">CSS Usage:</div>
                <code className="usage-code">{format.usage}</code>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ColorFormats
