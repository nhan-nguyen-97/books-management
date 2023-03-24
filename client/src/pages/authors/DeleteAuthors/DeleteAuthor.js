import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";


import styles from "./DeleteAuthor.module.scss";
import {
  deleteAuthorStart,
  loadAuthorsStart,
} from "../../../redux/actions/authorsAction";

function DeleteAuthor({ authorId }) {
  const dispatch = useDispatch();

  const handleDeleteAuthor = () => {
    if (window.confirm("Are you sure that you wanted to delete that author?")) {
      dispatch(deleteAuthorStart(authorId));
      toast.success("Delete author successfully")
      setTimeout(() => {
        dispatch(loadAuthorsStart());
      }, 200);
    }
  };
  return (
    <FontAwesomeIcon
      onClick={handleDeleteAuthor}
      className={styles.delete}
      icon={faTrashCan}
    />
  );
}

export default DeleteAuthor;
