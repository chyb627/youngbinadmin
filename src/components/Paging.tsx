import React, { useCallback } from 'react';

interface PagingProps {
  postsPerPage: number;
  totalPosts: number;
  paginate: any;
  currentPage: number;
  onChangeRow: () => void;
  staticPostsPerPage: number;
}

const Paging = ({ postsPerPage, totalPosts, paginate, currentPage, onChangeRow, staticPostsPerPage }: PagingProps) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  // 1페이지로 가기
  const onClickPprev = useCallback(() => {
    if (currentPage > 1) {
      paginate(1);
      const URLSearch = window.location.search;
      if (URLSearch.length > 0) {
        const arr = URLSearch.split('&page=');
        window.location.replace(`/${arr[0]}&page=1`);
      }
    }
  }, [currentPage, paginate]);

  // 이전페이지로 가기
  const onClickPrev = useCallback(() => {
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
  }, [currentPage, paginate]);

  // 다음페이지로 가기
  const onClickNext = useCallback(() => {
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
  }, [currentPage, pageNumbers.length, paginate]);

  // 마지막페이지로 가기
  const onClickNnext = useCallback(() => {
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
  }, [currentPage, pageNumbers.length, paginate]);

  return (
    <div className="page_wrap">
      <select onChange={onChangeRow} className="page_selecter" defaultValue={staticPostsPerPage}>
        <option value="10">10줄 보기</option>
        <option value="15">15줄 보기</option>
        <option value="50">50줄 보기</option>
      </select>

      <div className="page_nation">
        <button className="arrow pprev" onClick={onClickPprev} />
        <button className="arrow prev" onClick={onClickPrev} />

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
              <button
                onClick={numberClick}
                key={index}
                value={index + 1}
                className={`${Number(currentPage) === index + 1 ? ' active' : ''}`}
              >
                {index + 1}
              </button>
            );
          })}

        <button className="arrow next" onClick={onClickNext} />
        <button className="arrow nnext" onClick={onClickNnext} />
      </div>
    </div>
  );
};

export default Paging;
