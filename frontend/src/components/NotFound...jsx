import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>404 Not Found</h2>
      <p>Page not found. Go back to <Link to={'/'}>Home</Link></p>
    </div>
  );
};

export default NotFound;
