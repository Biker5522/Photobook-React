import React, { useEffect, useState, useContext } from 'react'

export default function CommentsComponent(props: any) {
  const [comments, setComments] = useState([])
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${props.postId}/comments`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data)
        console.log(data)
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
