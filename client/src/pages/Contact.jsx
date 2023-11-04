import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { FaHome } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaInfo } from "react-icons/fa";

const Contact = () => {
  return (
    <>
      <Meta title={"Contact Us"} />
      <BreadCrumb title="Contact Us" />
      <div className="contact-wrapper  py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            {/* 🌎🌍🌏 Map 🌎🌍🌏 */}
            <div className="col-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242117.7090705773!2d73.6981536539019!3d18.524870610167344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1699117425229!5m2!1sen!2sin"
                width="600"
                height="450"
                className="border-0 w-100"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            {/* 🙋🏻‍♂️🙋🏻‍♀️🙋🏻‍♂️🙋🏻‍♀️🙋🏻‍♂️🙋🏻‍♀️🙋🏻‍♂️🙋🏻‍♀️ Bottom Pannel 🙋🏻‍♂️🙋🏻‍♀️🙋🏻‍♂️🙋🏻‍♀️🙋🏻‍♂️🙋🏻‍♀️🙋🏻‍♂️🙋🏻‍♀️ */}
            <div className="col-12 mt-5">
              <div className="contact-inner-wrapper d-flex justify-content-between ">
                {/* 📞 💁🏻 👋🏻 Contact 📞 💁🏻 👋🏻  */}
                <div>
                  <h3 className="contact-title mb-4">Contact</h3>
                  <form action="" className="d-flex flex-column gap-15">
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Mobile Number"
                      />
                    </div>
                    <div>
                      <textarea
                        name=""
                        id=""
                        className="w-100 form-control"
                        cols="30"
                        rows="4"
                        placeholder="Comments"
                      ></textarea>
                    </div>
                    <div>
                      <button className="button border-0">Submit</button>
                    </div>
                  </form>
                </div>
                {/* 📞 💁🏻 👋🏻 Get In Touch With us 📞 💁🏻 👋🏻  */}
                <div>
                  <h3 className="contact-title mb-4">Get in Touch with Us</h3>
                  <div>
                    <ul className="ps-0">
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <FaHome className="fs-5" />
                        {/* adding the dummy address */}
                        <address className="address mb-0">
                          Hno:227 , Near ABC Chowk, Pune, Maharashtra, India
                        </address>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <IoCall className="fs-5" />
                        <a href="tel:+91 8530470684">+91 8530470684</a>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <MdEmail className="fs-5" />
                        <a
                          className="email"
                          href="mailto:mhaskepavankumar@gmail.com"
                        >
                          mhaskepavankumar@gmail.com
                        </a>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <FaInfo className="fs-5" />
                        <p className="mb-0"> Monday - Friday 10 AM - 8 PM</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
