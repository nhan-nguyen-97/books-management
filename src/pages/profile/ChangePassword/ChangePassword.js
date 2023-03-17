import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, Input, Form } from "antd";
import { toast } from "react-toastify";

import {
  loadUserByIdStart,
  updateUserStart,
} from "../../../redux/actions/usersAction";
import styles from "./ChangePassword.module.scss";

function ChangePassword({ userInfo }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const id = userInfo.id;
  const username = userInfo.username;
  const fullName = userInfo.fullName;
  const password = userInfo.password;
  const gender = userInfo.gender;
  const email = userInfo.email;

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const userId = userInfo.id;

  const formValues = {
    id,
    username,
    password: newPassword,
    fullName,
    gender,
    email,
  };

  const showModal = () => {
    setIsModalOpen(true);
    form.setFieldsValue(initialValues);
  };
  const handleSubmit = () => {
    if (newPassword === confirmPassword) {
      dispatch(updateUserStart({ id, formValues }));
      localStorage.setItem("user_profile", JSON.stringify(formValues));
      setIsModalOpen(false);
      setTimeout(() => {
        dispatch(loadUserByIdStart(userId));
        toast.success("Change password successfully");
      }, 200);
    } else if (currentPassword !== password) {
      toast.error("Current password do not match");
    }
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Fragment>
      <Button
        type="primary"
        title="Update"
        onClick={showModal}
        style={{ marginLeft: 20 }}
      >
        Change Password
      </Button>
      <Modal
        forceRender
        title={"Change Password"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        style={{ width: 500 }}
        destroyOnClose={true}
      >
        <Form
          className={styles.form}
          form={form}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          initialValues={initialValues}
        >
          <Form.Item
            label="Current Password"
            name="currentPassword"
            required
            rules={[{ required: true, message: "Enter a Current password" }]}
          >
            <Input
              type="password"
              className={styles.input}
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
              }}
            ></Input>
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            required
            rules={[
              { required: true, message: "Enter a New password" },
              {
                min: 6,
                max: 50,
                message: `Password must be between 6 and 50 characters`,
              },
            ]}
          >
            <Input
              type="password"
              className={styles.input}
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            ></Input>
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={[newPassword]}
            hasFeedback
            required
            rules={[
              { required: true, message: "Enter a New password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Confirm password do not match!")
                  );
                },
              }),
            ]}
          >
            <Input
              type="password"
              className={styles.input}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            ></Input>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="cancel" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                margin: "0 8px",
              }}
              onClick={handleSubmit}
              disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
}

export default ChangePassword;
