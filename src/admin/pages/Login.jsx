import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import authService from "../../services/authService";
import useAuth from "../../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Email and Password are required.",
      });
      return;
    }

    try {
      setLoading(true);

      const response = await authService.login({
        email,
        password,
      });

      login(response.data.access_token, response.data.user);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Login Successful",
        timer: 1200,
        showConfirmButton: false,
      });

      navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response?.data?.message || "Invalid email or password.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid position-relative d-flex p-0 login-page">
      <div className="container-fluid">
        <div
          className="row justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="col-sm-10 col-md-7 col-lg-5 col-xl-4">
            <form
              onSubmit={handleSubmit}
              className="bg-secondary rounded-4 shadow-lg p-4 p-md-5 login-card"
            >
              <div className="text-center mb-4">
                <Link to="/admin/login" className="text-decoration-none">
                  <h2 className="text-primary fw-bold mb-2">
                    <i className="fa fa-user-shield me-2"></i>
                    Portfolio CMS
                  </h2>
                </Link>

                <h4 className="fw-bold text-white">Welcome Back 👋</h4>

                <p className="text-light small mb-0">
                  Login to access your admin dashboard.
                </p>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="floatingInput">Email Address</label>
              </div>

              <div className="form-floating position-relative mb-3">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control pe-5"
                  id="floatingPassword"
                  placeholder="Password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <label htmlFor="floatingPassword">Password</label>

                <button
                  type="button"
                  className="btn btn-link password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                  ></i>
                </button>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="remember"
                  />

                  <label className="form-check-label" htmlFor="remember">
                    Remember Me
                  </label>
                </div>

                <a href="#" className="small text-primary text-decoration-none">
                  Forgot Password?
                </a>
              </div>

              <button
                className="btn btn-primary w-100 py-3 fw-semibold"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
