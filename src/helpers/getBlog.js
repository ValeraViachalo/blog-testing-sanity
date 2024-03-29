import client from "./client";

export function getBlog() {
  return client
    .fetch(
      `*[_type == "post"] {
        title,
        slug,
        mainImage {
          asset -> {
            _id,
            url
          },
        }
      }`
    )
    .then(post => post);
}

export function getPostDetails(slug) {
  return client
    .fetch(
      `*[_type == "post" && slug.current == "${slug}"] {
        title,
        body,
        publishedAt,
        mainImage {
          asset -> {
            _id,
            url
          },
          alt
        }
      }`
    )
    .then(post => {
      console.log(post);
      return post
    });
}