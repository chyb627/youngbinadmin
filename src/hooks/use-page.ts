import { useCallback, useState } from 'react';
import { Post } from '../types/types';

export const usePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [staticPostsPerPage, setStaticPostsPerPage] = useState(10);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;

  const currentPosts = useCallback(
    (posts: Post[]) => {
      let currentPosts: Post[] = [];
      currentPosts = posts.slice(indexOfFirst, indexOfLast);
      return currentPosts;
    },
    [indexOfFirst, indexOfLast],
  );

  const onChangeRow = useCallback((e: any) => {
    setPostsPerPage(e.target.value);
    setCurrentPage(1);
    const URLSearch = window.location.search.split('&row=');

    if (URLSearch.length > 1) {
      window.location.replace(`/${URLSearch[0]}&row=${e.target.value}&page=1`);
    } else {
      window.location.replace(`/?text=&condition=all&row=${e.target.value}&page=1`);
    }
  }, []);

  return {
    currentPage,
    postsPerPage,
    setPostsPerPage,
    setCurrentPage,
    currentPosts,
    onChangeRow,
    staticPostsPerPage,
    setStaticPostsPerPage,
  };
};
