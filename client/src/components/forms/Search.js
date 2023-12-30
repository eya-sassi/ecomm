import axios from "axios";
import { useSearch } from "../../context/Search";
import {useNavigate} from 'react-router-dom';
export default function Search() {
  //hooks
  const [values, setValues] = useSearch();
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/products/search/${values?.keyword}`);
      console.log(data);
      setValues({ ...values, results: data });
      navigate('/search')
    } catch (err) { 
      console.log(err);
    }
  };

  return (
    <form className="d-flex" onSubmit={handleSubmit}>
      <input
        type="search"
        style={{
          borderRadius: "0px",
          backgroundColor: "#60D3AA",
          color: "black",
        }}
        className="form-control"
        placeholder="search"
        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
      value={values.keyword}
      />
      <button
        className="btn btn-outline-primary"
        type="submit"
        style={{ borderRadius: "0px" }}
      >
        Search 
      </button>
    </form>
  );
}