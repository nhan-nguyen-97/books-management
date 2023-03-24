import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";

import styles from "./DeleteBook.module.scss";
import {
  deleteBookStart,
  loadBooksStart,
} from "../../../redux/actions/booksAction";

function DeleteBook({ bookId }) {
  const dispatch = useDispatch();
  const handleDeleteBook = () => {
    if (window.confirm("Are you sure that you wanted to delete that book?")) {
      dispatch(deleteBookStart(bookId));
      toast.success("Delete book successfully");
      setTimeout(() => {
        dispatch(loadBooksStart());
      }, 200);
    }
  };

  return (
    <FontAwesomeIcon
      className={styles.delete}
      icon={faTrashCan}
      onClick={handleDeleteBook}
    />
  );
}

export default DeleteBook;
