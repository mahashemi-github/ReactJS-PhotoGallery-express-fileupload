import { Link, useLoaderData } from 'react-router-dom'

const AllAlbumsBody = () => {
    const albums = useLoaderData()

    const handleDeleteAlbum = async (e, id) => {
        e.preventDefault()
        try {
            const response = await fetch(`/foo/${id}`, { method: "DELETE" })
            const json = await response.json()
            if(response.ok){
                window.location.href = json.redirect
            } 
            } catch(err) {
                err => console.log(err)
            } 
    }   

    return ( 
        <div className="all-albums-body">
            {albums.length !== 0  &&
            albums.map((album, index) => (
                <div key={index}>
                    <Link className="single" to={album._id}>
                    <div className="post">
                    <div className="item2" > 
                        {album.filePath.length === 0 && 
                            <div className="thumbnail-empty-album" style={{float: 'left'}}>
                                <span className="image-empty-album">Epmty Album</span>
                            </div>                 
                        }
                        {album.filePath.length !== 0 && 
                        <img 
                            className="thumbnail-image" 
                            src={`/uploads/${album.filePath[0]}`}
                            style={{float: 'left'}}
                        />
                        }
                        <div style={{marginLeft: '20px', float: 'left', marginTop: '9%'}}>
                        <div style={{fontSize: '18px', marginBottom: '15px'}}><b>{album.albumName}</b></div> 
                        <div id ="participantsNum" style={{fontSize: '18px', color: 'cadetblue'}} >{album.filePath.length} photos</div>
                        </div>
                    </div>
                    </div>
                    </Link> 
                    <div className="deletealbum" onClick={(e) => handleDeleteAlbum(e, album._id)}>Delete Album</div>
                </div>
                ))} 
            {albums.length === 0 &&
                <div className="post">
                    <p style={{paddingLeft: '20px'}}>There are no album to display...</p>
                </div>
            }           

        </div>
    )
}

export const allalbumsLoader = async () => {
    const res = await fetch('/foo/albums')
    const data = await res.json()
    console.log(data, 'hhhh')
  
    if (!res.ok) {
      throw Error('Could not fetch the data for that resource.')
    }

    return data
}
 
export default AllAlbumsBody