import { Link } from 'react-router-dom'
import contentImage1 from '../../../../assets/image4.png'
import contentImage2 from '../../../../assets/image5.png'
import { Container, Row, Col } from 'react-bootstrap';

import React from 'react'

const RenderImage = () => {
  return (
    <section className="py-5 bg-light">
      <Container>
        <Row className="g-4">
          {/* Image 1 */}
          <Col md={6} className="position-relative">
            <div className="overflow-hidden rounded-3 shadow-sm">
              <img src={contentImage1} className="img-fluid w-100" style={{ height: '600px', objectFit: 'cover' }} alt="iPhone 1" />
            </div>
            <div className="position-absolute bottom-0 start-0 bg-white bg-opacity-75 p-3 m-3 rounded">
              <h2 className="h5 fw-bold text-dark m-0">iPhone 1</h2>
              <Link to="#" className="text-dark text-decoration-underline small">Shop Now</Link>
            </div>
          </Col>

          {/* Image 2 */}
          <Col md={6} className="position-relative">
            <div className="overflow-hidden rounded-3 shadow-sm">
              <img src={contentImage2} className="img-fluid w-100" style={{ height: '600px', objectFit: 'cover' }} alt="iPhone 2" />
            </div>
            <div className="position-absolute bottom-0 start-0 bg-white bg-opacity-75 p-3 m-3 rounded">
              <h2 className="h5 fw-bold text-dark m-0">iPhone 2</h2>
              <Link to="#" className="text-dark text-decoration-underline small">Shop Now</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default RenderImage