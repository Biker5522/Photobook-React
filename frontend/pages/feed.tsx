import { SyntheticEvent, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import Router, { useRouter } from 'next/router'
import {
  CommentsComponent,
  NumberOfComments,
  AuthorOfPost,
} from '../components/commentsComponent'
export default function Feed() {
  const [show, setShow] = useState(false)
  const [isLoading, setLoading] = useState(false)

  //Posts
  const [activePostId, setActivePostId] = useState()
  const [posts, setPosts] = useState<any>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  //Cookies
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [user, setUser] = useState<any>(null)

  //Router
  const router = useRouter()

  //Get User from cookie
  useEffect(() => {
    setUser(cookies.user)
  }, [])

  //Get Posts
  useEffect(() => {
    setLoading(true)
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data)
        setLoading(false)
      })
  }, [])

  const DeletePost = (e: SyntheticEvent, postId: any) => {
    e.preventDefault()
    const filteredArray = [...posts]
    setPosts(filteredArray.filter((el) => el.id != postId))
  }

  //Display comments
  const HandleClick = (post: any) => {
    return (event: React.MouseEvent) => {
      if (post.id === activePostId && show == true) {
        setShow(false)
      } else {
        setShow(true)
        setActivePostId(post.id)
      }
    }
  }
  //Add Post
  const SubmitHandler = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (!user) {
      router.push('/login')
    } else if (title == '') {
      setError('Valid title is required')
    } else if (description == '') {
      setError('Valid description is required')
    } else {
      let post = {
        title: title,
        body: description,
        userId: user.id,
      }
      const newPosts = [post, ...posts]
      setPosts(newPosts)
      setError('')
    }
  }

  return (
    <div className="feedPage">
      {/* Add Post Form */}
      <div className="postForm m-0 p-4  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <form
          className="space-y-6"
          action="#"
          id="postForm"
          onSubmit={SubmitHandler}
        >
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
              onChange={(e: any) => setTitle(e.target.value)}
            />
            <label
              htmlFor="text"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Description
            </label>
            <textarea
              className="w-full"
              name="comment"
              form="postForm"
              defaultValue="Your Post"
              onChange={(e: any) => setDescription(e.target.value)}
            ></textarea>
            <p className="text-red-500 "> {error}</p>
          </div>
          <input
            className="float-right text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            type="submit"
            value="Submit"
          />
        </form>
      </div>

      {/* Posts */}
      <div className="feed">
        {posts.map((post: any) => {
          return (
            <div className="postsContainer" key={post.id}>
              <div className="post p-6  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                {user?.id === post.userId ? (
                  <div
                    className="float-right"
                    onClick={(e) => DeletePost(e, post.id)}
                  >
                    x
                  </div>
                ) : null}
                <h2>{post.title}</h2>

                <p className="mb-3">{post.body}</p>
                <a
                  className="mb-3 text-grey commentsPost float-right"
                  onClick={HandleClick(post)}
                >
                  comments <NumberOfComments postId={post.id} />
                </a>

                <p className="mb-3  text-grey commentsPost float-left">
                  <AuthorOfPost userId={post.userId} />
                </p>
              </div>
              {/* Comments */}
              {show === true ? (
                <div>
                  <CommentsComponent
                    activePostId={activePostId}
                    postId={post.id}
                    user={user}
                  />
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}
