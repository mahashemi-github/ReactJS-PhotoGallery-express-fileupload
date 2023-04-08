import './App.css'
import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route, 
  RouterProvider
} from 'react-router-dom'

// pages import
import AllAlbums from './pages/AllAlbums'
import { allalbumsLoader } from './pages/AllAlbumsBody'
import AlbumDetails from './pages/AlbumDetails'
import { albumDetailsLoader } from './pages/AlbumDetailsBody'
import AlbumsError from './pages/AlbumsError'

import NotFound from './pages/NotFound'

// layouts import
import RootLayout from './layouts/RootLayout'

const router = createBrowserRouter(
    createRoutesFromElements( 
        <Route path='/' element={<RootLayout />} errorElement={<AlbumsError />} >
            <Route 
            index
            element={<AllAlbums />} 
            loader={allalbumsLoader} 
            />
            <Route 
            path='/:id' 
            element={<AlbumDetails />} 
            loader={albumDetailsLoader} 
            />
            <Route path='*' element={<NotFound />} />
        </Route>
    )
)

function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    )
}

export default App
