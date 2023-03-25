import { Space, Table } from "antd";
// import moment from "moment";

import styles from "./UsersList.module.scss";
import DeleteUser from "../DeleteUser";
import EditUser from "../EditUser";
import noAvatar from "../../../assets/Images/noAvatar.jpg";

const { Column } = Table;

function UsersList({ listUsers }) {
  return (
    <Table dataSource={listUsers} pagination={{ pageSize: 9 }} rowKey="id">
      <Column
        title="Avatar"
        dataIndex="avatar"
        key="avatar"
        render={(_, record) => (
          <img
            src={record.avatar ? `${record.avatar}` : `${noAvatar}`}
            alt="Avatar"
            className={styles.avatar}
          />
        )}
      ></Column>
      <Column title="Username" dataIndex="username" key="username" />
      <Column title="Name" dataIndex="fullName" key="fullName" />
      <Column
        className={styles.gender}
        title="Gender"
        dataIndex="gender"
        key="gender"
      />
      <Column title="Email" dataIndex="email" key="email" />
      {/* <Column
        title="Created at"
        dataIndex={moment(listUsers[0].createdAt)}
        key="createdAt"
      /> */}
      <Column
        title="Action"
        key="action"
        render={(_, record) => (
          <Space size="middle">
            <EditUser userData={record} />
            {record.username !== "admin" && <DeleteUser userId={record.id} />}
          </Space>
        )}
      />
    </Table>
  );
}

export default UsersList;
