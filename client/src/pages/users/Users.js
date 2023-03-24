import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsersStart } from "../../redux/actions/usersAction";
import "react-toastify/dist/ReactToastify.css";

import styles from "./Users.module.scss";
import UsersList from "./UsersList";
import AddUser from "./AddUser/AddUser";
import MainContent from "../../components/MainLayout/MainContent";
import MainLayout from "../../components/MainLayout";
import { PrivateRoute } from "../../Common/PrivateRoute";

function Users() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(loadUsersStart());
  }, [dispatch]);
  return (
    <PrivateRoute>
      <MainLayout>
        <MainContent title={"Users"}>
          <div className={styles.wrapper}>
            <div className={styles.groupBtn}>
              <AddUser listUsers={users} />
            </div>
            <div className={styles.usersList}>
              <UsersList listUsers={users} />
            </div>
          </div>
        </MainContent>
      </MainLayout>
    </PrivateRoute>
  );
}

export default Users;
