import { useRouter } from "next/router";
import { useState, useEffect, SyntheticEvent } from "react";
import { useCookies } from "react-cookie";
import Album from "../components/interfaces/album";
import Photo from "../components/interfaces/photo";
import User from "../components/interfaces/user";
import { getPhotoByAlbumID } from "./api/CallAPI";

export default function Users() {
  const [show, setShow] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  //Posts
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [albumID, setAlbumID] = useState<number>();
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [error, setError] = useState<string>("");

  //Cookies
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [user, setUser] = useState<User>();

  //Router
  const router = useRouter();

  const findAlbumPhotos = async (e: SyntheticEvent, albumID: number) => {
    e.preventDefault();
    setPhotos(await getPhotoByAlbumID(albumID));
    setShow(!show);
  };

  //Get User from cookie
  useEffect(() => {
    setUser(cookies.user);
  }, []);

  //Get Albums
  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((res) => res.json())
      .then((data) => {
        setAlbums(data);
        setLoading(false);
      });
  }, []);

  //Delete Photo
  const DeletePhoto = (e: SyntheticEvent, photoId: number) => {
    e.preventDefault();
    const filteredArray = [...photos];
    setPhotos(filteredArray.filter((el) => el.id != photoId));
  };

  //Add Photo
  const SubmitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
    } else if (title == "") {
      setError("Valid title is required");
    } else if (url == "") {
      setError("Valid url is required");
    } else if (thumbnailUrl == "") {
      setError("Valid url is required");
    } else {
      let photo: Photo = {
        albumId: albumID,
        id: photos[0].id + 5000,
        title: title,
        url: url,
        thumbnailUrl: thumbnailUrl,
      };
      const newPhotos = [photo, ...photos];
      setPhotos(newPhotos);
      setError("");
    }
  };

  return (
    <div className="feed">
      {/* Add Post Form */}
      <div className="feed__postForm m-0 p-4  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <form
          className="space-y-6"
          action="#"
          id="postForm"
          onSubmit={SubmitHandler}
        >
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Add a Photo!
          </h2>
          <div>
            <label
              htmlFor="text"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Album ID
            </label>
            <input
              type="text"
              name="text"
              id="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Album ID"
              onChange={(e: any) => setAlbumID(e.target.value)}
            />
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
              Url
            </label>
            <textarea
              className="w-full"
              name="comment"
              form="postForm"
              defaultValue="Your Post"
              onChange={(e: any) => setUrl(e.target.value)}
            ></textarea>
            <label
              htmlFor="text"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Thumbnail Url
            </label>
            <textarea
              className="w-full"
              name="comment"
              form="postForm"
              defaultValue="Your Post"
              onChange={(e: any) => setThumbnailUrl(e.target.value)}
            ></textarea>
            <p className="text-red-500 "> {error}</p>
          </div>
          <input
            className="float-right text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            type="submit"
            value="Submit"
          />
        </form>
      </div>

      {/* Albums */}
      <div className="feed__posts">
        {albums.map((album: Album) => {
          return (
            <div key={album.id}>
              <div className="postsContainer feed__posts__post p-6  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <h2 onClick={(e) => findAlbumPhotos(e, album.id)}>
                  Album: {album.title}
                </h2>
                {show === true
                  ? photos.map((photo: Photo) => {
                      return (
                        <div
                          className="post p-6  bg-white rounded-lg text-gray-900 border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
                          key={photo.id}
                        >
                          {user?.id === album.userId ? (
                            <div
                              className="float-right"
                              onClick={(e) => DeletePhoto(e, photo.id)}
                            >
                              x
                            </div>
                          ) : null}
                          <h2>Photo: </h2>
                          <p className="mb-3">Album ID: {photo.albumId}</p>
                          <p className="mb-3">Photo ID: {photo.id}</p>
                          <p className="mb-3">Title: {photo.title}</p>
                          <p className="mb-3">
                            Url: <a href={photo.url}>{photo.url}</a>
                          </p>
                          <p className="mb-3">
                            Thumbnail Url:{" "}
                            <a href={photo.thumbnailUrl}>
                              {photo.thumbnailUrl}
                            </a>
                          </p>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
