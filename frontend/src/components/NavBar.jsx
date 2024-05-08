import shoppingBag from "../assets/handbag-fill.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { cartTotalQuantity } = useSelector((state) => {
    return state.cart;
  });
  return (
    <nav className="nav-bar">
      <Link to={"/"}>
        <h2>Phone S-Mart</h2>
      </Link>
      <Link to={"/cart"}>
        <div className="nav-bag">
          <img src={shoppingBag} alt="shopping bag" width={35} height={35} />
          <span className="bag-quantity">
            <span>{cartTotalQuantity}</span>
          </span>
        </div>
      </Link>
    </nav>
  );
};

export default NavBar;
