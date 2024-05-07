import shoppingBag from "../assets/handbag-fill.svg";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <Link to={"/"}>
        <h2>Shopping Mart</h2>
      </Link>
      <Link to={"/cart"}>
        <div className="nav-bag">
          <img src={shoppingBag} alt="shopping bag" width={35} height={35} />
          <span className="bag-quantity">
            <span>3</span>
          </span>
        </div>
      </Link>
    </nav>
  );
};

export default NavBar;
