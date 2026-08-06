function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="bg-secondary rounded-top p-4">
        <div className="row">
          <div className="col-md-6 text-center text-md-start text-white">
            © {year}{" "}
            <strong className="text-primary title-gradient">
              Portfolio CMS
            </strong>
            . All Rights Reserved.
          </div>

          <div className="col-md-6 text-center text-md-end text-white">
            Developed with ❤️ by{" "}
            <strong className="text-primary title-gradient">
              Mohan Kalavalapalli
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
