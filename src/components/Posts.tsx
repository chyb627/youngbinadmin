import React from 'react';
import { Post } from '../types/types';

interface PostsProps {
  posts: Post[];
}

const Posts = ({ posts }: PostsProps) => {
  return (
    <tbody>
      {posts.map((post) => {
        return (
          <tr key={post.id}>
            <td>{post.id}</td>
            <td>{post.title}</td>
            <td>{post.brand}</td>
            <td>{post.description}</td>
            <td>{post.price}</td>
            <td>{post.rating}</td>
            <td>{post.stock}</td>
          </tr>
        );
      })}
    </tbody>
  );
};
export default Posts;
