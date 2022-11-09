import { SyntheticEvent, useEffect, useState } from "react";
import { getPhotoByAlbumID } from "../pages/api/CallAPI";
import Photo from "./interfaces/photo";

export function PhotoComponent(props: any) {
  //Show for display component with photos
  const [show, setShow] = useState<boolean>(false);

  //Photos
  const [photos, setPhotos] = useState<Photo[]>([]);
  const deletedArray: any = [];

  //Load existing photos from API
  const loadPhotos = async () => {
    setPhotos(await getPhotoByAlbumID(props.album.id));
  };

  //Get photos
  useEffect(() => {
    loadPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Get new photo
  useEffect(() => {
    if (
      props.newPhoto &&
      !deletedArray.find((p: any) => p.id === props.newPhoto.id)
    ) {
      photos.push(props.newPhoto);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.newPhoto]);

  //Display specific album photos
  const showAlbumPhotos = async (e: SyntheticEvent) => {
    e.preventDefault();
    setShow(!show);
  };

  //Delete photo
  const DeletePhoto = (e: SyntheticEvent, photoId: number) => {
    e.preventDefault();
    const filteredArray = [...photos];
    deletedArray.push(filteredArray.find((el) => el.id === photoId));
    setPhotos(filteredArray.filter((el) => el.id != photoId));
  };

  return (
    <div>
      <h2 onClick={(e) => showAlbumPhotos(e)}>Album: {props.album.title}</h2>
      {show === true ? (
        photos.map((photo: Photo) => {
          return (
            <div
              className="photo rounded-lg border border-gray-200 shadow-md"
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
      ) : (
        <span className="photo__infoSpan">
          Album is hidden, please click header to unleash
        </span>
      )}
    </div>
  );
}
