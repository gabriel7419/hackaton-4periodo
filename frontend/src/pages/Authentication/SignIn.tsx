import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginImage from './logo.png';

const SignIn: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const navigate = useNavigate();

  // Carregar o VLibras assim que o componente for montado
  useEffect(() => {
    // Carregar a API VLibras
    const loadVLibras = () => {
      const script = document.createElement('script');
      script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        new (window as any).VLibras.Widget('https://vlibras.gov.br/app');
      };

      // Limpar o widget quando o componente for desmontado
      return () => {
        const vlibrasElement = document.querySelector('.vlibras');
        if (vlibrasElement) {
          vlibrasElement.remove();
        }
      };
    };

    loadVLibras();
  }, []);

  // Função de envio do formulário (login)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://laravel-backend:8000/api/login',
        {
          email,
          password,
        },
      );

      const token = response.data.access_token;
      const role = response.data.role;
      const user = response.data.user;

      if (token && role) {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('user', user);
        navigate('/ecommerce');
        window.location.reload();
      } else {
        setErrorMessage('Falha no login. Verifique suas credenciais.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErrorMessage('Falha no login. Verifique suas credenciais.');
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 relative"
      role="main"
    >
      <div
        className="flex flex-col lg:flex-row max-w-5xl w-full bg-white shadow-lg rounded-lg overflow-hidden"
        aria-labelledby="login-title"
      >
        {/* Lado esquerdo */}
        <div className="lg:w-1/2 flex flex-col items-center justify-center bg-blue-100 p-6 sm:p-8 lg:p-10">
          <img
            src={LoginImage}
            alt="Logo da aplicação"
            className="w-36 sm:w-48 lg:w-60 mb-4"
          />
          <h2
            id="login-title"
            className="text-xl sm:text-2xl font-semibold text-blue-700 text-center mb-4"
          >
            Bem-vindo de volta!
          </h2>
          <p
            className="text-sm sm:text-base text-gray-700 text-center"
            id="login-description"
          >
            Faça login para acessar sua conta e aproveitar todos os recursos.
          </p>
        </div>

        {/* Lado direito */}
        <div className="lg:w-1/2 p-6 sm:p-8 lg:p-10">
          <form onSubmit={handleSubmit} aria-describedby="login-description">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Entrar na sua conta
            </h2>
            {errorMessage && (
              <p
                className="text-red-500 mb-4 text-center"
                role="alert"
                aria-live="polite"
              >
                {errorMessage}
              </p>
            )}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-required="true"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-required="true"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
              aria-label="Entrar no sistema"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>

      {/* Componente VLibras */}
      <div className="fixed bottom-4 left-4 vlibras" />
    </div>
  );
};

export default SignIn;
