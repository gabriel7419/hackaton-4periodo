import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { IoIosAddCircle } from 'react-icons/io';

interface Ambiente {
  id: number;
  usuario: string;
  usuario_id: number;
  data_reserva: string;
  hora_inicio: string;
  hora_fim: string;
  ambiente: string;
}

const ECommerce: React.FC = () => {
  const [ambientes, setAmbientes] = useState<Ambiente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtro, setFiltro] = useState('');
  const [usuarioFiltro, setUsuarioFiltro] = useState('');
  const [ambienteFiltro, setAmbienteFiltro] = useState('');
  const role = localStorage.getItem('role');

  const userId = localStorage.getItem('user');
  console.log('User ID:', userId);

  useEffect(() => {
    const fetchAmbientes = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/reserva/index');
        const data = await response.json();

        console.log('Dados da API:', data);

        if (Array.isArray(data)) {
          setAmbientes(data);
        } else if (data.reservas && Array.isArray(data.reservas)) {
          setAmbientes(data.reservas);
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
    const confirmDelete = window.confirm('Você tem certeza que deseja excluir esta reserva?');
    if (confirmDelete) {
      console.log(`Excluindo ambiente com ID: ${id}`);
      fetch(`http://127.0.0.1:8000/api/reserva/${id}/delete/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(() => {
        setAmbientes(ambientes.filter((ambiente) => ambiente.id !== id));
      });
    }
  };

  const ambientesFiltrados = ambientes.filter((ambiente) => {
    return (
      (ambiente.ambiente.toLowerCase().includes(ambienteFiltro.toLowerCase()) || !ambienteFiltro) &&
      (ambiente.usuario.toLowerCase().includes(usuarioFiltro.toLowerCase()) || !usuarioFiltro) &&
      (ambiente.data_reserva.includes(filtro) || !filtro)
    );
  });

  return (
    <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 p-8 rounded-lg shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <h4 className="text-3xl font-bold text-blue-700">Salas Agendadas</h4>
        {(role === 'admin' || role === 'professor') && (
          <button
            className="flex items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300"
            onClick={() => window.location.href = '/insurt/reserva'}
          >
            <IoIosAddCircle size={24} />
            <span className="ml-2">Criar Nova Reserva</span>
          </button>
        )}
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Filtrar Ambiente:</label>
          <input
            type="text"
            placeholder="Filtrar ambiente..."
            value={ambienteFiltro}
            onChange={(e) => setAmbienteFiltro(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Filtrar Usuário:</label>
          <input
            type="text"
            placeholder="Filtrar usuário..."
            value={usuarioFiltro}
            onChange={(e) => setUsuarioFiltro(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Filtrar Data:</label>
          <input
            type="text"
            placeholder="Filtrar data..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {loading && <p className="text-center text-gray-500 py-4">Carregando...</p>}
      {error && <p className="text-center text-red-500 py-4">{error}</p>}

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto text-center">
          <thead>
            <tr className="bg-blue-200">
              <th className="py-4 px-6 text-lg text-blue-600">Usuário</th>
              <th className="py-4 px-6 text-lg text-blue-600">Data da Reserva</th>
              <th className="py-4 px-6 text-lg text-blue-600">Horário</th>
              <th className="py-4 px-6 text-lg text-blue-600">Ambiente</th>
              {ambientesFiltrados.some((ambiente) => String(ambiente.usuario_id) === userId) && (
                <th className="py-4 px-6 text-lg text-blue-600">Ações</th>
              )}
            </tr>
          </thead>
          <tbody>
            {ambientesFiltrados.map((ambiente) => (
              <tr key={ambiente.id} className="border-t hover:bg-blue-50 transition-all duration-300">
                <td className="py-3 px-6">{ambiente.usuario}</td>
                <td className="py-3 px-6">{ambiente.data_reserva}</td>
                <td className="py-3 px-6">{ambiente.hora_inicio} / {ambiente.hora_fim}</td>
                <td className="py-3 px-6">{ambiente.ambiente}</td>
                {String(userId) === String(ambiente.usuario_id) && (
                  <td className="py-3 px-6">
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={() => window.location.href = `/update/reserva/${ambiente.id}`}
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

export default ECommerce;
