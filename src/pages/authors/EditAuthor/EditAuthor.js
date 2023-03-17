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
  const [name, setName] = useState(authorData.name);
  const [DOB, setDOB] = useState(authorData.DOB);
  const [died, setDied] = useState(authorData.died);
  const [gender, setGender] = useState(authorData.gender);
  const [placeOrigin, setPlaceOrigin] = useState(authorData.placeOrigin);

  const initialValues = {
    name: authorData.name,
    DOB: dayjs(`${authorData.DOB}`, "DD/MM/YYYY"),
    died: dayjs(`${authorData.died}`, "DD/MM/YYYY"),
    gender: authorData.gender,
    placeOrigin: authorData.placeOrigin,
  };

  const formValues = { name, DOB, died, gender, placeOrigin };

  const id = authorData.id;

  const showModal = () => {
    setIsModalOpen(true);
    form.setFieldsValue({
      name: authorData.name,
      gender,
      placeOrigin,
    });
  };
  const handleSubmit = () => {
    dispatch(updateAuthorStart({ id, formValues }));
    toast.success("Update author successfully")
    setIsModalOpen(false);
    setTimeout(() => {
      dispatch(loadAuthorsStart());
    }, 200);
    form.resetFields();
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
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
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

export default EditAuthor;
