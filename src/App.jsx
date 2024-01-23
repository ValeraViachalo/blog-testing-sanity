import { AnimatePresence } from 'framer-motion';
import './App.css'
import { Home } from './home';
import { useLocation, useRoutes } from 'react-router-dom';
import React from 'react';
import { PostDetails } from './postDetails';


function App() {
  const element = useRoutes([
    {
      path: "/",
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "posts",
          children: [
            {
              path: ":postsSlug?",
              element: <PostDetails />,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <h1>404</h1>,
    },
  ]);

  const location = useLocation();

  return (
    <main>
      <AnimatePresence mode="wait" initial={false}>
        {React.cloneElement(element, { key: location.pathname })}
      </AnimatePresence>
    </main>
  )
  
}

export default App
