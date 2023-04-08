import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { DataContext } from '../context/DataContex'

const AlbumDetailsSidebar = () => {
    const id = useParams().id
    const [getFiles, setGetfiles] = useState([])
    const { openDelete, setOpenDelete, photoSelectedDelete, setPhotoSelectedDelete } = useContext(DataContext)

    const readFiles = async (e) => {
        e.preventDefault()
        // console.log(getFiles)
    
        const formData = new FormData()    
        Object.keys(getFiles).forEach(key => {
            formData.append(getFiles.item(key).name, getFiles.item(key))
            // console.log(getFiles.item(key).name, 'wwww')
            // console.log(formData, 'tttttttt')
        })

        const response = await fetch(`/foo/uploadfiles/${id}`, {
            method: 'POST',
            body: formData
        })
    
        const json = await response.json()
        window.location.href = json.redirect
    }

    const handleOpenDelete = (e) => {
        e.preventDefault()
        if(openDelete) {
            setOpenDelete(false)
        } else {
            setOpenDelete(true)
        }
    }
    const handleDeletePhotos = async (e) => {
        e.preventDefault()
        // console.log(photoSelectedDelete, 'delyyyyyyyyyyyy')
        
        try {
            const response = await fetch(`/foo/${id}`, {
                method: "PATCH",
                body: JSON.stringify(photoSelectedDelete),
                headers: {"Content-Type": "application/json"}
            })
            const json = await response.json()
            if(response.ok){
                setPhotoSelectedDelete([])
                setOpenDelete(false)
                window.location.href = json.redirect
            } 
        } catch(err) {
            err => console.log(err)
        } 
    }
    
        
    return ( 
        <div className="album-details-sidebar">
            <div className="sideitem-container">

                <div className="addphototab">
                    <div style={{marginBottom: '3px'}}>Photo Upload</div>
                    <form 
                    className="form" 
                    id="photouploadform" 
                    >
                        <input 
                        type='file' 
                        id="photouploadinput" 
                        name="avatar" 
                        multiple 
                        onChange={(e)=> setGetfiles(e.target.files)}
                        /> 
                        <button className="filesubmitbtn" onClick={readFiles}>Submit</button>                        
                    </form>   
                </div> 

                <div className="deletemanytab">
                    <button 
                    className="deletemanybtn" 
                    style={{float: 'left',  marginRight: '5px'}}
                    onClick={handleOpenDelete}
                    >                 
                        <img 
                        className="trashcan" 
                        src="/icons8-müll-50.png" 
                        style={{verticalAlign: 'middle'}}
                        width="25" height="25"/> 
                        <span>Delete Photos</span> 
                    </button>
                    {openDelete && <button 
                    className="deleteall" 
                    style={{height: '30px'}}
                    onClick={handleDeletePhotos}
                    >Delete</button>}
                </div>  

                <div className="allalbums"> <Link to="/"> All Albums </Link></div>

            </div>
        </div>
     )
}
 
export default AlbumDetailsSidebar