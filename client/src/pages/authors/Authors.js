import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import styles from "./Authors.module.scss";
import MainLayout from "../../components/MainLayout";
import AddAuthor from "./AddAuthor";
import AuthorsList from "./AuthorsList";
import { loadAuthorsStart } from "../../redux/actions/authorsAction";
import MainContent from "../../components/MainLayout/MainContent";
import { PrivateRoute } from "../../Common/PrivateRoute";

function Authors() {
  const dispatch = useDispatch();
  const { authors } = useSelector((state) => state.authors);
  useEffect(() => {
    dispatch(loadAuthorsStart());
  }, [dispatch]);

  return (
    <PrivateRoute>
      <MainLayout>
        <MainContent title="Authors">
          <div className={styles.wrapper}>
            <div className={styles.groupBtn}>
              <AddAuthor />
            </div>
            <div className={styles.authorsList}>
              <AuthorsList listAuthors={authors} />
            </div>
          </div>
        </MainContent>
      </MainLayout>
    </PrivateRoute>
  );
}

export default Authors;
