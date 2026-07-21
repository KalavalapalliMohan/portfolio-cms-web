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

      login(
        response.data.access_token,
        response.data.user
      );

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
        text:
          error.response?.data?.message ||
          "Invalid email or password.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid position-relative d-flex p-0">
      <div className="container-fluid">
        <div
          className="row h-100 align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
            <form
              onSubmit={handleSubmit}
              className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3"
            >
              <div className="d-flex align-items-center justify-content-between mb-3">
                <Link to="/admin/login">
                  <h3 className="text-primary">
                    <i className="fa fa-user-edit me-2"></i>
                    Portfolio CMS
                  </h3>
                </Link>

                <h3>Sign In</h3>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="floatingInput">
                  Email Address
                </label>
              </div>

              <div className="form-floating mb-4">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">
                  Password
                </label>
              </div>

              <button
                className="btn btn-primary py-3 w-100"
                type="submit"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;