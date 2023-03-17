import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  Button,
  Modal,
  Input,
  Form,
  InputNumber,
  DatePicker,
  Select,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import styles from "./EditBook.module.scss";
import {
  updateBookStart,
  loadBooksStart,
} from "../../../redux/actions/booksAction";
dayjs.extend(customParseFormat);

function EditBook({ bookData, authorData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [name, setName] = useState(bookData.name);
  const [price, setPrice] = useState(bookData.price);
  const [author, setAuthor] = useState(bookData.author);
  const [published, setPublished] = useState(bookData.published);

  const initialValues = {
    name: bookData.name,
    price: bookData.price,
    author: bookData.author,
    published: dayjs(`${bookData.published}`, "YYYY"),
  };

  const formValues = { name, price, author, published };
  const id = bookData.id;

  const showModal = () => {
    setIsModalOpen(true);
    form.setFieldsValue(initialValues);
  };

  // Get data Authors for Add new Book
  const options = [];
  authorData.map((author) => {
    options.push({
      value: author.name,
      label: author.name,
    });
    return options;
  });

  const handleSubmit = () => {
    dispatch(updateBookStart({ id, formValues }));
    toast.success("Update book successfully");
    setIsModalOpen(false);
    setTimeout(() => {
      dispatch(loadBooksStart());
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
        className={styles.edit}
        icon={faPenToSquare}
        onClick={showModal}
      />
      <Modal
        forceRender
        title={`Update ${bookData.name}`}
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
            name={"name"}
            required
            rules={[{ required: true, message: "Please enter Name" }]}
          >
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Price" name={"price"}>
            <InputNumber
              value={price}
              min={0}
              max={10000000}
              step={1000}
              style={{ width: 275 }}
              onChange={(value) => setPrice(value)}
            />
          </Form.Item>
          <Form.Item label="Author" name={"author"}>
            <Select
              options={options}
              onChange={(value) => setAuthor(value)}
            ></Select>
          </Form.Item>
          <Form.Item label="Published" name={"published"}>
            <DatePicker
              format="YYYY"
              value={published}
              onChange={(data) => setPublished(data.$y)}
              picker="year"
            />
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

export default EditBook;
