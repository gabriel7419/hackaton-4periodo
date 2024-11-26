import { useEffect, useState } from 'react';

// Interface Historico ajustada
interface Historico {
  id: number;
  reserva_id: number;
  alteracoes: string;
  modificado_em: string;
  usuario_id: string;
}

const TablePosition = () => {
  const [historico, setHistorico] = useState<Historico[]>([]);
  const [ambienteFiltro, setAmbienteFiltro] = useState('');
  const [usuarioFiltro, setUsuarioFiltro] = useState('');
  const [dataFiltro, setDataFiltro] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const userId = localStorage.getItem('user');

  // Busca os dados do histórico do usuário
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/historico/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao carregar o histórico');
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setHistorico(data);
        } else {
          console.error('Estrutura inesperada da resposta da API:', data);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError('Erro ao carregar o histórico');
        console.error('Erro:', error);
        setLoading(false);
      });
  }, [userId]);

  // Filtro baseado nos critérios
  const historicoFiltrado = historico.filter((item) => {
    return (
      (!ambienteFiltro || item.alteracoes.toLowerCase().includes(ambienteFiltro.toLowerCase())) &&
      (!usuarioFiltro || item.usuario_id.toString().includes(usuarioFiltro)) &&
      (!dataFiltro || item.modificado_em.includes(dataFiltro))
    );
  });

  return (
    <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 p-8 rounded-lg shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-3xl font-bold text-blue-700">Histórico de Alterações</h4>

        {/* Filtros ao lado do título */}
        <div className="flex space-x-4">
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
            <label className="font-semibold text-gray-700">Filtrar Data:</label>
            <input
              type="text"
              placeholder="Filtrar data..."
              value={dataFiltro}
              onChange={(e) => setDataFiltro(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>

      {/* Mensagens de Carregamento ou Erro */}
      {loading && <p className="text-center text-gray-500 py-4">Carregando histórico...</p>}
      {error && <p className="text-center text-red-500 py-4">{error}</p>}

      {/* Cabeçalho da Tabela */}
      {!loading && !error && (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full table-auto text-center">
            <thead>
              <tr className="bg-blue-200">
                <th className="py-4 px-6 text-lg text-blue-600">Alterações</th>
                <th className="py-4 px-6 text-lg text-blue-600">Modificado em</th>
                <th className="py-4 px-6 text-lg text-blue-600">Usuário</th>
              </tr>
            </thead>
            <tbody>
              {historicoFiltrado.map((item) => (
                <tr key={item.id} className="border-t hover:bg-blue-50 transition-all duration-300">
                  <td className="py-3 px-6">{item.alteracoes}</td>
                  <td className="py-3 px-6">{item.modificado_em}</td>
                  <td className="py-3 px-6">{item.usuario_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TablePosition;
