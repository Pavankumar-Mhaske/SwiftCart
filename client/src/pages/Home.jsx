import React from "react";
import { NavLink, Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <section className="home-wrapper-1 py-5 ">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-banner position-relative ">
                <img
                  className="img-fluid rounded-3"
                  src="/images/main-banner-1.jpg"
                  alt="main-banner"
                />
                <div className="main-banner-content position-absolute ">
                  <h4>SUPERCHARGED FOR PROS.</h4>
                  <h5>iPad S13+ Pro.</h5>
                  <p>
                    from $999.00 or $41.62/mo. <br /> for 24 mo. Footnote*{" "}
                  </p>
                  <Link className="button">BUY NOW</Link>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex flex-wrap gap-10  justify-content-between align-items-center ">
                {/* Catbanner-1 */}
                <div className="small-banner position-relative ">
                  <img
                    className="img-fluid rounded-3"
                    src="/images/catbanner-01.jpg"
                    alt="small-banner"
                  />
                  <div className="small-banner-content position-absolute ">
                    <h4>Best Sale</h4>
                    <h5>Laptops Max</h5>
                    <p>
                      from $1699.00 or <br /> $64.62/mo.
                    </p>
                    {/* <Link className="button">BUY NOW</Link> */}
                  </div>
                </div>
                {/* Catbanner-2 */}
                <div className="small-banner position-relative ">
                  <img
                    className="img-fluid rounded-3"
                    src="/images/catbanner-02.jpg"
                    alt="small-banner"
                  />
                  <div className="small-banner-content position-absolute ">
                    <h4>15% OFF</h4>
                    <h5>Smartwatch 7</h5>
                    <p>
                      shop the latest band <br /> styles and colors
                    </p>
                    {/* <Link className="button">BUY NOW</Link> */}
                  </div>
                </div>
                {/* Catbanner-3 */}
                <div className="small-banner position-relative ">
                  <img
                    className="img-fluid rounded-3"
                    src="/images/catbanner-03.jpg"
                    alt="small-banner"
                  />
                  <div className="small-banner-content position-absolute ">
                    <h4>NEW ARRIVAL.</h4>
                    <h5>Buy IPad Air.</h5>
                    <p>
                      from $999.00 or <br /> $49.91/mo. for 12 mo.
                    </p>
                    {/* <Link className="button">BUY NOW</Link> */}
                  </div>
                </div>
                {/* Catbanner-4 */}
                <div className="small-banner position-relative ">
                  <img
                    className="img-fluid rounded-3"
                    src="/images/catbanner-04.jpg"
                    alt="small-banner"
                  />
                  <div className="small-banner-content position-absolute ">
                    <h4>FREE ENGRAVING</h4>
                    <h5>AirPods Max</h5>
                    <p>
                      High-fidelity plaback & <br /> ultra-low distortion
                    </p>
                    {/* <Link className="button">BUY NOW</Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
