import { useRef, useState } from 'react'
import { getUserByUsername } from './api/CallAPI'

export default function Users() {
  const username = useRef<any>(null)
  const [user, setUser] = useState<any>()

  async function getUser() {
    setUser(await getUserByUsername(username))
  }

  return (
    <div className="max-w-2xl mx-auto loginPage">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" action="#">
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Users
          </h2>
          <div>
            <input
              ref={username}
              type="text"
              name="username"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Search user by username"
            />
          </div>
          <div className="flex items-center justify-center h-5 ">
            <button
              type="submit"
              onClick={getUser}
              className="w-3/5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Find
            </button>
          </div>
          {user != null && (
            <div className="post p-6  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <h2>User: {user.name}</h2>
              <p className="mb-3">ID: {user.id}</p>
              <p className="mb-3">Username: {user.username}</p>
              <p className="mb-3">E-mail: {user.email}</p>
              <p className="mb-3">Phone: {user.phone}</p>
              <p className="mb-3">
                Website: <a href={'https://' + user.website}>{user.website}</a>
              </p>
            </div>
          )}
          {user == null && (
            <div className="post p-6  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <h2>User: </h2>
              <p className="mb-3">ID: </p>
              <p className="mb-3">Username: </p>
              <p className="mb-3">E-mail: </p>
              <p className="mb-3">Phone: </p>
              <p className="mb-3">Website: </p>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
