
import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  // Fetch all blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("https://mern-projects-pod1.vercel.app/api/v1/blog/all-blog");
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);


  return (
    <div>
      {blogs &&
        blogs.map((blog) => (
          <div key={blog?._id}>
            <BlogCard
              id={blog?._id}
              isUser={localStorage.getItem("userId") === blog?.user?._id}
              title={blog?.title}
              description={blog?.description}
              image={blog?.image}
              username={blog?.user?.username}
              time={blog?.createdAt}
              exist={blog?.comments && blog.comments.length > 0}
            />

          </div>
        ))}
    </div>
  );
};

export default Blogs;
