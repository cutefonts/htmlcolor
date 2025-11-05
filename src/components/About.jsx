import React from 'react'
import './About.css'

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title">
              About <span className="color-accent">Color</span> Picker
            </h2>
            <p className="about-description">
              Our HTML Color Picker is a modern, user-friendly tool designed for developers, 
              designers, and anyone who works with colors on the web. Whether you're building 
              a website, creating graphics, or just experimenting with color schemes, our tool 
              makes it easy to find the perfect color and get its codes instantly.
            </p>
            <p className="about-description">
              With support for multiple color formats (HEX, RGB, HSL) and detailed color analysis, 
              you'll have everything you need to implement colors in your projects. The intuitive 
              interface and real-time preview make color selection a breeze.
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-number">3</div>
                <div className="stat-label">Color Formats</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">Free to Use</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">∞</div>
                <div className="stat-label">Color Possibilities</div>
              </div>
            </div>
          </div>
          <div className="about-visual">
            <div className="visual-card">
              <div className="color-swatch color-swatch-1"></div>
              <div className="color-swatch color-swatch-2"></div>
              <div className="color-swatch color-swatch-3"></div>
              <div className="color-swatch color-swatch-4"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

