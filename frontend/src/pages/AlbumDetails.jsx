import AlbumDetailsBody from './AlbumDetailsBody'
import AlbumDetailsSidebar from './AlbumDetailsSidebar'
import Header from './Header'

const AlbumDetails = () => {
    return ( 
        <div className="album-details">
            <div className="blog-container">

                <div className="col1"> 
                    <Header />  
                    <div className="blog-sidebar">
                        <AlbumDetailsSidebar />
                    </div>
                </div>

                <div className="col2">
                    <AlbumDetailsBody />
                </div>
            </div>
        </div>
     )
}
 
export default AlbumDetails