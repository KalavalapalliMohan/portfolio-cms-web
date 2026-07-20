function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="bg-secondary rounded-top p-4">
        <div className="row">
          <div className="col-md-6 text-center text-md-start text-white">
            © {year}{" "}
            <strong className="text-primary">
              Portfolio CMS
            </strong>
            . All Rights Reserved.
          </div>

          <div className="col-md-6 text-center text-md-end text-white">
            Developed with ❤️ by{" "}
            <strong className="text-primary">
              Mohan Kalavalapalli
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;


// function Footer() {
//   const year = new Date().getFullYear();

//   return (
//     <div className="container-fluid pt-4 px-4">
//       <div className="bg-secondary rounded-top p-4">
//         <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
//           <p className="mb-2 mb-md-0 text-white">
//             © {year} <strong>Portfolio CMS</strong>. All Rights Reserved.
//           </p>

//           <p className="mb-0 text-white">
//             Version <span className="badge bg-primary">v1.0.0</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Footer;