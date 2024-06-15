import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className='w-100 mt-auto bg-secondary p-4'>
      <div className='container text-center mb-1'>
        <a href="https://github.com/Ryanh118" target="_blank" rel="noopener noreferrer" title="Ryan's Github">
          <FontAwesomeIcon icon={faGithub} size="2x" className="text-warning" />
        </a>
        <a href="https://www.linkedin.com/in/ryanh118/" target="_blank" rel="noopener noreferrer" title="Ryan's LinkedIn">
          <FontAwesomeIcon icon={faLinkedin} size="2x" className="text-warning mr-2" />
        </a>
        <a href="https://github.com/iturnberg" target="_blank" rel="noopener noreferrer" title="Ian's Github">
          <FontAwesomeIcon icon={faGithub} size="2x" className="text-warning" />
        </a>
        <a href="https://www.linkedin.com/in/ianturnberg/" target="_blank" rel="noopener noreferrer" title="Ian's LinkedIn">
          <FontAwesomeIcon icon={faLinkedin} size="2x" className="text-warning mr-2" />
        </a>
        <a href="https://github.com/LemonTag" target="_blank" rel="noopener noreferrer" title="Keegan's Github">
          <FontAwesomeIcon icon={faGithub} size="2x" className="text-warning" />
        </a>
        <a href="https://www.linkedin.com/in/keegan-micu-135390166/" target="_blank" rel="noopener noreferrer" title="Keegan's LinkedIn">
          <FontAwesomeIcon icon={faLinkedin} size="2x" className="text-warning mr-2" />
        </a>
        <a href="https://github.com/dmharrison" target="_blank" rel="noopener noreferrer" title="Daniel's Github">
          <FontAwesomeIcon icon={faGithub} size="2x" className="text-warning" />
        </a>
        <a href="https://www.linkedin.com/in/daniel-harrison-604b4393/" target="_blank" rel="noopener noreferrer" title="Daniel's LinkedIn">
          <FontAwesomeIcon icon={faLinkedin} size="2x" className="text-warning mr-2" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;