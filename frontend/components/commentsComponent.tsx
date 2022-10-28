import React, { useEffect, useState, useContext } from 'react'

export function CommentsComponent(props: any) {
  const [comments, setComments] = useState([])
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${props.postId}/comments`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data)
      })
  }, [])

  if (props.activePostId == props.postId)
    return (
      <div>
        {comments.map((comment: any, index: any) => {
          return (
            <div key={index} className="commentsContainer">
              <div className="comment">
                <h2 className="Title">{comment.name}</h2>
                <p className="Body">{comment.body}</p>
              </div>
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
