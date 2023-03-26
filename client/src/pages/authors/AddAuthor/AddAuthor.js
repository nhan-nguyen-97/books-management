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
  const initialValues = {
    name: "",
    DOB: "",
    died: "",
    gender: "male",
    placeOrigin: "",
  };
  const [data, setData] = useState(initialValues);

  const showModal = () => {
    setIsModalOpen(true);
    form.setFieldsValue(initialValues);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setData(initialValues)
  };

  const handleSubmit = () => {
    if (data.name) {
      dispatch(createAuthorStart(data));
      toast.success("Add author successfully");
      setIsModalOpen(false);
      setTimeout(() => {
        dispatch(loadAuthorsStart());
      }, 200);
      form.resetFields();
      setData(initialValues)
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
          initialValues={initialValues}
        >
          <Form.Item
            label="Name"
            name="name"
            required
            rules={[{ required: true, message: "Enter an Username" }]}
          >
            <Input
              value={data.name}
              onChange={(e) => {
                setData({ ...data, name: e.target.value });
              }}
            ></Input>
          </Form.Item>
          <Form.Item name="DOB" label="Birthday">
            <DatePicker
              format="DD/MM/YYYY"
              value={data.DOB}
              onChange={(_, dateString) =>
                setData({ ...data, DOB: dateString })
              }
            />
          </Form.Item>
          <Form.Item name="died" label="Died">
            <DatePicker
              format="DD/MM/YYYY"
              value={data.died}
              onChange={(_, dateString) =>
                setData({ ...data, died: dateString })
              }
            />
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
          <Form.Item label="Origin" name="placeOrigin">
            <Input
              value={data.placeOrigin}
              onChange={(e) =>
                setData({ ...data, placeOrigin: e.target.value })
              }
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
