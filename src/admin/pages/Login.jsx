import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await api.post("/login", {
            email,
            password,
        });

        console.log(response.data);

        localStorage.setItem(
            "token",
            response.data.data.access_token
        );

        navigate("/admin/dashboard");

    } catch (err) {
        console.log(err);
    }
};

  return (
      <>
        <div className="container-fluid position-relative d-flex p-0">
          {/* Spinner Start */}
          <div id="spinner" className="show bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
            <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
          {/* Spinner End */}
          {/* Sign In Start */}
          <div className="container-fluid">
            <div className="row h-100 align-items-center justify-content-center" style={{minHeight: '100vh'}}>
              <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">

                <form onSubmit={handleSubmit} className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <Link to="/admin/dashboard">
                      <h3 className="text-primary"><i className="fa fa-user-edit me-2" />DarkPan</h3>
                    </Link>
                    <h3>Sign In</h3>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Email address</label>
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
                    <label htmlFor="floatingPassword">Password</label>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="form-check">
                      <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                      <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <Link to="#">Forgot Password</Link>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary py-3 w-100 mb-4"
                    disabled={loading}
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </button>
                  <p className="text-center mb-0">Don't have an Account? <Link to="#">Sign Up</Link></p>

                </form>
              </div>
            </div>
          </div>
          {/* Sign In End */}
        </div>

      </>
    );
  }

  export default Login;