import { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth";
import { useCart } from "../../context/Cart";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import toast from "react-hot-toast";
export default function UserCartSidebar() {
  //context
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  //state
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  //hooks
  const navigate = useNavigate();
  useEffect(() => {
    if (auth?.token) {
      getClientToken();
    }
  }, [auth?.token]);
  const getClientToken = async () => {
    try {
      const { data } = await axios.get("/braintree/token");
      setClientToken(data.clientToken);
    } catch (err) {
      console.log(err);
    }
  };
  const cartTotal = () => {
    let total = 0;
    cart.map((item) => {
      total += item.price;
    });
    return total.toLocaleString("fr-TN", {
      style: "currency",
      currency: "TND",
    });
  };
  const handleBuy = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem('cart');
      setCart([]);
      navigate('/dashboard/user/orders');
      toast.success('Payment Successful');
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <div className="col-md-4 mb-5">
      <h4>Your cart summary</h4>
      Total / Address / payments
      <hr />
      <h6>Total: {cartTotal()}</h6>
      {auth?.user?.address ? (
        <>
          
          <div className="mb-3">
            <hr /> <h4>Delivery address:</h4>
            <h5>{auth?.user?.address}</h5>
          </div>
          <button
            className="btn btn-outline-warning"
            onClick={() => navigate("/dashboard/user/profile")}
          >
            Update Address
          </button>
        </>
      ) : (
        <div className="mb-3">
          {auth?.token ? (
            <button
              className="btn btn-outline-warning"
              onClick={() => navigate("/dashboard/user/profile")}
            >
              Add Delivery Address
            </button>
          ) : (
            <button
              className="btn btn-outline-danger mt-3"
              onClick={() => navigate("/login", { state: "/cart" })} //state:'': indicating that the user was on the "/cart" page before navigating to "/login"
            >
              Login To CheckOut
            </button>
          )}
        </div>
      )}
      <div className="mt-3">
        {!clientToken || !cart?.length ? (
          ""
        ) : (
          <>
            <DropIn
              options={{
                authorization: clientToken,
                
              }}
              onInstance={(instance) => setInstance(instance)}
            />
            <button
              onClick={handleBuy}
              className="btn btn-primary col-12 mt-2"
              disabled={!auth?.user?.address || !instance || loading}
            >
              {loading ? "Processing..." : "Buy"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
