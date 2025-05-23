import { Link } from 'react-router-dom'
 
const Navbar = () => {
  return (
<nav className="navbar">
    <div className="logo">
        LOGO
    </div>
    
    <div className="search-bar">
        <input type="text" placeholder="Search" />
    </div>

    <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/Categories">Categories</Link>
        <Link to="/About">About</Link>
        <Link to="/Contact">Contact</Link>
    </div>
</nav>
  )
}
 
export default Navbar