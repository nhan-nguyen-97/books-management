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
  const [data, setData] = useState({
    name: "",
    price: 0,
    author: "",
    published: "",
  });

  const initialValues = {
    name: "",
    price: 0,
    author: "",
    published: "",
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
    setData(initialValues)
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
    if (data.name) {
      dispatch(createBookStart(data));
      toast.success("Add book successfully");
      setIsModalOpen(false);
      setTimeout(() => {
        dispatch(loadBooksStart());
      }, 200);
      form.resetFields();
      setData({ ...data, price: 0, author: "", published: "" });
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
              value={data.name}
              onChange={(e) => {
                setData({ ...data, name: e.target.value });
              }}
            ></Input>
          </Form.Item>
          <Form.Item label="Price" name={"price"}>
            <InputNumber
              value={data.price}
              min={0}
              max={10000000}
              step={1000}
              style={{ width: 275 }}
              onChange={(value) => setData({ ...data, price: value })}
            />
          </Form.Item>
          <Form.Item label="Author" name={"author"}>
            <Select
              options={options}
              onChange={(value) => setData({ ...data, author: value })}
            ></Select>
          </Form.Item>
          <Form.Item label="Published" name={"published"}>
            <DatePicker
              format="YYYY"
              value={data.published}
              onChange={(_, dateString) =>
                setData({ ...data, published: dateString })
              }
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
