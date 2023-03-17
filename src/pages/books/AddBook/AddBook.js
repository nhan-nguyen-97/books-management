import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  Button,
  Modal,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Form,
} from "antd";
import {
  createBookStart,
  loadBooksStart,
} from "../../../redux/actions/booksAction";

function AddBook({ listAuthors }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");

  const initialValues = {
    name: "",
    price: 0,
    author: "",
    published: "",
  };

  const formValues = { name, price, author, published };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  // Get data Authors for Add new Book
  const options = [];
  listAuthors.map((author) => {
    options.push({
      value: author.name,
      label: author.name,
    });
    return options;
  });

  const handleSubmit = () => {
    if (name) {
      dispatch(createBookStart(formValues));
      toast.success("Add book successfully");
      setIsModalOpen(false);
      setTimeout(() => {
        dispatch(loadBooksStart());
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
        onOk={handleOk}
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
            rules={[{ required: true, message: "Please enter Name" }]}
          >
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></Input>
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

export default AddBook;
