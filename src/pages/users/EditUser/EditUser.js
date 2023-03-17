import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, Input, Form, Radio } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";

import styles from "./EditUser.module.scss";
import {
  loadUsersStart,
  updateUserStart,
} from "../../../redux/actions/usersAction";

function EditUser({ userData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState(userData.fullName);
  const [gender, setGender] = useState(userData.gender);
  const [email, setEmail] = useState(userData.email);
  const id = userData.id;
  const username = userData.username;

  const initialValues = {
    username,
    fullName: userData.fullName,
    gender: userData.gender,
    email: userData.email
  }

  const formValues = { username, fullName, gender, email };

  const showModal = () => {
    setIsModalOpen(true);
    form.setFieldsValue(initialValues);
  };
  const handleSubmit = () => {
    if (fullName) {
      dispatch(updateUserStart({ id, formValues }));
      setIsModalOpen(false);
      setTimeout(() => {
        dispatch(loadUsersStart());
        toast.success("Update user successfully");
      }, 200);
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
      <FontAwesomeIcon
        className={styles.edit}
        icon={faPenToSquare}
        onClick={showModal}
      />
      <Modal
        forceRender
        title={`Update ${userData.fullName}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        style={{ width: 500 }}
        destroyOnClose={true}
      >
        <Form
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
            label="Username"
            name="username"
            required
            rules={[{ required: true, message: "Enter an Username" }]}
          >
            <Input value={username} disabled></Input>
          </Form.Item>
          <Form.Item
            label="Full name"
            name="fullName"
            required
            rules={[{ required: true, message: "Enter a Full name" }]}
          >
            <Input
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
            ></Input>
          </Form.Item>
          <Form.Item label="Gender" name="gender">
            <Radio.Group
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
            >
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
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

export default EditUser;
