import type { NextPage } from 'next'
import { SyntheticEvent, useEffect, useState } from 'react'
import Photo from '../components/interfaces/photo'
import { AiFillFolderOpen } from 'react-icons/ai'
import Album from '../components/interfaces/album'
import { useRouter } from 'next/router'

const Photos: NextPage = (props: any) => {
  const [currentAlbum, setcurrentAlbum] = useState<Album>(props.album)
  const [photos, setPhotos] = useState<Photo[]>([])
  const [showPhotos, setShowPhotos] = useState<Boolean>(true)
  const [currentPhoto, setCurrentPhoto] = useState<Photo>()

  //Filter
  const [name, setName] = useState<string>('')
  const router = useRouter()
  const album = router.query.album
  //Get photos
  useEffect(() => {
    if (album) {
      fetch(`https://jsonplaceholder.typicode.com/albums/${album}/photos`)
        .then((res) => res.json())
        .then((data) => {
          setPhotos(data)
        })
    } else {
      fetch('https://jsonplaceholder.typicode.com/photos')
        .then((res) => res.json())
        .then((data) => {
          setPhotos(data)
        })
    }
  }, [])

  const ImageClick = async (e: SyntheticEvent, photo: Photo) => {
    e.preventDefault()
    setShowPhotos(false)
    setCurrentPhoto(photo)
  }

  const closeImage = async (e: SyntheticEvent) => {
    e.preventDefault()
    setShowPhotos(true)
    setCurrentPhoto(undefined)
  }

  if (showPhotos) {
    return (
      <>
        {/* Filter bar */}
        <div className="w-4/5 bg-white m-auto mt-8 rounded-xl  ">
          <form className="mb-3">
            <label>Search</label>
            <input
              type="name"
              placeholder="Search"
              value={name}
              onChange={(e: any) => setName(e.target.value)}
            />
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-14 gap-16 ">
          {photos
            .filter((photo) => photo.title.includes(name))
            .map((photo: Photo) => {
              // Album
              return (
                <div
                  key={photo.id}
                  className="bg-white p-4 flex flex-col content-center h-full rounded-xl hover:-translate-y-3 hover:scale-110 hover:bg-gray-100 duration-300 hover:text-lg "
                  onClick={(e) => ImageClick(e, photo)}
                >
                  <h2 className="text-20 font-bold  text-black text-center  ">
                    {photo.title}
                  </h2>
                  <img src={photo.url} />
                </div>
              )
            })}
        </div>
      </>
    )
  } else {
    return (
      <div className="justify-center content-center mt-4 p-4">
        <div className="bg-white p-1 flex flex-col max-w-2xl content-center rounded-xl m-auto  ">
          <h2 className="text-20 font-bold  text-black text-center  ">
            <a
              className="float-right mr-2 hover:text-red-700 hover:scale-110"
              onClick={closeImage}
            >
              x
            </a>
            {currentPhoto?.title}
          </h2>
          <img src={currentPhoto?.url} />
        </div>
      </div>
    )
  }
}

export default Photos
