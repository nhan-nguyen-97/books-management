import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, Input, Form, Radio, DatePicker } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { toast } from "react-toastify";

import styles from "./EditAuthor.module.scss";
import {
  loadAuthorsStart,
  updateAuthorStart,
} from "../../../redux/actions/authorsAction";
dayjs.extend(customParseFormat);

function EditAuthor({ authorData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [data, setData] = useState({
    id: authorData.id,
    name: authorData.name,
    DOB: authorData.DOB,
    died: authorData.died,
    gender: authorData.gender,
    placeOrigin: authorData.placeOrigin,
  });

  const initialValues = {
    name: authorData.name,
    DOB: dayjs(`${authorData.DOB}`, "DD/MM/YYYY"),
    died: dayjs(`${authorData.died}`, "DD/MM/YYYY"),
    gender: authorData.gender,
    placeOrigin: authorData.placeOrigin,
  };

  const formValues = {
    ...data,
    name: data.name,
    DOB: data.DOB,
    died: data.died,
    gender: data.gender,
    placeOrigin: data.placeOrigin,
  };

  const id = authorData.id;

  const showModal = () => {
    setIsModalOpen(true);
    form.setFieldsValue(initialValues);
  };
  const handleSubmit = () => {
    dispatch(updateAuthorStart({ id, formValues }));
    toast.success("Update author successfully");
    setIsModalOpen(false);
    setTimeout(() => {
      dispatch(loadAuthorsStart());
    }, 200);
    form.resetFields();
  };
  const handleOk = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const handleCancel = () => {
    setData({
      ...data,
      name: authorData.name,
      DOB: dayjs(`${authorData.DOB}`, "DD/MM/YYYY"),
      died: dayjs(`${authorData.died}`, "DD/MM/YYYY"),
      gender: authorData.gender,
      placeOrigin: authorData.placeOrigin,
    });
    setIsModalOpen(false);
  };

  return (
    <Fragment>
      <FontAwesomeIcon
        onClick={showModal}
        className={styles.edit}
        icon={faPenToSquare}
      />
      <Modal
        forceRender
        title={`Update ${authorData.name}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
        footer={null}
        destroyOnClose={true}
      >
        <Form
          form={form}
          initialValues={initialValues}
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
              value={data.name}
              onChange={(e) => {
                setData({ ...data, name: e.target.value });
              }}
            />
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

export default EditAuthor;
