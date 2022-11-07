import { useRef, useState } from 'react';
import { getPhotoByID } from './api/CallAPI';


export default function Users() {
  
    const photoID = useRef<any>(null);
    const [photo, setPhoto] = useState<any>()

    async function getPhoto(e: any) {
      e.preventDefault();
      setPhoto(await getPhotoByID(photoID));
    }

    return (
      <div className="max-w-2xl mx-auto loginPage">
        <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" action="#">
            <h2 className="text-xl font-medium text-gray-900 dark:text-white">
              Photos
            </h2>
            <div>
              <input
                ref={photoID}
                type="text"
                name="photoID"
                id="photoID"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Search user by photoID"
              />
            </div>
            <div className="flex items-center justify-center h-5 ">
              <button
                type="submit"
                onClick={getPhoto}
                className="w-3/5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Find
              </button>
            </div>
                {photo != null && 
                  <div className="post p-6  bg-white rounded-lg text-gray-900 border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <h2>Photo: </h2>
                    <p className="mb-3">Album ID: {photo.albumId}</p>
                    <p className="mb-3">Photo ID: {photo.id}</p>
                    <p className="mb-3">Title: {photo.title}</p>
                    <p className="mb-3">Url: <a href={photo.url}>{photo.url}</a></p>
                    <p className="mb-3">Thumbnail Url: <a href={photo.thumbnailUrl}>{photo.thumbnailUrl}</a></p>
                  </div>
                }
                {photo == null &&
                  <div className="post p-6  bg-white rounded-lg text-gray-900 border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <h2>Photo: </h2>
                    <p className="mb-3">Album ID: </p>
                    <p className="mb-3">Photo ID: </p>
                    <p className="mb-3">Title: </p>
                    <p className="mb-3">Url: </p>
                    <p className="mb-3">Thumbnail Url: </p>
                  </div>
                } 
          </form>
        </div>
      </div>
    )
  }
  