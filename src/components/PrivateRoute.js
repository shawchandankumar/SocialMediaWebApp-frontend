import { Outlet, useNavigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ isLoggedIn }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return isLoggedIn ? <Outlet /> : navigate("/login", {
      state: {
          from: {location}
      }
    });
};

export default PrivateRoute;
