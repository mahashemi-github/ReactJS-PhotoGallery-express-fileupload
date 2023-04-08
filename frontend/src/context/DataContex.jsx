import { createContext, useState } from 'react'

export const DataContext = createContext({});

export const DataContextProvider = ({ children }) => {

    const [openDelete, setOpenDelete] = useState(false)
    const [deletePhotos, setDeletePhotos] = useState(false)
    const [photoSelectedDelete, setPhotoSelectedDelete] = useState([])

  return (
    <DataContext.Provider value={{ 
        openDelete, setOpenDelete,
        photoSelectedDelete, setPhotoSelectedDelete
      }}>
      { children }
    </DataContext.Provider>
  )
}

