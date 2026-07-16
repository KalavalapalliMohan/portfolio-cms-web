function Header() {
  return (
      <header id="header" className="header dark-background d-flex flex-column">
        <i className="header-toggle d-xl-none bi bi-list" />
        <div className="profile-img">
          <img
            src="assets/img/my-profile-img.jpg"
            alt="Profile"
            className="img-fluid rounded-circle"
          />
        </div>
        <a
          href="index.html"
          className="logo d-flex align-items-center justify-content-center"
        >
          {/* Uncomment the line below if you also wish to use an image logo */}
          <img src="assets/img/logo.png" alt="Logo" />
          <h1 className="sitename">Alex Smith</h1>
        </a>
        <div className="social-links text-center">
          <a href="#" className="twitter">
            <i className="bi bi-twitter-x" />
          </a>
          <a href="#" className="facebook">
            <i className="bi bi-facebook" />
          </a>
          <a href="#" className="instagram">
            <i className="bi bi-instagram" />
          </a>
          <a href="#" className="google-plus">
            <i className="bi bi-skype" />
          </a>
          <a href="#" className="linkedin">
            <i className="bi bi-linkedin" />
          </a>
        </div>
        <nav id="navmenu" className="navmenu">
          <ul>
            <li>
              <a href="#hero" className="active">
                <i className="bi bi-house navicon" />
                Home
              </a>
            </li>
            <li>
              <a href="#about">
                <i className="bi bi-person navicon" /> About
              </a>
            </li>
            <li>
              <a href="#resume">
                <i className="bi bi-file-earmark-text navicon" /> Resume
              </a>
            </li>
            <li>
              <a href="#portfolio">
                <i className="bi bi-images navicon" /> Portfolio
              </a>
            </li>
            <li>
              <a href="#services">
                <i className="bi bi-hdd-stack navicon" /> Services
              </a>
            </li>
            <li className="dropdown">
              <a href="#">
                <i className="bi bi-menu-button navicon" />{" "}
                <span>Dropdown</span>{" "}
                <i className="bi bi-chevron-down toggle-dropdown" />
              </a>
              <ul>
                <li>
                  <a href="#">Dropdown 1</a>
                </li>
                <li className="dropdown">
                  <a href="#">
                    <span>Deep Dropdown</span>{" "}
                    <i className="bi bi-chevron-down toggle-dropdown" />
                  </a>
                  <ul>
                    <li>
                      <a href="#">Deep Dropdown 1</a>
                    </li>
                    <li>
                      <a href="#">Deep Dropdown 2</a>
                    </li>
                    <li>
                      <a href="#">Deep Dropdown 3</a>
                    </li>
                    <li>
                      <a href="#">Deep Dropdown 4</a>
                    </li>
                    <li>
                      <a href="#">Deep Dropdown 5</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#">Dropdown 2</a>
                </li>
                <li>
                  <a href="#">Dropdown 3</a>
                </li>
                <li>
                  <a href="#">Dropdown 4</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#contact">
                <i className="bi bi-envelope navicon" /> Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>
  );
}

export default Header;
