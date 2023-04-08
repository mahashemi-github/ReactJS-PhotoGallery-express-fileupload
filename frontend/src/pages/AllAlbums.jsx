import AllAlbumsBody from './AllAlbumsBody'
import AllAlbumsSidebar from './AllAlbumsSidebar'
import Header from './Header'

const AllAlbums = () => {
    return ( 
        <div className="all-albums">
            <div className="blog-container">

                <div className="col1"> 
                    <Header />  
                    <div className="blog-sidebar">
                        <AllAlbumsSidebar />
                    </div>
                </div>

                <div className="col2">
                    <AllAlbumsBody />
                </div>
            </div>
        </div>
     )
}
 
export default AllAlbums