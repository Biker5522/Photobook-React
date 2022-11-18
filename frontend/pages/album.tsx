import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Album from '../components/interfaces/album'
import { AiFillFolderOpen } from 'react-icons/ai'

const Album: NextPage = () => {
  const [albums, setAlbums] = useState<Album[]>([])
  //Get Albums
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data) => {
        setAlbums(data)
      })
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-14 gap-16 ">
      {albums.map((album: Album) => {
        // Album
        return (
          <div
            key={album.id}
            className="bg-white p-4 flex flex-col content-center h-full rounded-xl"
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
  )
}

export default Album
