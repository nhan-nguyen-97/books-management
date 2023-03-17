import { useNavigate } from "react-router-dom";

export function PrivateRoute({ children }) {
  const isLogin = localStorage.getItem("id_token");
  const navigate = useNavigate();
  if (!isLogin) {
    return navigate("/login");
  } else {
    return children;
  }
}
