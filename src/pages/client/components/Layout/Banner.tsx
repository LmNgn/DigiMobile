import React from 'react'
import bannerImg from '../../../../assets/image1.png'
import { Link } from 'react-router-dom'
const Banner = () => {
  return (
    <section className="position-relative overflow-hidden" style={{ height: "600px" }}>
      {/* Ảnh nền */}
      <img
        src={bannerImg}
        className="img-fluid w-100 h-100"
        alt="Banner"
        style={{ objectFit: "cover" }}
      />

      {/* Lớp phủ */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center text-center">
        <div>
          <h1 className="display-3 fw-bold text-uppercase text-white">
            SMART<br />LIVING
          </h1>
          <p className="fs-5 text-white">Worldwide shipping</p>
          <Link to="#" className="btn btn-light text-dark fw-semibold px-4 py-2 mt-3">
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Banner