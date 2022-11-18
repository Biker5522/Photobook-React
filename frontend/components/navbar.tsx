import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import logo from './images/logo.png'

export default function Navbar() {
  //Get user from cookies
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [user, setUser] = useState<any>()

  //Get User from cookie
  useEffect(() => {
    setUser(cookies.user)
  }, [])

  //Logout
  async function Logout() {
    removeCookie('user')
  }

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a
          href="/"
          className="flex items-center transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300"
        >
          <img
            src={logo.src}
            className="mr-3 h-6 sm:h-9 "
            alt="Flowbite Logo"
          />
          <span className="text-black self-center text-xl font-semibold whitespace-nowrap dark:text-white ">
            PhotoBook
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="/feed"
                className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/album"
                className="block py-2 pr-4 pl-3 text-gray-700 rounded  md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
              >
                Album
              </a>
            </li>
            <li>
              <a
                href="/photos"
                className="block py-2 pr-4 pl-3 text-gray-700 rounded  md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
              >
                Photos
              </a>
            </li>
            <li>
              <a
                href="/users"
                className="block py-2 pr-4 pl-3 text-gray-700 rounded  md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
              >
                Users
              </a>
            </li>
            {user != null ? (
              <>
                <li>
                  <a
                    href="/"
                    className="block py-2 pr-4 pl-3 text-gray-700 rounded  md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
                    onClick={Logout}
                  >
                    Logout
                  </a>
                </li>
                <li>
                  <a
                    href="/userInfo"
                    className="block py-2 pr-4  pl-3 text-gray-700 rounded  md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
                  >
                    Your Profile
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a
                    href="/login"
                    className="block py-2 pr-4  pl-3 text-gray-700 rounded  md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
                  >
                    Login
                  </a>
                </li>
                <li>
                  <a
                    href="/register"
                    className="block py-2 pr-4 pl-3 text-gray-700 rounded  md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
                  >
                    Register
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
