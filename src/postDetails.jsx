import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getPostDetails } from './helpers/getBlog';
import SanityBlockContent from '@sanity/block-content-to-react';
import { motionParametr } from './helpers/motionParametr';

export const PostDetails = () => {
  const [post, setPost] = useState([])
  const location = useLocation();
  const { pathname } = location;
  const postSlug = pathname.split('/posts/')[1];
  console.log(postSlug);

  const getDate = (date) => {
    const preparedDate = new Date(date);
    
    return preparedDate.toLocaleDateString('uk-UA');
  }

  useEffect(() => {
    getPostDetails(postSlug).then((p) => {
      setPost(p[0]);
    });
  }, []);

  return (
      <motion.div {...motionParametr()}>
        <h2>
          <Link to="/" className="back-button">
            {'<'} Home
          </Link>
        </h2>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <h1>
            {post.title}
          </h1>
          <h3>
            {getDate(post.publishedAt)}
          </h3>
        </div>
        {post.mainImage && post.mainImage.asset && (
            <img
              src={post.mainImage.asset.url}
              alt={post.title}
              title={post.title}
              className="post-datails__image"
            />
          )}

          <div className="block__content">
            <SanityBlockContent
              blocks={post.body}
            />
          </div>
      </motion.div>
  )
}
