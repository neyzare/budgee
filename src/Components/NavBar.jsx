import logo8 from '../assets/logos-budgee-08.png';
import '../css/NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function NavBar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('auth_token'); // Utilise le bon nom de cookie
    if (token != null) {
      // Requête pour obtenir les informations de l'utilisateur
      axios.get('http://127.0.0.1:8000/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true // Assure-toi que les cookies sont envoyés
      })
      .then(response => {
        console.log(response.data)
        if (response.data.name) {
          setUser(response.data.name); // Met à jour le nom de l'utilisateur
        }
      })
      .catch(error => {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
        console.log(token)
        console.log();
        

        // Si la requête échoue (par exemple, token expiré), tu peux rediriger l'utilisateur vers la page de connexion
      });
    } else {
      console.error('Token non trouvé, utilisateur non authentifié');
    }
  },);

  const handleClick = () => {
    navigate('/');
  };

  const redirectLogin = () => {
    navigate('/Login');
  };

  const logOut = () => {
    Cookies.remove('auth_token')
    setUser(null)
  }

  return (
    <div className="nav flex items-center justify-between">
      <div className="flex items-center">
        <img
          src={logo8}
          alt="Logo Budgee"
          className="w-32 h-auto"
          onClick={handleClick}
        />
        <span className='text-white ml-4 archive'>Archive</span>
      </div>

      <div className="flex items-center">
        {user ? (
          <>
          <span className='pr-12 cursor-pointer'>{user}</span>
          <span className='pr-12 cursor-pointer' onClick={logOut}>Deconnexion</span>
          </>
          
        ) : (
          <span className='pr-12 cursor-pointer' onClick={redirectLogin}>Login</span> // Lien de connexion si pas d'utilisateur
        )}
        <FontAwesomeIcon icon={faCircleUser} size="lg" className="text-white font-person" />
      </div>
    </div>
  );
}

export default NavBar;