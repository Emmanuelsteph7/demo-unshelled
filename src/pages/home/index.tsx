import React from "react";
import { useFetchAllPosts } from "../../hooks/queries/posts";
import PostCard from "../../components/postCard";
import styles from "./home.module.css";
import usePagination from "../../hooks/utils/usePagination";
import Pagination from "../../components/pagination";

const POST_DISPLAY_ITEMS = 9;

const Home = () => {
  const { data = [], isLoading } = useFetchAllPosts();

  const { currentPage, dataLength, setCurrentPage, slicedPosts } =
    usePagination(data, { postsPerPage: POST_DISPLAY_ITEMS });

  return (
    <div>
      <h1 className="page-header">All posts</h1>
      {isLoading && <div>Loading...</div>}
      <div className={styles["home-posts-grid"]}>
        {slicedPosts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
      <div className={styles["home-pagination-container"]}>
        <Pagination
          currentPage={currentPage}
          dataLength={dataLength}
          currentPageFunc={setCurrentPage}
          isLoading={isLoading}
          postsPerPage={POST_DISPLAY_ITEMS}
        />
      </div>
    </div>
  );
};

export default Home;
