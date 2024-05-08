import { addToCart } from "../features/cartSlice";
import { useGetAllProductsQuery } from "../services/productsApi";
import { useDispatch } from "react-redux";

//Redirect
import {useNavigate} from "react-router"

const Home = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate('/cart');
  };

  return (
    <div className="home-container">
      {isLoading && <div>Loading...</div>}
      {!isLoading && error ? <div>Error: {error.data}</div> : null}
      {!isLoading && data.length ? (
        <div>
          <h2>New Arrivals</h2>
          <div className="products">
            {data?.map((product) => {
              return (
                <div className="product" key={product.id}>
                  <h3>{product.name}</h3>
                  <img src={product.image} alt={product.name} />
                  <div className="details">
                    <span>{product.desc}</span>
                    <span className="price">${product.price}</span>
                  </div>
                  <button onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
