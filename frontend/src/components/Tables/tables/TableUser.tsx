import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { IoIosAddCircle } from 'react-icons/io';
import RedirectButton from '../../button/RedirectButton';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

const TableTwo: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtro, setFiltro] = useState('');
  const userRole = localStorage.getItem('role');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/user/index');
        const data = await response.json();

        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          throw new Error('Estrutura inesperada da resposta da API.');
        }
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        setError('Erro ao carregar usuários. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      fetch(`http://127.0.0.1:8000/api/user/${id}/delete/`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }).then(() => setUsers((prev) => prev.filter((user) => user.id !== id)));
    }
  };

  const usersFiltrados = users.filter((user) => 
    user.name.toLowerCase().includes(filtro.toLowerCase()) || !filtro
  );

  return (
    <div className="bg-gradient-to-r from-indigo-50 via-indigo-100 to-indigo-200 p-8 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <h4 className="text-3xl font-bold text-indigo-700">Tabela de Usuários</h4>
        {userRole === 'admin' && (
          <RedirectButton
            path="/registrar"
            icon={<IoIosAddCircle />}
            name="Criar Novo Usuário"
          />
        )}
      </div>

      <div className="flex mb-6 gap-4">
        <div className="flex flex-col w-1/3">
          <label className="font-semibold text-gray-700">Filtrar por Nome:</label>
          <input
            type="text"
            placeholder="Filtrar nome..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
      </div>

      {loading && <p className="text-center text-gray-500 py-4">Carregando...</p>}
      {error && <p className="text-center text-red-500 py-4">{error}</p>}

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto text-center">
          <thead>
            <tr className="bg-indigo-200">
              <th className="py-4 px-6 text-lg text-indigo-600">Nome</th>
              <th className="py-4 px-6 text-lg text-indigo-600">E-mail</th>
              <th className="py-4 px-6 text-lg text-indigo-600">Cargo</th>
              {userRole === 'admin' && (
                <th className="py-4 px-6 text-lg text-indigo-600">Ações</th>
              )}
            </tr>
          </thead>
          <tbody>
            {usersFiltrados.map((user) => (
              <tr key={user.id} className="border-t hover:bg-indigo-50 transition-all duration-300">
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">{user.role}</td>
                {userRole === 'admin' && (
                  <td className="py-3 px-6">
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={() => window.location.href = `/update/user/${user.id}`}
                        className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-2 rounded-lg hover:scale-105 transition-all duration-300"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-gradient-to-r from-red-400 to-red-600 text-white px-6 py-2 rounded-lg hover:scale-105 transition-all duration-300"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableTwo;
