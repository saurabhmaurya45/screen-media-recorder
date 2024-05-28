import { Link } from 'react-router-dom'
import { LOGO_URL } from '../Constants/Constants'
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { CgMail } from "react-icons/cg";

const Header = () => {
  return (
    <header className='w-full h-14 bg-gray-500 px-2 md:px-5 text-white shadow-sm fixed top-0 z-10 flex items-center'>
      <div className='logo w-full h-full flex items-center justify-start '>
        <Link to="/" ><img src={LOGO_URL} alt='' className='w-12 h-12' /></Link>
      </div>
      <div className='social text-white flex gap-5'>
          <a href='https://github.com/saurabhmaurya45' target='_blank' className='text-3xl'><FaGithub/></a>
          <a href='https://linkedin.com/in/saurabhmaurya45' target='_blank' className='text-3xl'><FaLinkedin/></a>
          <a href='mailto:er.saurabhmaurya11@gmail.com' target='_blank' className='text-3xl'><CgMail/></a>
      </div>
    </header>
  )
}

export default Header