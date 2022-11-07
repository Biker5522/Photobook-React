import { useState, useEffect } from "react";
import Photo from "../components/interfaces/photo";

export default function Users() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  //Get Photos
  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((res) => res.json())
      .then((data) => {
        setPhotos(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-2xl mx-auto loginPage">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" action="#">
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Photos album
          </h2>
          <div>
            {photos.map((photo: Photo) => {
              return (
                <div
                  className="post p-6 bg-white rounded-lg text-gray-900 border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
                  key={photo.id}
                >
                  <h2>Photo: {photo.title}</h2>
                  <p className="mb-3">Album ID: {photo.albumId}</p>
                  <p className="mb-3">Photo ID: {photo.id}</p>
                  <p className="mb-3">
                    Url: <a href={photo.url}>{photo.url}</a>
                  </p>
                  <p className="mb-3">
                    Thumbnail Url:{" "}
                    <a href={photo.thumbnailUrl}>{photo.thumbnailUrl}</a>
                  </p>
                </div>
              );
            })}
          </div>
        </form>
      </div>
    </div>
  );
}
