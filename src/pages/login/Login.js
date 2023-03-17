import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./Login.module.scss";
import { loadUsersStart } from "../../redux/actions/usersAction";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { users } = useSelector((state) => state.users);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsersStart());
  }, [dispatch]);

  const handleLoginClick = () => {
    if (username && password) {
      let userPass = users.filter((user) => {
        return username === user.username && password === user.password;
      });
      const userProfile = userPass[0];
      if (userPass.length === 1) {
        localStorage.setItem("id_token", `${userProfile.id}`);
        localStorage.setItem("user_profile", JSON.stringify(userProfile));
        navigate("/");
      } else {
        toast.error("Username or Password do not match");
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>Books Management</h2>
          <p>Please enter your account</p>
        </div>
        <div className={styles.loginForm}>
          <Form layout="vertical" autoComplete="off">
            <Form.Item
              name="username"
              required
              rules={[{ required: true, message: "Please enter an Username" }]}
            >
              <Input
                placeholder="Enter an Username"
                onChange={(e) => setUsername(e.target.value)}
              ></Input>
            </Form.Item>
            <Form.Item
              name="password"
              required
              rules={[{ required: true, message: "Please enter a Password" }]}
            >
              <Input
                type="password"
                placeholder="Enter a Password"
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
            </Form.Item>
            <Button
              htmlType="submit"
              style={{ width: "100%" }}
              className={styles.btn}
              onClick={handleLoginClick}
            >
              Sign in
            </Button>
          </Form>
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
}
