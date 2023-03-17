import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  deleteUserStart,
  loadUsersStart,
} from "../../../redux/actions/usersAction";
import styles from "./DeleteUser.module.scss";
import { Fragment } from "react";

function DeleteUser({ userId }) {
  const dispatch = useDispatch();

  const handleDeleteUser = () => {
    if (window.confirm("Are you sure that you wanted to delete that user?")) {
      dispatch(deleteUserStart(userId));
      toast.success("Delete user Successfully");
      setTimeout(() => {
        dispatch(loadUsersStart());
      }, 200);
    }
  };
  return (
    <Fragment>
      <FontAwesomeIcon
        onClick={handleDeleteUser}
        className={styles.delete}
        icon={faTrashCan}
      />
    </Fragment>
  );
}

export default DeleteUser;
