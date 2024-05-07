import { useGetAllProductsQuery } from "../services/productsApi";

const Home = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
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
                  <button>Add to Cart</button>
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
