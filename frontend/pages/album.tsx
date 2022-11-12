import { useRouter } from "next/router";
import { useState, useEffect, SyntheticEvent } from "react";
import { useCookies } from "react-cookie";
import Album from "../components/interfaces/album";
import Photo from "../components/interfaces/photo";
import User from "../components/interfaces/user";
import { PhotoComponent } from "../components/photoComponent";
import { getPhotoByUser } from "./api/CallAPI";

export default function Albums() {
  //Loading state
  const [isLoading, setLoading] = useState<boolean>(false);

  //Router
  const router = useRouter();

  //Cookies
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [user, setUser] = useState<User>();

  //Get user from cookie
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

  //Get albums
  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((res) => res.json())
      .then((data) => {
        setAlbums(data);
        setLoading(false);
      });
  }, []);

  //Photos
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentUserPhotos, setCurrentUserPhotos] = useState<Photo[]>([]);

  //Get photos
  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((res) => res.json())
      .then((data) => {
        setPhotos(data);
        setLoading(false);
      });
  }, []);

  //Get current user photos
  const loadUserPhotos = async () => {
    setCurrentUserPhotos(await getPhotoByUser(cookies.user));
    console.log(currentUserPhotos)
  }

  //Set current user photos
  useEffect(() => {
    loadUserPhotos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  //Delete photo
  const DeletePhoto = (e: SyntheticEvent, photoId: number) => {
    e.preventDefault();
    const filteredArray = [...photos];
    setPhotos(filteredArray.filter((el) => el.id != photoId));
  };

    //Show for display component with photos
    const [showAddPhoto, setShowAddPhoto] = useState<boolean>(false);
    const [showAlbums, setShowAlbums] = useState<boolean>(false);
    const [showPhotos, setShowPhotos] = useState<boolean>(false);
    const [showUserPhotos, setShowUserPhotos] = useState<boolean>(false);
    const [showLoggedUserPhotos, setShowLoggedUserPhotos] = useState<boolean>(false);
  
    //Display add new photos form
    const displayAddPhotoOption = async (e: SyntheticEvent) => {
      e.preventDefault();
      setShowAddPhoto(!showAddPhoto);
      setShowAlbums(false);
      setShowPhotos(false);
      setShowUserPhotos(false);
      setShowLoggedUserPhotos(false);
      console.log('works');
    };
  
    //Display existing albums
    const displayAlbums = async (e: SyntheticEvent) => {
      e.preventDefault();
      setShowAlbums(!showAlbums);
      setShowAddPhoto(false);
      setShowPhotos(false);
      setShowUserPhotos(false);
      setShowLoggedUserPhotos(false);
      console.log('works');
    };
  
    //Display existing photos
    const displayPhotos = async (e: SyntheticEvent) => {
      e.preventDefault();
      setShowPhotos(!showPhotos);
      setShowAddPhoto(false);
      setShowAlbums(false);
      setShowUserPhotos(false);
      setShowLoggedUserPhotos(false);
      console.log('works');
    };
  
    //Display specific user photos
    const displaySpecificUserPhotos = async (e: SyntheticEvent) => {
      e.preventDefault();
      setShowUserPhotos(!showUserPhotos);
      setShowAddPhoto(false);
      setShowAlbums(false);
      setShowPhotos(false);
      setShowLoggedUserPhotos(false);
      console.log('works');
    };
  
    //Display logged in user photos
    const displayLoggedUserPhotos = async (e: SyntheticEvent) => {
      e.preventDefault();
      setShowLoggedUserPhotos(!showLoggedUserPhotos);
      setShowAddPhoto(false);
      setShowAlbums(false);
      setShowPhotos(false);
      setShowUserPhotos(false);
      console.log('works');
      console.log(currentUserPhotos)
    };

  return (
    <div className="album">
      {/* Albums navbar */}
      <div className="albumNavComponent rounded-lg">
      <h2 onClick={(e) => displayAddPhotoOption(e)}>Add new photo</h2>
      <h2 onClick={(e) => displayAlbums(e)}>Show albums</h2>
      <h2 onClick={(e) => displayPhotos(e)}>Show all photos</h2>
      <h2 onClick={(e) => displaySpecificUserPhotos(e)}>Look for another user photos</h2>
      <h2 onClick={(e) => displayLoggedUserPhotos(e)}>Show user photos</h2>
      </div>
      {/* Add Photo */}
      {showAddPhoto === true ? 
      (<div className="album__addPhotoForm rounded-lg">
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
      </div>) : null}
      {/* Show Albums */}
      {showAlbums === true ? 
      (
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
      ) : null}
      {/* Show all photos */}
      {showPhotos === true ? 
      (
        photos.map((photo: Photo) => {
          return (
            <div
              className="photo rounded-lg border border-gray-200 shadow-md"
              key={photo.id}
            >
            {user?.id === albums.find((a) => a.id === photo.albumId)?.userId ? (
              <div
                className="float-right"
                onClick={(e) => DeletePhoto(e, photo.id)}
              >
                x
              </div>
            ) : null}
              <h2>Photo: {photo.title}</h2>
              <p>Album: {photo.albumId}</p>
              <p>Photo: {photo.id - (photo.albumId * 50 - 50)}</p> {/* it works, for now idk how to fix error here */}
              <p>
                Url: <a href={photo.url}>{photo.url}</a>
              </p>
              <p>
                Thumbnail Url: <a href={photo.thumbnailUrl}>{photo.thumbnailUrl}</a>
              </p>
            </div>
          );
        })
      ) : null}
      {/* Look for another user photos */}
      
      {/* Show user photos */}
      {showLoggedUserPhotos === true ? 
      (
        currentUserPhotos.map((photo: Photo) => {
          return (
            <div
              className="photo rounded-lg border border-gray-200 shadow-md"
              key={photo.id}
            >
            {user?.id === albums.find((a) => a.id === photo.albumId)?.userId ? (
              <div
                className="float-right"
                onClick={(e) => DeletePhoto(e, photo.id)}
              >
                x
              </div>
            ) : null}
              <h2>Photo: {photo.title}</h2>
              <p>Album: {photo.albumId}</p>
              <p>Photo: {photo.id - (photo.albumId * 50 - 50)}</p> {/* it works, for now idk how to fix error here */}
              <p>
                Url: <a href={photo.url}>{photo.url}</a>
              </p>
              <p>
                Thumbnail Url: <a href={photo.thumbnailUrl}>{photo.thumbnailUrl}</a>
              </p>
            </div>
          );
        })
      ) : null}
    </div>
  );
}
