import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, Input, Form, Radio } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";
import FileBase64 from "react-file-base64";

import styles from "./EditUser.module.scss";
import {
  loadUsersStart,
  updateUserStart,
} from "../../../redux/actions/usersAction";

function EditUser({ userData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    id: userData.id,
    username: userData.username,
    password: userData.password,
    fullName: userData.fullName,
    gender: userData.gender,
    email: userData.email,
    avatar: userData.avatar,
  });
  const initialValues = {
    username: userData.username,
    fullName: userData.fullName,
    gender: userData.gender,
    email: userData.email,
  };

  const formValues = {
    ...data,
    fullName: data.fullName,
    gender: data.gender,
    email: data.email,
  };
  const showModal = () => {
    setIsModalOpen(true);
    form.setFieldsValue(initialValues);
  };
  const handleSubmit = () => {
    const id = userData.id;
    if (data.fullName) {
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
    setData({
      ...data,
      fullName: userData.fullName,
      gender: userData.gender,
      email: userData.email,
    });
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
            <Input value={data.username} disabled></Input>
          </Form.Item>
          <Form.Item
            label="Full name"
            name="fullName"
            required
            rules={[{ required: true, message: "Enter a Full name" }]}
          >
            <Input
              value={data.fullName}
              onChange={(e) => {
                setData({ ...data, fullName: e.target.value });
              }}
            ></Input>
          </Form.Item>
          <Form.Item label="Gender" name="gender">
            <Radio.Group
              value={data.gender}
              onChange={(e) => {
                setData({ ...data, gender: e.target.value });
              }}
            >
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input
              type="email"
              value={data.email}
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
            ></Input>
          </Form.Item>
          <FileBase64
            accept="image/*"
            multiple={false}
            type="file"
            value={data.avatar}
            onDone={({ base64 }) => setData({ ...data, avatar: base64 })}
          />
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
                !form.isFieldsTouched(false) ||
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
