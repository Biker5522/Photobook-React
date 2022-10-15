import { useEffect, useState } from 'react'

export default function Feed() {
  const [posts, setPosts] = useState<any>([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setPosts(data)
        setLoading(false)
      })
  }, [])

  return (
    <div className="feedPage">
      <div className="postForm m-0 p-4  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" action="#">
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Write a Post!
          </h2>
          <div>
            <label
              htmlFor="text"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Title
            </label>
            <input
              type="text"
              name="text"
              id="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Your Title"
            />
            <label
              htmlFor="text"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Description
            </label>
            <textarea className="w-full" name="comment" form="usrform">
              Enter text here...
            </textarea>
          </div>
          <input
            className="float-right text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
      <div className="feed">
        {posts.map((post: any) => {
          return (
            <div className="post p-6  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <h2>{post.title}</h2>
              <p className="mb-3">{post.body}</p>
              <p className="mb-3 text-grey commentsPost float-right">
                comments
              </p>
              <p className="mb-3  text-grey commentsPost float-left">
                By Juan Pablo
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
