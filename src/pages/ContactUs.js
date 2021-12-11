import React from 'react';


function ContactUs() {
  return (
    <div className="container w-75">
      <div className="row">
        <div className="col-12">
           <p className="mb-0 fw-bold text-center fs-3">Contact Us</p>
           <p className="mb-5 fw-600 text-center fs-5">Have any question? We'd love to hear you</p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          
          <div className="mb-3">
           <input type="email" className="form-control"  placeholder="name@example.com"/>
          </div>
          <div className="mb-3">
            <textarea className="form-control" placeholder="Message" rows="3"></textarea>
          </div>

          <a href="mailto:someone@example.com"  className="btn btn-primary w-100">Submit</a>

        </div>
      </div>
    </div>
  );
}

export default ContactUs;