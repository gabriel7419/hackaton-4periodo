import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { IoIosAddCircle } from 'react-icons/io';

interface Ambiente {
  id: number;
  nome: string;
  tipo: string;
  status: string;
  descricao: string;
}

const SalasDisponiveis: React.FC = () => {
  const [ambientes, setAmbientes] = useState<Ambiente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtro, setFiltro] = useState('');
  const [statusFiltro, setStatusFiltro] = useState('');
  const userRole = localStorage.getItem('role');
  
  useEffect(() => {
    const fetchAmbientes = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/ambiente/index');
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setAmbientes(data);
        } else {
          throw new Error('Estrutura inesperada da resposta da API.');
        }
      } catch (error) {
        console.error('Erro ao buscar ambientes:', error);
        setError('Erro ao carregar ambientes. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchAmbientes();
  }, []);

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este ambiente?')) {
      fetch(`http://127.0.0.1:8000/api/ambiente/${id}/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }).then(() => setAmbientes((prev) => prev.filter((ambiente) => ambiente.id !== id)));
    }
  };

  const ambientesFiltrados = ambientes.filter((ambiente) => {
    return (
      (ambiente.nome.toLowerCase().includes(filtro.toLowerCase()) || !filtro) &&
      (ambiente.status.toLowerCase().includes(statusFiltro.toLowerCase()) || !statusFiltro)
    );
  });

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'disponivel':
        return 'bg-green-600 text-green-100'; // Verde intermediário
      case 'manutencao':
        return 'bg-yellow-600 text-yellow-100'; // Amarelo intermediário
      case 'reservado':
        return 'bg-red-600 text-red-100'; // Vermelho intermediário
      default:
        return 'bg-gray-600 text-gray-100'; // Para outros casos, padrão
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 p-8 rounded-lg shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <h4 className="text-3xl font-bold text-blue-700">Salas Disponíveis</h4>
        
        {/* Se o usuário for professor, os filtros ficam ao lado do título */}
        {userRole === 'professor' && (
          <div className="flex space-x-4">
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700">Filtrar Nome:</label>
              <input
                type="text"
                placeholder="Filtrar ambiente..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700">Filtrar Status:</label>
              <input
                type="text"
                placeholder="Filtrar status..."
                value={statusFiltro}
                onChange={(e) => setStatusFiltro(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        )}

        {/* Se o usuário for admin, aparece o botão para criar novo ambiente */}
        {userRole === 'admin' && (
          <button
            className="flex items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300"
            onClick={() => window.location.href = '/insurt/ambiente'}
          >
            <IoIosAddCircle size={24} />
            <span className="ml-2">Criar Novo Ambiente</span>
          </button>
        )}
      </div>

      {/* Mensagens de Carregamento ou Erro */}
      {loading && <p className="text-center text-gray-500 py-4">Carregando...</p>}
      {error && <p className="text-center text-red-500 py-4">{error}</p>}

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto text-center">
          <thead>
            <tr className="bg-blue-200">
              <th className="py-4 px-6 text-lg text-blue-600">Nome</th>
              <th className="py-4 px-6 text-lg text-blue-600">Descrição</th>
              <th className="py-4 px-6 text-lg text-blue-600">Status</th>
              {userRole === 'admin' && (
                <th className="py-4 px-6 text-lg text-blue-600">Ações</th>
              )}
            </tr>
          </thead>
          <tbody>
            {ambientesFiltrados.map((ambiente) => (
              <tr key={ambiente.id} className="border-t hover:bg-blue-50 transition-all duration-300">
                <td className="py-3 px-6">{ambiente.nome}</td>
                <td className="py-3 px-6">{ambiente.descricao}</td>
                <td className="py-3 px-6">
                  <span
                    className={`inline-block px-3 py-1 mt-2 text-sm font-medium rounded-full ${getStatusClass(ambiente.status)}`}
                  >
                    {ambiente.status}
                  </span>
                </td>
                {userRole === 'admin' && (
                  <td className="py-3 px-6">
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={() => window.location.href = `/update/ambiente/${ambiente.id}`}
                        className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-2 rounded-lg hover:scale-105 transition-all duration-300"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(ambiente.id)}
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

export default SalasDisponiveis;
