import React from 'react';


function AboutUs() {
  return (
    <div className="container w-75 p-5">

      <div className="row">
        <div className="col-12">
           <p className="mb-5 fw-bold text-center fs-3">About Us</p>
           
        </div>
      </div>
      <div className="row text-center">
        <div className="col-12 col-md-6">
          <img className="rounded-circle mb-2" width="140" height="140"  role="img" src="https://picsum.photos/536/354"/>

          <h2>Nama</h2>
          <p>Some representative placeholder content for the three columns of text below the carousel. This is the first column.</p>
        </div>

        <div className="col-12 col-md-6">
         <img className="rounded-circle mb-2" width="140" height="140"  role="img" src="https://picsum.photos/536/354"/>

          <h2>Nama</h2>
          <p>Some representative placeholder content for the three columns of text below the carousel. This is the first column.</p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;