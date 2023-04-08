import { useState } from 'react'

const AllAlbumsSidebar = () => {
    const [albumName, setAlbumName] = useState('')

    const handleCreate = async (e) => {
        e.preventDefault()
    
        let doc = {
            albumName: albumName
        }
        
        try {
        const response = await fetch('/foo/create', {
                                    method: "POST",
                                    body: JSON.stringify(doc),
                                    headers: {"Content-Type": "application/json"}
                                })
        const json = await response.json()
        if(response.ok){
            setAlbumName('')
            window.location.href = json.redirect
        } 
        } catch(err) {
            err => console.log(err)
        } 
    }
    
    return ( 
        <div className="all-albums-sidebar">
            <div className="createAlbumtab">
                <div className="createAlbumtitle">Create a New Album: </div>
                <input 
                className="createAlbuminput" 
                type="text" 
                required
                placeholder="Enter Album Name..." 
                value={albumName}
                onChange={(e) => setAlbumName(e.target.value)}
                />
                <button className="createAlbumbtn" onClick={handleCreate}>Create</button>
            </div> 
        </div>
     )
}
 
export default AllAlbumsSidebar