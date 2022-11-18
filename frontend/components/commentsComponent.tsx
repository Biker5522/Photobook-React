import { useRouter } from 'next/router'
import React, { useEffect, useState, useContext, SyntheticEvent } from 'react'

export function CommentsComponent(props: any) {
  const [comments, setComments] = useState<any>([])
  const [user, setUser] = useState(props.user)

  //Comment
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [error, setError] = useState('')

  //Router
  const router = useRouter()

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${props.postId}/comments`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data)
      })
  }, [])

  //Add Comment
  const SubmitHandler = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (!user) {
      router.push('/login')
    } else if (title == '') {
      setError('Valid title is required')
    } else if (description == '') {
      setError('Valid description is required')
    } else {
      let comment = {
        name: title,
        body: description,
        email: user.email,
        postId: props.postId,
        id: Date.now(),
      }
      const newComments = [comment, ...comments]
      setComments(newComments)
      setError('')
    }
  }

  const DeleteComment = (e: SyntheticEvent, Id: number) => {
    e.preventDefault()
    const filteredArray = [...comments]
    setComments(filteredArray.filter((el) => el.id != Id))
  }

  if (props.activePostId == props.postId)
    return (
      <div className="commentsPage flex justify-center  p-4   dark:bg-gray-800 dark:border-gray-700">
        <form
          className="commentsPage_commentForm space-y-1 mb-2"
          action="#"
          id="postForm"
          onSubmit={SubmitHandler}
        >
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Write a Comment!
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
            <p className="text-red-500 "> {error} </p>
          </div>
          <input
            className="float-right text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            type="submit"
            value="Submit"
          />
        </form>

        {comments.map((comment: any) => {
          return (
            <div key={comment.id} className="commentsPage__comment">
              {user?.email === comment.email ? (
                <div
                  className="float-right"
                  onClick={(e) => DeleteComment(e, comment.id)}
                >
                  x
                </div>
              ) : null}
              <h3 className="commentsPage__comment__title">{comment.name}</h3>
              <p className="Body">{comment.body}</p>
            </div>
          )
        })}
      </div>
    )
  else return null
}

export function NumberOfComments(props: any) {
  const [number, setNumber] = useState([])
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${props.postId}/comments`)
      .then((res) => res.json())
      .then((data) => {
        setNumber(data.length)
      })
  }, [])
  return <span>{number}</span>
}

export function AuthorOfPost(props: any) {
  const [author, setAuthor] = useState([])
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${props.userId}`)
      .then((res) => res.json())
      .then((data) => {
        setAuthor(data.name)
      })
  }, [])
  return <span>{author}</span>
}
