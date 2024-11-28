import { useState } from 'react';
import logo from '../assets/logos-budgee_Plan de travail 1.png';
import { useNavigate } from 'react-router-dom';
import LoginController from '../controllers/LoginController';
function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/')
  }

  const redirectInscr = () => {
    navigate('/inscription')
  }

  const submitLogin = async(e) => {
    e.preventDefault();

    try {
      await LoginController(email, password)
      console.log("success")
    } catch (e) {
      console.error("l'erreur est ", e)
    }
    
  }
 
  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-bleu-card">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src={logo}
            className="mx-auto border-none align-bottom"
            height={120}
            width={150}
            onClick={handleClick}
            
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
            Login
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={submitLogin} method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-white">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full p-3 bg-white rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-white">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full p-3 bg-white rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-m bg-bleu-card-1 rounded-xl px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                connexion
              </button>
            </div>
          </form>
          <div>
          <button
                type="submit"
                className="flex w-full justify-center rounded-m bg-bleu-card-1 rounded-xl px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6"
                onClick={redirectInscr}
              >
                Inscription
              </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;