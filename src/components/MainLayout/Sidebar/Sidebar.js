import { useNavigate } from "react-router-dom";
import {} from "@ant-design/icons";
import { Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faChartLine,
  faUserGear,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Sidebar.module.scss";

const items = [
  {
    label: "Dashboard",
    key: "/",
    icon: <FontAwesomeIcon icon={faChartLine} />,
  },
  {
    label: "Books",
    key: "/books",
    icon: <FontAwesomeIcon icon={faBookOpen} />,
  },
  {
    label: "Authors",
    key: "/authors",
    icon: <FontAwesomeIcon icon={faUserPen} />,
  },
  {
    label: "Users",
    key: "/users",
    icon: <FontAwesomeIcon icon={faUserGear} />,
  },
];

function Sidebar() {
  const navigate = useNavigate();
  const onClick = ({ key }) => {
    navigate(key);
  };
  return (
    <Menu
      onClick={onClick}
      defaultOpenKeys="dashboard"
      mode="inline"
      items={items}
      className={styles.wrapper}
    />
  );
}

export default Sidebar;
