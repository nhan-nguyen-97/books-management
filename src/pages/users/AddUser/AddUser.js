import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, Input, Form, Radio } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import {
  createUserStart,
  loadUsersStart,
} from "../../../redux/actions/usersAction";

function AddUser({ listUsers }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("male");
  const [email, setEmail] = useState("");
  // const [avatar, setAvatar] = useState("");

  const formValues = { username, password, fullName, gender, email };

  const handleSubmit = () => {
    let userExist = listUsers.filter((user) => {
      return username === user.username;
    });
    if (username.length >= 6 && password && fullName) {
      if (userExist.length === 0) {
        dispatch(createUserStart(formValues));
        setIsModalOpen(false);
        setTimeout(() => {
          dispatch(loadUsersStart());
          toast.success("Add user successfully");
        }, 200);
        form.resetFields();
      } else {
        toast.error("Username already exist");
      }
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
    form.setFieldsValue({ gender: "male" });
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
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
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
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
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
          <Form.Item
            label="Email"
            name="email"
            rules={[{ type: "email", message: "Email is not valid" }]}
          >
            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></Input>
          </Form.Item>
          {/* <Form.Item
            label="Avatar"
            name="avatar"
            valuePropName="fileList"
            getValueFromEvent={(event) => {
              return event?.fileList;
            }}
            rules={[
              {
                validator(_, fileList) {
                  return new Promise((resolve, reject) => {
                    if (fileList[0].size > 2000000) {
                      reject("Image size must be less than 2MB");
                    } else {
                      resolve("Successfully");
                    }
                  });
                },
              },
            ]}
          >
            <Upload
              // action={"http://localhost:3000/users"}
              customRequest={(info) => {
                setAvatar(info.file.uid);
              }}
              maxCount={1}
              listType="picture"
              accept=".png, .jpeg, .jpg"
              beforeUpload={(file) => {
                return new Promise((resolve, reject) => {
                  if (file.size > 2000000) {
                    reject("Image size must be less 2MB");
                  } else {
                    resolve("Successfully");
                  }
                });
              }}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item> */}
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
