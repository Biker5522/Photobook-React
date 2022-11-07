import { SyntheticEvent, useState } from "react";
import { getPhotoByAlbumID } from "../pages/api/CallAPI";
import Photo from "./interfaces/photo";

export function PhotoComponent(props: any) {
  const [show, setShow] = useState<boolean>(false);
  //Photos
  const [photos, setPhotos] = useState<Photo[]>([]);


  const findAlbumPhotos = async (e: SyntheticEvent, albumID: number) => {
    e.preventDefault();
    props.newPhoto ? setPhotos([props.newPhoto, ...await getPhotoByAlbumID(albumID)]) : setPhotos(await getPhotoByAlbumID(albumID));
    setShow(!show);
    console.log('click!')
  };

  //Delete Photo
  const DeletePhoto = (e: SyntheticEvent, photoId: number) => {
    e.preventDefault();
    const filteredArray = [...photos];
    setPhotos(filteredArray.filter((el) => el.id != photoId));
  };

  return (
    <div>
      <h2 onClick={(e) => findAlbumPhotos(e, props.album.id)}>
        Album: {props.album.title}
      </h2>
      {show === true &&
        photos.map((photo: Photo) => {
          return (
            <div
              className="post p-6  bg-white rounded-lg text-gray-900 border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
              key={photo.id}
            >
              {props.user?.id === props.album.userId ? (
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
                <a href={photo.thumbnailUrl}>{photo.thumbnailUrl}</a>
              </p>
            </div>
          );
        })}
    </div>
  );
}
