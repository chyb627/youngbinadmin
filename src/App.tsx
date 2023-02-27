import { KeyboardEvent, useCallback, useEffect } from 'react';
import Paging from './components/Paging';
import Posts from './components/Posts';

import './App.css';
import Loading from './components/Loading';
import useInput from './hooks/use-input';
import { usePage } from './hooks/use-page';
import { useSearch } from './hooks/use-search';

function App() {
  const [changeText, onChangeText, setChangeText] = useInput('');
  const [changeCondition, onChangeCondition, setChangeCondition] = useInput('all');
  const {
    currentPage,
    postsPerPage,
    setPostsPerPage,
    setCurrentPage,
    currentPosts,
    onChangeRow,
    staticPostsPerPage,
    setStaticPostsPerPage,
  } = usePage();
  const { searchText, searchCondition, setSearchText, setSearchCondition, posts, postsLoading, isError, error } =
    useSearch();

  // 조회하기
  const handleValueChange = useCallback(() => {
    setCurrentPage(1);
  }, [setCurrentPage]);

  // 엔터키로 조회하기
  const onCheckEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        setCurrentPage(1);
        window.location.replace(`/?text=${changeText}&condition=${changeCondition}&row=${postsPerPage}&page=1`);
      }
    },
    [changeCondition, changeText, postsPerPage, setCurrentPage],
  );

  // 처음 랜더링 시 URL값 읽어와 변수에 담아주기
  useEffect(() => {
    const URLSearch = window.location.search.slice(1);

    if (URLSearch.length > 0) {
      const arr = URLSearch.split('&');
      const obj: any = {};

      arr.forEach((element) => {
        obj[element.split('=')[0]] = element.split('=')[1];
      });

      setSearchText(obj.text.replaceAll('%20', ' '));
      setSearchCondition(obj.condition);
      setChangeText(obj.text.replaceAll('%20', ' '));
      setChangeCondition(obj.condition);
      setPostsPerPage(obj.row);
      setStaticPostsPerPage(obj.row);
      setCurrentPage(obj.page);
    }
  }, [
    setChangeCondition,
    setChangeText,
    setCurrentPage,
    setPostsPerPage,
    setSearchCondition,
    setSearchText,
    setStaticPostsPerPage,
  ]);

  if (postsLoading) {
    return <Loading />;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <div className="contents_wrap">
      <div className="section shadow" onKeyPress={onCheckEnter}>
        <div className="title_wrap">
          <h4>상품 검색</h4>
        </div>

        <div className="search_wrap">
          <div className="search_title">
            <h4>검색</h4>
          </div>

          <select onChange={onChangeCondition} defaultValue={searchCondition}>
            <option value="all">전체</option>
            <option value="title">상품명</option>
            <option value="brand">브랜드</option>
            <option value="description">상품내용</option>
          </select>

          <span className="input_wrap">
            <input type="text" defaultValue={searchText} onChange={onChangeText} />
          </span>

          <a
            href={`/?text=${changeText}&condition=${changeCondition}&row=${postsPerPage}&page=1`}
            onClick={handleValueChange}
            className="btn black small"
          >
            조회
          </a>
        </div>
      </div>

      <div className="text_wrap">검색된 데이터: {posts?.length}건</div>

      <div className="section shadow">
        <div className="table_wrap">
          <table className="table col_type">
            <colgroup>
              <col width="10%" />
              <col width="20%" />
              <col width="15%" />
              <col width="34%" />
              <col width="7%" />
              <col width="7%" />
              <col width="7%" />
            </colgroup>
            <thead>
              <tr>
                <th className="noline_l">상품번호</th>
                <th>상품명</th>
                <th>브랜드</th>
                <th>상품내용</th>
                <th>가격</th>
                <th>평점</th>
                <th>재고</th>
              </tr>
            </thead>

            {posts && <Posts posts={currentPosts(posts)} />}
          </table>
        </div>
        {posts && posts.length > 0 && (
          <Paging
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={setCurrentPage}
            currentPage={currentPage}
            onChangeRow={onChangeRow}
            staticPostsPerPage={staticPostsPerPage}
          />
        )}
      </div>
    </div>
  );
}

export default App;
