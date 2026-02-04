const Blog = require("./model/Blogs")

const printAllBlogs = async () => {
  try {
    const blogs = await Blog.findAll()
    const blogsFormatted = blogs.map(blog =>
      `${blog.author}: '${blog.title}', ${blog.likes} likes`
    )
    console.log(blogsFormatted.join('\n'))
  } catch (error) {
    console.error('Unable to solve your request:', error)
  }
}

printAllBlogs()