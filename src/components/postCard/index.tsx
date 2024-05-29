import React from "react";
import { Api } from "../../types";
import styles from "./postCard.module.css";
import { Link } from "react-router-dom";
import { Path } from "../../navigations/routes";
import { getKeyAndValuesFromData } from "../../utils/getKeyAndValuesFromData";
import { capitalize } from "../../utils/capitalize";

interface Props {
  post: Api.General.Post;
}

const PostCard = ({ post }: Props) => {
  const { name, id, data } = post;

  const viewUrl = `${Path.Post}/${id}`;
  const editUrl = `${Path.EditPost}/${id}`;

  const mappedData = getKeyAndValuesFromData(data);
  const slicedMappedData = mappedData.slice(0, 2);
  const isEmpty = mappedData.length === 0;

  return (
    <div className={styles["post-card"]}>
      <h4 className={styles["post-card-header"]}>{name}</h4>
      <div className={styles["post-card-properties"]}>
        {isEmpty && (
          <div>
            <p className={styles["post-card-property-item"]}>
              No property available
            </p>
          </div>
        )}
        {slicedMappedData.map(({ key, value }) => (
          <div className={styles["post-card-property"]} key={key}>
            <span className={styles["post-card-property-item"]}>
              <span className={styles["post-card-property-item-key"]}>
                {capitalize(key)}:
              </span>{" "}
              {value}
            </span>
          </div>
        ))}
      </div>
      <div className={styles["post-card-cta"]}>
        <Link className={styles["post-card-cta-btn"]} to={viewUrl}>
          View
        </Link>
        <Link className={styles["post-card-cta-btn"]} to={editUrl}>
          Edit
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
