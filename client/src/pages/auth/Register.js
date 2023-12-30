import { useState } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/Auth";
import { useNavigate } from "react-router-dom";
export default function Register() {
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //hooks
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/register`, {
        name,
        email,
        password,
      });
      console.log(data);
      if (data?.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));

        setAuth({ ...auth, token: data.token, user: data.user });

        toast.success("Registration successful");
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      toast.error("Registration failed,Try Again.");
    }
  };
  return (
    <div>
      <Jumbotron title="Register" />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control mb-4 pb-2"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
              <input
                type="email"
                className="form-control mb-4 pb-2"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
              <input
                type="password"
                className="form-control mb-4 pb-2"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-primary"
                  type="submit"
                  style={{ backgroundColor: "#60D3AA", color: "black" }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
