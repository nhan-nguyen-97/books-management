import { Space, Table } from "antd";

import DeleteBook from "../DeleteBook";
import EditBook from "../EditBook/EditBook";

const { Column } = Table;

function BooksList({ listBooks, listAuthors }) {
  return (
    <Table
      dataSource={listBooks}
      pagination={{
        pageSize: 9,
      }}
      rowKey="id"
    >
      <Column title="Name" dataIndex="name" key="name" />
      <Column title="Author" dataIndex="author" key="author" />
      <Column title="Published" dataIndex="published" key="published" />
      <Column title="Price" dataIndex="price" key="price" />
      <Column
        title="Action"
        key="action"
        render={(_, record) => (
          <Space size="middle">
            <EditBook bookData={record} authorData={listAuthors} />
            <DeleteBook bookId={record.id} />
          </Space>
        )}
      />
    </Table>
  );
}

export default BooksList;
