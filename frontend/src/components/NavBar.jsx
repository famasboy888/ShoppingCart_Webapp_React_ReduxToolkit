import shoppingBag from "../assets/handbag-fill.svg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { logoutUser } from "../features/authSlice";
import { toast } from "react-toastify";

const NavBar = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { cartTotalQuantity } = useSelector((state) => {
    return state.cart;
  });

  const handleLogout = () => {
    dispatch(logoutUser(null));
    toast.warning("User logged out.", { position: "bottom-left" });
  };

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
      {auth._id ? (
        <LoginLinks>
          <Link
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </Link>
          <Link>
            <span className="profile-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
            </span>
          </Link>
        </LoginLinks>
      ) : (
        <AuthLinks>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </AuthLinks>
      )}
    </nav>
  );
};

export default NavBar;

//Styled component
const LoginLinks = styled.div`
  a {
    &:last-child {
      margin-left: 2rem;
    }
  }
`;

const AuthLinks = styled.div`
  a {
    &:last-child {
      margin-left: 2rem;
    }
  }
`;
