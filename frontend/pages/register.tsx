import { useRef } from "react";
import { createUser } from "./api/CallAPI";

class User {
    email:string;
    name:string;
    username:string;
    phone:string;
    website:string;
    street:string;
    suite:string;
    city:string;
    zipcode:string;

    constructor(u : User)
    {
        this.email = u.email;
        this.name = u.name;
        this.username = u.username;
        this.phone = u.phone;
        this.website = u.website;
        this.street = u.street;
        this.suite = u.suite;
        this.city = u.city;
        this.zipcode = u.zipcode;
    }
}

export default function Register() {
  
  const email = useRef<any>(null)
  const name = useRef<any>(null)
  const username = useRef<any>(null)
  const phone = useRef<any>(null)
  const website = useRef<any>(null)
  const street = useRef<any>(null)
  const suite = useRef<any>(null)
  const city = useRef<any>(null)
  const zipcode = useRef<any>(null)

  async function registerUser(e: any) {
    e.preventDefault();
    console.log("registerUser");
    
    const user: User = {
      email: email.current?.value,
      name: name.current?.value,
      username: username.current?.value,
      phone: phone.current?.value,
      website: website.current?.value,
      street: street.current?.value,
      suite: suite.current?.value,
      city: city.current?.value,
      zipcode: zipcode.current?.value
    };
    console.log(user);
    createUser(user);
  }


  return (
    <div className="max-w-2xl mx-auto loginPage">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" action="#">
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Register to our platform
          </h2>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Your email
            </label>
            <input
              ref={email}
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Your name
            </label>
            <input
              ref={name}
              type="text"
              name="name"
              id="name"
              placeholder="Full name"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Your username
            </label>
            <input
              ref={username}
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Your phone
            </label>
            <input
              ref={phone}
              type="text"
              name="phone"
              id="phone"
              placeholder="Phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="website"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Your website
            </label>
            <input
              ref={website}
              type="text"
              name="website"
              id="website"
              placeholder="Website"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="street"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Your street
            </label>
            <input
              ref={street}
              type="text"
              name="street"
              id="street"
              placeholder="Street"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="suite"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Your suite
            </label>
            <input
              ref={suite}
              type="text"
              name="suite"
              id="suite"
              placeholder="Suite"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="city"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Your city
            </label>
            <input
              ref={city}
              type="text"
              name="city"
              id="city"
              placeholder="City"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="zipcode"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Your zipcode
            </label>
            <input
              ref={zipcode}
              type="text"
              name="zipcode"
              id="zipcode"
              placeholder="Zipcode"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div className="flex items-center justify-center h-5 ">
            <button
              onClick={registerUser}
              type="submit"
              className="w-3/5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Register
            </button>
          </div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Already have an account?{' '}
            <a
              href="/login"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Log in with your account
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
