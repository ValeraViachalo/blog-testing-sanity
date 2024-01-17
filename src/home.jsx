import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getBlog } from "./helpers/getBlog";
import { Link } from "react-router-dom";
import { motionParametr } from "./helpers/motionParametr";
const anim = {
  initial: {
    opacity: 0,
    filter: "blur(1vw)",
  },
  animate: {
    opacity: 1,
    filter: "blur(0vw)",
  },
  exit: {
    opacity: 0,
    filter: "blur(1vw)",
  },
};

export const Home = () => {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getBlog().then((posts) => {
      setPosts(posts);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
  }, []);

  console.log(posts);

  return (
    <motion.div {...motionParametr()} className="home">
      <AnimatePresence mode="wait">
        <h1>Hello [HOST] agency</h1>
        {isLoading ? (
          <motion.h1 {...anim}>[Loading...]</motion.h1>
        ) : (
          <motion.div {...anim} className="blogs">
            {posts.map((currProd, index) => (
              <Link
                to={`/posts/${currProd.slug.current}`}
                className="blog__card"
                key={`blog_${index}`}
              >
                <img
                  src={currProd.mainImage.asset.url}
                  alt="card"
                  className="blog__image"
                />
                <h2>{currProd.title}</h2>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
