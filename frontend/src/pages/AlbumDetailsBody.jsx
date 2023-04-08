import { useParams, useLoaderData } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { DataContext } from '../context/DataContex'

const AlbumDetailsBody = () => {
    const id = useParams().id
    const albumDetails = useLoaderData()
    const { openDelete, photoSelectedDelete,  setPhotoSelectedDelete } = useContext(DataContext)
    let { alld } = useContext(DataContext)

    const slides = albumDetails?.filePath
    const [framePhoto, setFramePhoto] = useState(slides[0])
    const [framePhotoNumber, setFramePhotoNumber] = useState(1)
    const [activeSlide, setActiveSlide] = useState(1)

    const [activeList, setActiveList] = useState(Array(albumDetails && albumDetails.filePath.length).fill(''))
    const [trashcanList, setTrashcanList] = useState(Array(albumDetails && albumDetails.filePath.length).fill('hide'))
    const [crossList, setCrossList] = useState(Array(albumDetails && albumDetails.filePath.length).fill('hide'))

    useEffect(() => {
        if(openDelete) {
            setTrashcanList(Array(albumDetails && albumDetails.filePath.length).fill(''))
        } else {
            setTrashcanList(Array(albumDetails && albumDetails.filePath.length).fill('hide'))
            setCrossList(Array(albumDetails && albumDetails.filePath.length).fill('hide'))
        }
    }, [openDelete])

    // Managing Slideshow, Active Image onClick ----------------------------------

    useEffect(() => {
        const newActiveList = []
            activeList.map((item, key) => {
                if(key === 0) {
                    newActiveList.push('active')
                }else {
                    newActiveList.push('')
                }
            })
            setActiveList(newActiveList)
    }, [albumDetails])

    const selectSlide = (n) => {  
        if (n > slides.length) n = 1
        if (n < 1) n = slides.length
        // console.log(n, 'n', activeSlide)

        const newActiveList = []
        activeList.map((item, key) => {
            if(key === (n - 1)) {
                newActiveList.push('active')
            }else {
                newActiveList.push('')
            }
        })
        setActiveList(newActiveList)
        setFramePhoto(slides[n - 1])
        setFramePhotoNumber(n)
        setActiveSlide(n)
    }


    const handlePrev = (e) => {
        e.preventDefault()
        selectSlide(activeSlide - 1 )
    }

    const handleNext = (e) => {
        e.preventDefault()
        selectSlide(activeSlide + 1 )
    }

    const handleSelect = (e, photo, index) => {
        e.preventDefault()
        selectSlide(index + 1)
        // setFramePhoto(photo)
        // setFramePhotoNumber(index + 1)
        // const newActiveList = []
        // activeList.map((item, key) => {
        //     if(key === index) {
        //         newActiveList.push('active')
        //     }else {
        //         newActiveList.push('')
        //     }
        // })
        // setActiveList(newActiveList)
        // setActiveSlide(index + 1)
        // console.log(activeSlide, 'fffffff')
    }

    // Managing Select images to Delete and onClick Delete ----------------------------------

    let sum = []
    useEffect(() => { // this useEffect is just for test
        if(openDelete) {
        trashcanList.map((hidden, index) => {
            if(hidden === 'hide') {
                 sum.push(slides[index])
            }
        })
        console.log(sum, 'sum')
        console.log(photoSelectedDelete, 'photoSelectedDelete')
        console.log(trashcanList, 'trashcanList')
    }
    }, [trashcanList])

    const handleDeletemany1 = (e, index) => {
        e.preventDefault()
        let i
        let newTrashcanList = [...trashcanList]
        let newCrossList = [...crossList] 
        let newdelete = [...photoSelectedDelete]    
        
        for (i = 0; i < slides.length; i++) {
            if(i === index) {
                newTrashcanList[i] = 'hide'
                newCrossList[i] = ''
                newdelete.push(slides[index])
            } 
        }    
        setTrashcanList(newTrashcanList)
        setCrossList(newCrossList)
        setPhotoSelectedDelete(newdelete)
    }

    const handleDeletemany2 = (e, index) => {
        e.preventDefault()
        let i 
        let newTrashcanList = [...trashcanList]
        let newCrossList = [...crossList]      
        let newdelete = [...photoSelectedDelete]   

        for (i = 0; i < slides.length; i++) {
            if(i === index) {
                newTrashcanList[i] = ''
                newCrossList[i] = 'hide'
                newdelete.pop(slides[index])
            } 
        }    
        setTrashcanList(newTrashcanList)
        setCrossList(newCrossList)
        setPhotoSelectedDelete(newdelete)
    }
    
    return ( 
        <div className="album-details-body">
            {/* <div className="col2-details">  */}
            <h3 style={{textAlign: 'center'}} > 
                {albumDetails.albumName}: {albumDetails.filePath.length} photos
            </h3>

            <div className="largeimage">
                <img className="frame-image-details" src={`/uploads/${framePhoto}`} />
                <div className="photonumber" style={{textAlign: 'center'}}>photo number: {framePhotoNumber}</div>

            </div>
                    
            <span className="prev" onClick={handlePrev}>❮</span>
            <span className="next" onClick={handleNext}>❯</span>
            <hr />
            
            <div className="row">
            {albumDetails.filePath.map((photo, index) => (
                <div className="column" key={index}>
                    <img 
                    className={`demo ${activeList[index]}`} 
                    src={`/uploads/${photo}`} 
                    onClick={(e) => handleSelect(e, photo, index)} 
                    />
                    <span 
                    className={`deletemany1 ${trashcanList[index]}`}
                    onClick={(e) => handleDeletemany1(e, index)}
                    >
                        <img src="icons8-müll-50.png" width="50" height="auto" />
                    </span> 
                    <span 
                    className={`deletemany2 ${crossList[index]}`}
                    onClick={(e) => handleDeletemany2(e, index)}
                    >
                        <strong className="cross-x">X</strong>
                    </span> 
                </div>
            ))}                    
            </div>
    </div>
        // </div>
     )
}

export const albumDetailsLoader = async ({ params }) => {
    const { id } = params  
    const res = await fetch('/foo/' + id)
    const data = await res.json()
  
    if (!res.ok) {
      throw Error('Could not fetch the data for that resource.')
    }

    return data
}
 
export default AlbumDetailsBody