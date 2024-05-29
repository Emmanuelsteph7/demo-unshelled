import { useEffect } from "react";
// import { ReactComponent as ChevronIcon } from "assets/svgs/chevron-down-arrow.svg";
import styles from "./pagination.module.css";

interface Props {
  currentPage: number;
  dataLength: number;
  postsPerPage?: number;
  displayedBtns?: number;
  currentPageFunc?: React.Dispatch<React.SetStateAction<number>>;
  onNavigate?: (val: number) => void;
  variant?: "client" | "backend";
  isLoading?: boolean;
  isFetching?: boolean;
}

const Pagination: React.FC<Props> = ({
  currentPage = 1,
  currentPageFunc,
  dataLength,
  postsPerPage = 10,
  displayedBtns = 5,
  onNavigate,
  variant = "client",
  isFetching,
  isLoading,
}) => {
  const pageNumbers: number[] = [];
  const mappedBtnsNumbers: number[] = [];
  // const { isMobile } = useMedia();

  const highestNumber = Math.ceil(dataLength / postsPerPage);

  for (let i = 1; i <= highestNumber; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const paginationIcons = document.querySelectorAll(
      "[data-name=pagination-btn]"
    );

    for (let i = 0; i < paginationIcons.length; i++) {
      paginationIcons[i].classList.remove(
        `${styles["pagination-button-active"]}`
      );

      if (Number(paginationIcons[i].innerHTML) === currentPage) {
        paginationIcons[i].classList.add(
          `${styles["pagination-button-active"]}`
        );
      }
    }
  }, [currentPage, isLoading]);

  const handlePagination = (
    e: React.MouseEvent<HTMLElement>,
    pageNumber: number
  ) => {
    if (variant === "client" && currentPageFunc) {
      currentPageFunc(pageNumber);
    }

    if (variant === "backend" && onNavigate) {
      onNavigate(pageNumber);
    }

    const paginationIcons = document.querySelectorAll(
      "[data-name=pagination-btn]"
    );

    paginationIcons.forEach((icon) => {
      icon.classList.remove(`${styles["pagination-button-active"]}`);
    });

    e.currentTarget.classList.add(`${styles["pagination-button-active"]}`);
  };

  const nextPagination = () => {
    if (variant === "client" && currentPageFunc) {
      if (currentPage === highestNumber) {
        return currentPageFunc((current: number) => current + 0);
      }
      currentPageFunc((current: number) => current + 1);
    }

    if (variant === "backend" && onNavigate) {
      if (currentPage === highestNumber) {
        return onNavigate(currentPage + 0);
      }

      onNavigate(currentPage + 1);
    }

    const paginationIcons = document.querySelectorAll(
      "[data-name=pagination-btn]"
    );

    for (let i = 0; i < paginationIcons.length; i++) {
      paginationIcons[i].classList.remove(
        `${styles["pagination-button-active"]}`
      );

      if (Number(paginationIcons[i].innerHTML) === currentPage + 1) {
        paginationIcons[i].classList.add(
          `${styles["pagination-button-active"]}`
        );
      }
    }
  };

  const prevPagination = () => {
    if (variant === "client" && currentPageFunc) {
      if (currentPage <= 1) {
        return currentPageFunc((current: number) => current - 0);
      }
      currentPageFunc((current: number) => current - 1);
    }

    if (variant === "backend" && onNavigate) {
      if (currentPage <= 1) {
        return onNavigate(currentPage - 0);
      }
      onNavigate(currentPage - 1);
    }

    const paginationIcons = document.querySelectorAll(
      "[data-name=pagination-btn]"
    );

    for (let i = 0; i < paginationIcons.length; i++) {
      paginationIcons[i].classList.remove(
        `${styles["pagination-button-active"]}`
      );

      if (Number(paginationIcons[i].innerHTML) === currentPage - 1) {
        paginationIcons[i].classList.add(
          `${styles["pagination-button-active"]}`
        );
      }
    }
  };

  const handlePaginate = (num: number) => {
    if (variant === "client" && currentPageFunc) {
      currentPageFunc(num);
    }

    if (variant === "backend" && onNavigate) {
      onNavigate(num);
    }
  };

  let maxLeft = currentPage - Math.floor(displayedBtns / 2);
  let maxRight = currentPage + Math.floor(displayedBtns / 2);

  if (maxLeft < 1) {
    maxLeft = 1;
    maxRight = displayedBtns;
  }

  if (maxRight > highestNumber) {
    maxRight = highestNumber;

    maxLeft = highestNumber - (displayedBtns - 1);

    if (maxLeft < 1) {
      maxLeft = 1;
    }
  }

  for (let i = maxLeft; i <= maxRight; i++) {
    mappedBtnsNumbers.push(i);
  }

  if (isLoading) return null;

  return (
    <div className={styles.pagination}>
      <button
        className={styles["pagination-button-controls"]}
        onClick={prevPagination}
        disabled={currentPage === 1 || isFetching}
      >
        <span className="pagination__nextText">Prev</span>
      </button>
      {!mappedBtnsNumbers.includes(1) && (
        <>
          <button
            disabled={isFetching}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick={(e) => handlePaginate(1)}
            className={`pagination__page hover:bg-purple-color-general/20 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer py-2 px-4 rounded`}
          >
            1
          </button>
          <div className="flex items-center">
            <span className="w-1 h-1 rounded bg-purple-color-general/80 mx-0.5"></span>
            <span className="w-1 h-1 rounded bg-purple-color-general/80 mx-0.5"></span>
          </div>
        </>
      )}
      {mappedBtnsNumbers !== undefined &&
        mappedBtnsNumbers.map((number) => {
          return (
            <button
              disabled={isFetching}
              onClick={(e) => handlePagination(e, number)}
              key={number}
              data-name="pagination-btn"
              className={`${styles["pagination-button"]}`}
            >
              {number}
            </button>
          );
        })}
      {!mappedBtnsNumbers.includes(highestNumber) && (
        <>
          <div className="flex items-center">
            <span className="w-1 h-1 rounded bg-purple-color-general/80 mx-0.5"></span>
            <span className="w-1 h-1 rounded bg-purple-color-general/80 mx-0.5"></span>
          </div>
          <button
            disabled={isFetching}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick={(e) => handlePaginate(highestNumber)}
            className={`pagination__page hover:bg-purple-color-general/20 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer py-2 px-4 rounded`}
          >
            {highestNumber}
          </button>
        </>
      )}
      <button
        className={styles["pagination-button-controls"]}
        onClick={nextPagination}
        disabled={currentPage === highestNumber || isFetching}
      >
        <span className="pagination__nextText">Next</span>
      </button>
    </div>
  );
};

export default Pagination;
