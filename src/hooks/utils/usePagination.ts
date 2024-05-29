import { useState } from "react";

interface IUsePaginationOptions {
  initialPageNumber?: number;
  postsPerPage?: number;
}

const usePagination = <T>(data: T[], options?: IUsePaginationOptions) => {
  const [currentPage, setCurrentPage] = useState(
    options?.initialPageNumber || 1
  );
  const [numOfPagePosts] = useState(options?.postsPerPage || 10);

  const highestPageNumber = Math.ceil(data.length / numOfPagePosts);
  const indexOfLastPost = currentPage * numOfPagePosts;
  const indexOfFirstPost = indexOfLastPost - numOfPagePosts;
  const slicedPosts = data?.slice(indexOfFirstPost, indexOfLastPost);
  const dataLength = data.length;
  const shownData =
    currentPage === highestPageNumber
      ? dataLength
      : currentPage * numOfPagePosts;

  return {
    slicedPosts,
    currentPage,
    setCurrentPage,
    numOfPagePosts,
    dataLength,
    shownData,
  };
};

export default usePagination;
