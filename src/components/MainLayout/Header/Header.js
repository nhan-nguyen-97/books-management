import { useNavigate } from "react-router-dom";
import { Dropdown } from "antd";

import styles from "./Header.module.scss";
import logo from "../../../assets/Images/Logo.png";
import noAvatar from "../../../assets/Images/noAvatar.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function Header() {
  const navigate = useNavigate();
  const userStorage = localStorage.getItem("user_profile");
  const userInfo = JSON.parse(userStorage);

  const handleLogout = () => {
    localStorage.removeItem("id_token");
    localStorage.removeItem("user_profile")
    navigate("/login");
  };

  const handleToProfilePage = () => {
    navigate("/profile");
  };

  const items = [
    {
      key: "/profile",
      label: (
        <p onClick={handleToProfilePage}>
          <FontAwesomeIcon icon={faUser} /> Profile
        </p>
      ),
    },
    {
      key: "/login",
      label: (
        <p onClick={handleLogout}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout
        </p>
      ),
    },
  ];
  return (
    <div className={styles.wrapper}>
      <img className={styles.logoItem} src={logo} alt="Logo" />
      <div className={styles.userAction}>
        <p>{userInfo.fullName}</p>
        <Dropdown menu={{ items }} placement="bottomLeft" arrow>
          <img
            src={userInfo.avatar || noAvatar}
            className={styles.avatar}
            alt="Avatar"
          ></img>
        </Dropdown>
      </div>
    </div>
  );
}

export default Header;
