import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { useNavigate } from "react-router-dom";
import Search from "../forms/Search";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/Cart";
import { Badge } from "antd";
export default function Menu() {
  //context
  const [auth, setAuth] = useAuth();
  const [cart, setcart] = useCart();
  //hooks
  const categories = useCategory();

  const navigate = useNavigate();
  // console.log("categories in menu => ", categories);
  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };
  return (
    <>
      <Navbar style={{ backgroundColor: "#60D3AA" }} data-bs-theme="dark" className="sticky-top">
        <Container>
          <Nav className="d-flex justify-content-between w-100">
            <Nav.Link as={Link} to="/" style={{ color: "black" }}>
              HOME
            </Nav.Link>
            <Nav.Link as={Link} to="/shop" style={{ color: "black" }}>
              SHOP
            </Nav.Link>
            <div className="dropdown">
              <li>
                <button
                  className="nav-link pointer dropdown-toggle"
                  data-bs-toggle="dropdown"
                  style={{ color: "black" }}
                >
                  CATEGORIES
                </button>

                <ul
                  className="dropdown-menu"
                  style={{ height: "300px", overflow: "scroll" }}
                >
                  <li>
                    <Nav.Link
                      as={Link}
                      to={"categories"}
                      style={{ color: "white" }}
                    >
                      All categories
                    </Nav.Link>
                  </li>
                  {categories?.map((c) => (
                    <li key={c._id}>
                      <Nav.Link
                        as={Link}
                        to={`/category/${c.slug}`}
                        style={{ color: "white" }}
                      >
                        {c.name}
                      </Nav.Link>
                    </li>
                  ))}
                </ul>
              </li>
            </div>
            <li className="nav-item mt-1">
            <Badge count={cart?.length >=1 ? cart?.length : 0} offset={[5, 12]} showZero={true}>
              <Nav.Link as={Link} to="/cart" style={{ color: "black" }}>
                CART
              </Nav.Link>
            </Badge>
            </li>
            <Search />
            {!auth?.user ? (
              <>
                <Nav.Link as={Link} to="/login" style={{ color: "black" }}>
                  LOGIN
                </Nav.Link>
                <Nav.Link as={Link} to="/register" style={{ color: "black" }}>
                  REGISTER
                </Nav.Link>
              </>
            ) : (
              <div className="dropdown">
                <button
                  className="nav-link pointer dropdown-toggle"
                  data-bs-toggle="dropdown"
                  style={{ color: "black" }}
                >
                  {auth?.user?.name?.toUpperCase()} {/* //? is if we have */}
                </button>

                <ul className="dropdown-menu">
                  <li>
                    <Nav.Link
                      as={Link}
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                      style={{ color: "white" }}
                    >
                      Dashboard
                    </Nav.Link>
                  </li>
                  <button
                    onClick={logout}
                    className="nav-link pointer"
                    style={{ color: "white" }}
                  >
                    Logout
                  </button>
                </ul>
              </div>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
