import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, Input, Form, Radio } from "antd";
import { toast } from "react-toastify";

import {
  loadUserByIdStart,
  updateUserStart,
} from "../../../redux/actions/usersAction";

function UpdateProfile({ userInfo }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const initialValues = {
    fullName: userInfo.fullName,
    gender: userInfo.gender,
    email: userInfo.email,
  };
  const [data, setData] = useState({
    id: userInfo.id,
    username: userInfo.username,
    password: userInfo.password,
    fullName: userInfo.fullName,
    gender: userInfo.gender,
    email: userInfo.email,
    avatar: userInfo.avatar,
  });
  const { id } = userInfo;

  const formValues = {
    ...data,
    fullName: data.fullName,
    gender: data.gender,
    email: data.email,
  };

  console.log(data);
  const showModal = () => {
    setIsModalOpen(true);
    form.setFieldsValue(initialValues);
  };
  const handleSubmit = () => {
    if (data.fullName) {
      dispatch(updateUserStart({ id, formValues }));
      localStorage.setItem("user_profile", JSON.stringify(formValues));
      setIsModalOpen(false);
      // setData(initialValues)
      setTimeout(() => {
        dispatch(loadUserByIdStart(id));
        toast.success("Update profile successfully");
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
      <Button type="primary" title="Update" onClick={showModal}>
        Update
      </Button>
      <Modal
        forceRender
        title={`Update Profile`}
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
            label="Full name"
            name="fullName"
            required
            rules={[{ required: true, message: "Enter a Full name" }]}
          >
            <Input
              value={data.fullName}
              onChange={(e) => setData({ ...data, fullName: e.target.value })}
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

export default UpdateProfile;
