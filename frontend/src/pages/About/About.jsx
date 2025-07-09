import React from 'react'
import './About.css'
const About = () => {
  return (
    <div>
        <section className="about-section">
        <div className="section-header">
            <h1 className="section-title">About <span>Us</span></h1>
        </div>

        <div className="about-grid">
            <div className="about-image">
                <div className="slideshow-container">
                    <div className="slide">
                    </div>
                </div>
            </div>

            <div className="about-content">
                <div className="content-block">
                    
                    <p>Seedskraft is dedicated to empowering farmers and gardeners with high-quality seeds that deliver reliable growth, bountiful yields, and sustainable results. Founded with a passion for agriculture and a commitment to innovation, Seedskraft provides a wide range of certified seeds tailored to diverse climates, soils, and cultivation needs.</p>

                    <p>We believe that great harvests start with great seeds. Thats why we focus on rigorous quality control, research-backed selection, and farmer-friendly pricing. Whether you're a large-scale grower or a home gardener, our seeds are designed to help you grow with confidence.At Seedskraft, we don't just sell seeds—we cultivate trust, growth, and a greener tomorrow.</p>
                </div>

                <div className="stats-grid">
                    <div className="stat-item">
                        <div className="stat-number">50+</div>
                        <div className="stat-label">Seed Varieties</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">98%</div>
                        <div className="stat-label">Germination Rate</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">1K</div>
                        <div className="stat-label">Happy Customers</div>
                    </div>
                </div>

            </div>
        </div>
    </section>

    </div>

  )
}

export default About