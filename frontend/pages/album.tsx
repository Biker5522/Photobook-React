import { useRouter } from "next/router";
import { useState, useEffect, SyntheticEvent } from "react";
import { useCookies } from "react-cookie";
import Album from "../components/interfaces/album";
import Photo from "../components/interfaces/photo";
import User from "../components/interfaces/user";
import { PhotoComponent } from "../components/photoComponent";

export default function Users() {
  //Loading state
  const [isLoading, setLoading] = useState<boolean>(false);

  //Router
  const router = useRouter();

  //Cookies
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [user, setUser] = useState<User>();

  //Get User from cookie
  useEffect(() => {
    setUser(cookies.user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Error
  const [error, setError] = useState<string>("");

  //Album
  const [albums, setAlbums] = useState<Album[]>([]);
  const [albumID, setAlbumID] = useState<number>();
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");

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

  //New photo
  const [newPhoto, setNewPhoto] = useState<Photo>();

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
      const photo: Photo = {
        albumId: albumID,
        id: Date.now(),
        title: title,
        url: url,
        thumbnailUrl: thumbnailUrl,
      };
      setNewPhoto(photo);
      console.log(photo);
      setError("");
    }
  };

  return (
    <div className="album">
      <div className="album__addPhotoForm rounded-lg">
        <form
          className="space-y-6"
          action="#"
          id="albumForm"
          onSubmit={SubmitHandler}
        >
          <h2> Add a Photo! </h2>
          <div>
            <label htmlFor="AlbumID"> Album ID </label>
            <input
              type="text"
              name="AlbumID"
              id="AlbumID"
              className="border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Album ID"
              onChange={(e: any) => setAlbumID(e.target.value)}
            />
            <label htmlFor="Title"> Title </label>
            <input
              type="text"
              name="Title"
              id="Title"
              className="border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your Title"
              onChange={(e: any) => setTitle(e.target.value)}
            />
            <label htmlFor="Url"> Url </label>
            <input
              type="text"
              name="Url"
              id="Url"
              className="border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your Url"
              onChange={(e: any) => setUrl(e.target.value)}
            />
            <label htmlFor="ThumbnailUrl"> Thumbnail Url </label>
            <input
              type="text"
              name="ThumbnailUrl"
              id="ThumbnailUrl"
              className="border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your Thumbnail Url"
              onChange={(e: any) => setThumbnailUrl(e.target.value)}
            />
            <p className="text-red-500"> {error} </p>
          </div>
          <input
            className="bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
      {/* Albums */}
      <div className="album__showAlbums">
        {albums.map((album: Album) => {
          return (
            <div key={album.id} className="album__albumPhotos rounded-lg">
              <PhotoComponent
                user={user}
                album={album}
                newPhoto={newPhoto?.albumId == album.id ? newPhoto : null}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
