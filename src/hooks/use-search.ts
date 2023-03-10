import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { Post } from '../types/types';

export const useSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [searchCondition, setSearchCondition] = useState('all');

  const getDataAPI = useCallback(async () => {
    try {
      const requestURL = 'https://dummyjson.com/products?limit=100';
      const res = await fetch(requestURL);
      const result = await res.json();

      return result.products;
    } catch (e) {
      console.error(e);
    }
  }, []);

  const useResults = (condition: string, keyword: string) => {
    return useQuery({
      queryKey: ['search', { condition, keyword }],
      queryFn: getDataAPI,
      select: (datas) =>
        datas.filter((data: Post) => {
          if (condition === 'all') {
            const toLowerDataTitle = data.title.toLowerCase().replace(/(\s*)/g, '');
            const toLowerDataBrand = data.brand.toLowerCase().replace(/(\s*)/g, '');
            const toLowerDataDescript = data.description.toLowerCase().replace(/(\s*)/g, '');
            return (
              toLowerDataTitle.includes(keyword) ||
              toLowerDataBrand.includes(keyword) ||
              toLowerDataDescript.includes(keyword)
            );
          }
          if (condition === 'title') {
            const toLowerDataTitle = data.title.toLowerCase().replace(/(\s*)/g, '');
            return toLowerDataTitle.includes(keyword);
          }
          if (condition === 'brand') {
            const toLowerDataBrand = data.brand.toLowerCase().replace(/(\s*)/g, '');
            return toLowerDataBrand.includes(keyword);
          }
          if (condition === 'description') {
            const toLowerDataDescript = data.description.toLowerCase().replace(/(\s*)/g, '');
            return toLowerDataDescript.includes(keyword);
          }
          return null;
        }),
      onSuccess: (successData) => {
        // console.log('onSuccess::', successData);
      },
      onError: (e: Error) => {
        console.log('onError::', e.message);
      },
      cacheTime: Infinity,
      staleTime: 60 * 1000,
    });
  };

  const {
    data: posts,
    isLoading: postsLoading,
    isError,
    error,
  } = useResults(searchCondition, searchText.toLowerCase().replace(/(\s*)/g, ''));

  return {
    searchText,
    searchCondition,
    setSearchText,
    setSearchCondition,
    posts,
    postsLoading,
    isError,
    error,
  };
};
