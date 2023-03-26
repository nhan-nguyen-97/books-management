import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, Input, Form, Radio } from "antd";
import FileBase64 from "react-file-base64";

import { toast } from "react-toastify";
import {
  createUserStart,
  loadUsersStart,
} from "../../../redux/actions/usersAction";

function AddUser({ listUsers }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const initialValues = {
    username: "",
    password: "",
    fullName: "",
    gender: "male",
    email: "",
    avatar: "",
  };
  const [data, setData] = useState(initialValues);

  const handleSubmit = () => {
    const userExist = listUsers.find((user) => {
      return data.username === user.username;
    });
    if (data.username.length >= 6 && data.password && data.fullName) {
      if (!userExist) {
        dispatch(createUserStart(data));
        setIsModalOpen(false);
        setTimeout(() => {
          dispatch(loadUsersStart());
          toast.success("Add user successfully");
        }, 200);
        form.resetFields();
        setData(initialValues);
      } else {
        toast.error("Username already exist");
      }
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
    form.setFieldsValue(initialValues);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <Fragment>
      <Button type="primary" onClick={showModal}>
        Add new
      </Button>
      <Modal
        forceRender
        getContainer={false}
        title="Add new"
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
          initialValues={{ gender: "male" }}
        >
          <Form.Item
            label="Username"
            name="username"
            required
            rules={[
              { required: true, message: "Enter an Username" },
              {
                min: 6,
                max: 20,
                message: "Username must be between 6 and 20 characters",
              },
            ]}
          >
            <Input
              autoComplete="false"
              value={data.username}
              onChange={(e) => {
                setData({ ...data, username: e.target.value });
              }}
            ></Input>
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            required
            rules={[
              { required: true, message: "Enter a Password" },
              {
                min: 6,
                max: 50,
                message: `Password must be between 6 and 50 characters`,
              },
            ]}
          >
            <Input.Password
              value={data.password}
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
            ></Input.Password>
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
          <Form.Item
            label="Email"
            name="email"
            rules={[{ type: "email", message: "Email is not valid" }]}
          >
            <Input
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
            <Button type="primary" onClick={handleCancel}>
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

export default AddUser;
