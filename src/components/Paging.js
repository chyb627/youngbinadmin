/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';

const Paging = ({ postsPerPage, totalPosts, paginate, currentPage, onChangeRow, staticPostsPerPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  // 1페이지로 가기
  const onClickPprev = () => {
    if (currentPage > 1) {
      paginate(1);
      const URLSearch = window.location.search;
      if (URLSearch.length > 0) {
        const arr = URLSearch.split('&page=');
        window.location.replace(`/${arr[0]}&page=1`);
      }
    }
  };

  // 이전페이지로 가기
  const onClickPrev = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
      const URLSearch = window.location.search;
      if (URLSearch.length > 0) {
        const arr = URLSearch.split('&page=');
        window.location.replace(`/${arr[0]}&page=${Number(currentPage) - 1}`);
      }
    } else {
      paginate(1);
    }
  };

  // 다음페이지로 가기
  const onClickNext = () => {
    if (currentPage < pageNumbers.length) {
      paginate(currentPage + 1);
      const URLSearch = window.location.search;
      if (URLSearch.length > 0) {
        const arr = URLSearch.split('&page=');
        window.location.replace(`/${arr[0]}&page=${Number(currentPage) + 1}`);
      } else {
        window.location.replace(`/?text=&condition=all&row=10&page=${Number(currentPage) + 1}`);
      }
    } else {
      paginate(pageNumbers.length);
    }
  };

  // 마지막페이지로 가기
  const onClickNnext = () => {
    if (currentPage < pageNumbers.length) {
      paginate(pageNumbers.length);

      const URLSearch = window.location.search;
      if (URLSearch.length > 0) {
        const arr = URLSearch.split('&page=');
        window.location.replace(`/${arr[0]}&page=${pageNumbers.length}`);
      } else {
        window.location.replace(`/?text=&condition=all&row=10&page=${pageNumbers.length}`);
      }
    }
  };

  return (
    <div className="page_wrap">
      <select onChange={onChangeRow} className="page_selecter" defaultValue={staticPostsPerPage}>
        <option value="10">10줄 보기</option>
        <option value="15">15줄 보기</option>
        <option value="50">50줄 보기</option>
      </select>

      <div className="page_nation">
        <a className="arrow pprev" onClick={onClickPprev}></a>
        <a className="arrow prev" onClick={onClickPrev}></a>

        {pageNumbers &&
          pageNumbers.map((number, index) => {
            const numberClick = () => {
              paginate(number);
              const URLSearch = window.location.search;
              const arr = URLSearch.split('&page=');
              if (URLSearch.length > 0) {
                window.location.replace(`/${arr[0]}&page=${number}`);
              } else {
                window.location.replace(`/?text=&condition=all&row=10&page=${number}`);
              }
            };

            return (
              <a
                onClick={numberClick}
                key={index}
                value={index + 1}
                className={`${Number(currentPage) === index + 1 ? ' active' : ''}`}
              >
                {index + 1}
              </a>
            );
          })}

        <a className="arrow next" onClick={onClickNext}></a>
        <a className="arrow nnext" onClick={onClickNnext}></a>
      </div>
    </div>
  );
};

export default Paging;
