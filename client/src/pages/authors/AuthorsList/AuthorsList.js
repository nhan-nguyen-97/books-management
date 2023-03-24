import { Space, Table } from "antd";

import styles from "./AuthorsList.module.scss";
import DeleteAuthor from "../DeleteAuthors";
import EditAuthor from "../EditAuthor";

const { Column } = Table;

function UsersList({ listAuthors }) {
  return (
    <Table dataSource={listAuthors} pagination={{ pageSize: 9 }} rowKey="id">
      <Column title="Name" dataIndex="name" key="name" />
      <Column title="Date of Birth" dataIndex="DOB" key="DOB"></Column>
      <Column title="Died" dataIndex="died" key="died"></Column>
      <Column
        className={styles.gender}
        title="Gender"
        dataIndex="gender"
        key="gender"
      ></Column>
      <Column
        title="Place of origin"
        dataIndex="placeOrigin"
        key="placeOrigin"
      />
      <Column
        title="Action"
        key="action"
        render={(_, record) => (
          <Space size="middle">
            <EditAuthor authorData={record} />
            <DeleteAuthor authorId={record.id} />
          </Space>
        )}
      />
    </Table>
  );
}

export default UsersList;
