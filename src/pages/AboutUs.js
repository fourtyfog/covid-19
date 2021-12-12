import React from 'react';


function AboutUs() {
  return (
    <div className="container w-75 p-5">

      <div className="row">
        <div className="col-12">
           <p className="mb-5 fw-bold text-center fs-3">About Us - Kelompok 4</p>
           
        </div>
      </div>
      <div className="row text-center">
        <div className="col-12 col-md-6">
          <img className="rounded-circle mb-2" width="140" height="140"  role="img" src="charlie.jpg"/>

          <h2>Charlie Frederico</h2>
          <p>00000043442</p>
        </div>

        <div className="col-12 col-md-6">
         <img className="rounded-circle mb-2" width="140" height="140"  role="img" src="henry.jpg"/>

          <h2>Henry Laufrans</h2>
          <p>00000042914</p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
