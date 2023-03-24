import { Fragment, useState } from "react";
import { Button, Modal, Input, Radio, DatePicker, Form } from "antd";

import { useDispatch } from "react-redux";
import {
  createAuthorStart,
  loadAuthorsStart,
} from "../../../redux/actions/authorsAction";
import { toast } from "react-toastify";

function AddAuthor() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [name, setName] = useState("");
  const [DOB, setDOB] = useState("");
  const [died, setDied] = useState("");
  const [gender, setGender] = useState("male");
  const [placeOrigin, setPlaceOrigin] = useState("");

  const formValues = { name, DOB, died, gender, placeOrigin };

  const showModal = () => {
    setIsModalOpen(true);
    form.setFieldsValue({
      gender: "male",
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSubmit = () => {
    if (name) {
      dispatch(createAuthorStart(formValues));
      toast.success("Add author successfully")
      setIsModalOpen(false);
      setTimeout(() => {
        dispatch(loadAuthorsStart());
      }, 200);
      form.resetFields();
    }
  };

  return (
    <Fragment>
      <Button type="primary" onClick={showModal}>
        Add new
      </Button>
      <Modal
        forceRender
        title="Add new"
        open={isModalOpen}
        onCancel={handleCancel}
        okText="Save"
        footer={null}
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
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            label="Name"
            name="name"
            required
            rules={[{ required: true, message: "Enter an Username" }]}
          >
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></Input>
          </Form.Item>
          <Form.Item name="DOB" label="Birthday">
            <DatePicker
              format="DD/MM/YYYY"
              value={DOB}
              onChange={(_, dateString) => setDOB(dateString)}
            />
          </Form.Item>
          <Form.Item name="died" label="Died">
            <DatePicker
              format="DD/MM/YYYY"
              value={died}
              onChange={(_, dateString) => setDied(dateString)}
            />
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
          <Form.Item label="Origin" name="placeOrigin">
            <Input
              value={placeOrigin}
              onChange={(e) => setPlaceOrigin(e.target.value)}
            ></Input>
          </Form.Item>
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

export default AddAuthor;
