import { useEffect, useState } from "react";
import axios from "axios";
import Jumbotron from "../components/cards/Jumbotron";

import ProductCard from "../components/cards/ProductCard";
export default function Home() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadProducts();
    getTotal();
  }, []);
  useEffect(() => {
    if(page===1) return; 
    loadMore();
  }, [page]);
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/products-count");
      setTotal(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadProducts = async () => {
    try {
      const { data } = await axios.get(`/list-products/${page}`);
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };
  const loadMore = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/list-products/${page}`);
      setProducts([...products,...data]);
      setLoading(false)
    } catch (err) {
      console.log(err);
      setLoading(false)
    }
  };
  const arr = [...products];
  const sortBySold = arr?.sort((a, b) => (a.sold < b.sold ? 1 : -1));
  return (
    <div>
      <Jumbotron title="Welcome" />
      <div className="row">
        <div className="col-md-6">
          <h2
            className="p-3 mt-3 mb-4  h4  text-center"
            style={{ backgroundColor: "#60D3AA" }}
          >
            New Arrivals
          </h2>
          <div className="row">
            {products?.map((p) => (
              <div className="col-md-6" key={p._id}>
                <ProductCard p={p} />
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <h2
            className="p-3 mt-3 mb-4 h4  text-center"
            style={{ backgroundColor: "#60D3AA" }}
          >
            Best Sellers
          </h2>
          <div className="row">
            {sortBySold?.map((p) => (
              <div className="col-md-6" key={p._id}>
                <ProductCard p={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container text-center p-5">
        
        {products && products.length < total && (
          <button className="btn btn-primary btn-lg col-md-6" style={{backgroundColor:'#60D3AA',color:'black'}}
          disabled={loading}
          onClick={e=>{
            e.preventDefault()
            setPage(page+1);
          }}
        >
            {loading ? "Loading..." : "Load more"}
          </button>
        )}
      </div>
    </div>
  );
}
