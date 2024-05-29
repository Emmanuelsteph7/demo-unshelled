import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDeletePost, useFetchSinglePost } from "../../hooks/queries/posts";
import { getKeyAndValuesFromData } from "../../utils/getKeyAndValuesFromData";
import { capitalize } from "../../utils/capitalize";
import { Path } from "../../navigations/routes";
import styles from "./itemDetail.module.css";
import { resolveAxiosError } from "../../utils/resolveAxiosError";

const ItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading } = useFetchSinglePost({ id: id || "" });

  const { mutateAsync, isPending } = useDeletePost();

  const handleDeletePost = async () => {
    try {
      const res = await mutateAsync({ id: id || "" });

      if (res) {
        alert(`${data?.name} deleted successfully`);
        navigate(Path.Home);
      }
    } catch (error: any) {
      const errMessage = resolveAxiosError(error).message;
      alert(errMessage);
    }
  };

  const mappedData = getKeyAndValuesFromData(data?.data);
  const editUrl = `${Path.EditPost}/${id}`;

  return (
    <div>
      <h1 className="page-header">Post details</h1>
      {isLoading && <div>Loading...</div>}
      {!isLoading && data && (
        <div>
          <Link className={styles["detail-back-link"]} to={Path.Home}>
            {"<"} Back to Home
          </Link>
          <h2 className={styles["detail-header"]}>{data.name}</h2>
          <div className={styles["detail-properties"]}>
            {mappedData.map(({ key, value }) => (
              <div key={key} className={styles["detail-property"]}>
                <span>
                  <span className={styles["detail-property-key"]}>
                    {capitalize(key)}:
                  </span>{" "}
                  {value}
                </span>
              </div>
            ))}
          </div>
          <div className={styles["detail-cta"]}>
            <Link className={styles["detail-cta-btn"]} to={editUrl}>
              Edit
            </Link>
            <button
              onClick={handleDeletePost}
              disabled={isPending}
              className={styles["detail-cta-btn"]}
            >
              {isPending ? "Loading..." : "Delete"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
