import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Album from '../components/interfaces/album'
import { AiFillFolderOpen } from 'react-icons/ai'
import Photos from './photos'
import Router from 'next/router'

const Album: NextPage = () => {
  const [albums, setAlbums] = useState<Album[]>([])

  //Photos
  const [currentAlbum, setCurrentAlbum] = useState<Album>()

  //Get Albums
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data) => {
        setAlbums(data)
      })
  }, [])

  //Display comments
  const SelectAlbum = (album: Album) => {
    return (event: React.MouseEvent) => {
      Router.push(`/photos?album=${album.id}`)
    }
  }

  return (
    <>
      {/* Filter bar */}
      <div className="w-4/5 bg-white m-auto mt-8 rounded-xl  ">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 m-2 ml-5 "
          onClick={() => {
            Router.push('/photos')
          }}
        >
          Show All Photos
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-14 gap-16 ">
        {albums.map((album: Album) => {
          // Album
          return (
            <div
              key={album.id}
              className="bg-white p-4 flex flex-col content-center h-full rounded-xl border-b-2 border-r-4 border-solid border-gray-400   hover:-translate-y-0.5 hover:scale-105 hover:bg-gray-100 duration-300 hover:text-lg"
              onClick={SelectAlbum(album)}
            >
              <h2 className="text-20 font-bold  text-black text-center  ">
                {album.title}
              </h2>

              <AiFillFolderOpen
                color="black"
                size="10em"
                className="block m-0 p-0 self-center justify-self-end mt-auto"
              />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Album
