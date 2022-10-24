import { useRef, useState } from 'react';
import { getUserByLoginAndPassword, getUserPosts } from './api/CallAPI';

export default function Login() {

  const userLogin = useRef<any>(null); // login = email
  const userPassword = useRef<any>(null); // password = zipcode
  const [user, setUser] = useState<any>()
  const [posts, setPosts] = useState<any>([])
  const [showPosts, setShowPosts] = useState<any>(false)

  async function getUser() {
    setUser(await getUserByLoginAndPassword(userLogin, userPassword));
  }

  async function getPosts() {
    setPosts(await getUserPosts(user));
    setShowPosts(true);
  }

  return (
    <div className="max-w-2xl mx-auto loginPage">
      {user == null && 
      <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" action="#">
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign in to our platform
          </h2>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Your email
            </label>
            <input
              ref={userLogin}
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Your password
            </label>
            <input
              ref={userPassword}
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div className="flex items-center justify-center h-5 ">
            <button
              type="submit"
              onClick={getUser}
              className="w-3/5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
          </div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?{' '}
            <a
              href="/register"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Create account
            </a>
          </div>
        </form>
      </div>
      }
      {user != null && 
      <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="post p-6  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <h2>Hello {user.name}!</h2>
          <p className="mb-3">Name: {user.name}</p>
          <p className="mb-3">Username: {user.username}</p>
          <p className="mb-3">E-mail: {user.email}</p>
          <p className="mb-3">Phone: {user.phone}</p>
          <p className="mb-3">Website: <a href={'https://' + user.website}>{user.website}</a></p>
          <h2>Address:</h2>
          <p className="mb-3">Street: {user.address.street}</p>
          <p className="mb-3">Suite: {user.address.suite}</p>
          <p className="mb-3">City: {user.address.city}</p>
          <p className="mb-3">Zipcode: {user.address.zipcode}</p>
          <h3>Geo:</h3>
          <p className="mb-3">lat: {user.address.geo.lat}</p>
          <p className="mb-3">lng: {user.address.geo.lng}</p>
          <h2>Company:</h2>
          <p className="mb-3">Name: {user.company.name}</p>
          <p className="mb-3">Catch Phrase: {user.company.catchPhrase}</p>
          <p className="mb-3">BS: {user.company.bs}</p>
        </div>
        <div className="feed">
        <h2 className="text-black">Your posts are listed below {user.name}!</h2>
          {!showPosts &&
            <div className="flex items-center justify-center h-5 ">
              <button
                type="submit"
                onClick={getPosts}
                className="w-3/5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Show your posts
              </button>
            </div>
          }
          {showPosts && 
            posts.map((post: any) => {
              return (
                <div 
                className="post p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
                key={post.id}
                >
                  <h2>{post.title}</h2>
                  <p className="mb-3">{post.body}</p>
                  <p className="mb-3 text-grey commentsPost float-right">
                    comments
                  </p>
                  <p className="mb-3  text-grey commentsPost float-left">
                    By {user.name}
                  </p>
                </div>
              )
            })}
      </div>
      </div>
      }
    </div>
  )
}
