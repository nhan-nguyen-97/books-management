import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Descriptions } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./Profile.module.scss";
import { loadUserByIdStart } from "../../redux/actions/usersAction";
import MainContent from "../../components/MainLayout/MainContent";
import MainLayout from "../../components/MainLayout";
import { PrivateRoute } from "../../Common/PrivateRoute";
import UpdateProfile from "./UpdateProfile/UpdateProfile";
import ChangePassword from "./ChangePassword/ChangePassword";

function Profile() {
  const userInfo = JSON.parse(localStorage.getItem("user_profile"));
  const { users } = useSelector((state) => state.userCurrent);
  const dispatch = useDispatch();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user_profile"));
    dispatch(loadUserByIdStart(userInfo.id));
  }, [dispatch]);
  return (
    <PrivateRoute>
      <MainLayout>
        <MainContent title={"Profile"}>
          <div className={styles.wrapper}>
            <div className={styles.userDetail}>
              <Descriptions title="User Info">
                <Descriptions.Item label="Username">
                  {userInfo.username}
                </Descriptions.Item>
                <Descriptions.Item label="Full name">
                  {userInfo.fullName}
                </Descriptions.Item>
                <Descriptions.Item label="Gender" className={styles.gender}>
                  {userInfo.gender}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {userInfo.email}
                </Descriptions.Item>
                <Descriptions.Item label="Avatar">No Image</Descriptions.Item>
              </Descriptions>
              <UpdateProfile userInfo={userInfo} />
              <ChangePassword userInfo={users} />
            </div>
          </div>
        </MainContent>
        <ToastContainer autoClose={2000} />
      </MainLayout>
    </PrivateRoute>
  );
}

export default Profile;
