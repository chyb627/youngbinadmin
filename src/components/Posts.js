import React from 'react';

const Posts = ({ posts }) => {
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
