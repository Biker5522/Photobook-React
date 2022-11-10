import { SyntheticEvent, useEffect, useRef, useState } from 'react'
import { getUserByLoginAndPassword, getUserPosts } from './api/CallAPI'
import { useCookies } from 'react-cookie'
import Post from '../components/interfaces/post'
import User from '../components/interfaces/user'

export default function Login() {
  const userLogin = useRef<HTMLInputElement>(null) // login = email
  const userPassword = useRef<HTMLInputElement>(null) // password = zipcode
  const [cookies, setCookie] = useCookies(['user'])
  const [user, setUser] = useState<User>()
  const [posts, setPosts] = useState<Post[]>([])
  const [showPosts, setShowPosts] = useState<Boolean>(false)

  //Get user from API
  async function getUser(e: SyntheticEvent) {
    e.preventDefault()
    setUser(await getUserByLoginAndPassword(userLogin, userPassword))
  }

  // Get user posts from API
  async function getPosts(e: SyntheticEvent) {
    e.preventDefault()
    setPosts(await getUserPosts(user))
    setShowPosts(true)
  }

  //Set Cookie of User
  useEffect(() => {
    if (user != null) {
      setCookie('user', user)
    }
  }, [user])

  return (
    <div className="max-w-2xl mx-auto loginPage">
      {user == null && (
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
      )}
      {user != null && (
        <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
          You are logged in
        </div>
      )}
    </div>
  )
}
