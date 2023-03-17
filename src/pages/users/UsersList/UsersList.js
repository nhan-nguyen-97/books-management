import { Space, Table } from "antd";

import styles from "./UsersList.module.scss";
import DeleteUser from "../DeleteUser";
import EditUser from "../EditUser";

const { Column } = Table;

function UsersList({ listUsers }) {
  return (
    <Table dataSource={listUsers} pagination={{ pageSize: 9 }} rowKey="id">
      {/* <Column title="Avatar" dataIndex="avatar" key="avatar"></Column> */}
      <Column title="Username" dataIndex="username" key="username" />
      <Column title="Name" dataIndex="fullName" key="fullName" />
      <Column
        className={styles.gender}
        title="Gender"
        dataIndex="gender"
        key="gender"
      />
      <Column title="Email" dataIndex="email" key="email" />
      <Column
        title="Action"
        key="action"
        render={(_, record) => (
          <Space size="middle">
            <EditUser userData={record} />
            <DeleteUser userId={record.id} />
          </Space>
        )}
      />
    </Table>
  );
}

export default UsersList;
