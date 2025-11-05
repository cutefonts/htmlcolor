import React from 'react'
import './HowToUse.css'

const HowToUse = () => {
  const steps = [
    {
      number: '01',
      title: 'Select Your Color',
      description: 'Click on the color input or type a HEX code directly into the text field to choose your desired color.',
    },
    {
      number: '02',
      title: 'View Color Codes',
      description: 'Instantly see your color in HEX, RGB, and HSL formats with detailed breakdown values for each component.',
    },
    {
      number: '03',
      title: 'Copy and Use',
      description: 'Click the copy button next to any format to copy it to your clipboard, then paste it into your project.',
    },
  ]

  return (
    <section id="how-to-use" className="how-to-use-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            How to Use the Color Picker
          </h2>
          <p className="section-subtitle">
            Get started in seconds with our simple three-step process
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-number">{step.number}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowToUse
