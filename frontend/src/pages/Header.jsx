const Header = () => {
    return ( 
        <header className="blog-header">
            <h1 style={{fontFamily: 'papyrus'}}><img 
            className="header-image" 
            src="/icons8-image-gallery-50.png" 
            style={{verticalAlign: 'text-top'}} 
            width="40" height="40"/> PhotoGallery
            </h1>
            <p className="header-subtext" ></p>
        </header>  
     )
}
 
export default Header