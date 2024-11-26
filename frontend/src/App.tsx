import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import SalasDisponeis from './pages/Dashboard/SalasDisponiveis';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Table/tablesUser';
import TablesImage from './pages/Table/tableImage';
import TablesBazzar from './pages/Table/tableBazzar';
import TablesTransparency from './pages/Table/tableTransparency';
import TablesValuable from './pages/Table/tableValuable';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Insurt from './pages/crud/InsurtBazzar';
// import { Table } from './components/TableSettings';
import TablePosition from './components/Tables/tables/TableHistorico';
import InsurtReserva from './pages/crud/InsurtReserva';
import InsertAmbient from './pages/crud/insertAmbiente';
import InsurtTransparency from './pages/crud/InsurtTransparency';
import InsurtValuable from './pages/crud/InsurtValuable';
import TableEvent from './components/Tables/tables/TableEvent';
import InsurtEvents from './pages/crud/InsurtEvents';
import TableAboutUs from './components/Tables/tables/TableAboutUs';
import UpdateAboutUs from './pages/crud/update/UpdateAboutUs';
import UpdateReserva from './pages/crud/update/UpdateReserva';
import UpdateUser from './pages/crud/update/UpdateUser';
import InsertUser from './pages/crud/insertUser';


function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Estado de autenticação
  const { pathname } = useLocation();
  const userRole = localStorage.getItem('role');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // Aqui você deve implementar a lógica de autenticação real.
    // Por exemplo, você pode verificar se há um token no localStorage.
    const token = localStorage.getItem('token'); // Exemplo de verificação
    setIsAuthenticated(!!token);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout isAuthenticated={isAuthenticated}>
      {' '}
      {/* Passa o estado de autenticação */}
      <Routes>
        <Route
          path="/ecommerce"
          element={
            <>
              <PageTitle title="Lista de Reservas" />
              <ECommerce />
            </>
          }
        />

        <Route
          path="/SalasDisponiveis"
          element={
            <>
              <PageTitle title="Lista de Ambientes" />
              <SalasDisponeis />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendario" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <PageTitle title="Perfil" />
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <ProtectedRoute>
              <PageTitle title="Elementos do Formulario" />
              <FormElements />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <ProtectedRoute>
              <PageTitle title="Layout do Formulario" />
              <FormLayout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tables/users"
          element={
            userRole === 'admin' ? (
              <>
                <PageTitle title="Tabela de Usuários" />
                <Tables />
              </>
            ) : (
              <div>Acesso negado. Você não tem permissão para acessar esta página.</div>
            )
          }
        />

        <Route
          path="/tables/image"
          element={
            <>
              <PageTitle title="Tabela Imagens" />
              <TablesImage />
            </>
          }
        />
        <Route
          path="/tables/bazzar"
          element={
            <>
              <PageTitle title="Tabela Bazzar" />
              <TablesBazzar />
            </>
          }
        />
        <Route
          path="/tables/transparency"
          element={
            <>
              <PageTitle title="Tabela Transparência" />
              <TablesTransparency />
            </>
          }
        />
        <Route
          path="/tables/valuable"
          element={
            <>
              <PageTitle title="Tabela Valor" />
              <TablesValuable />
            </>
          }
        />
        <Route
          path="/tables/historico"
          element={
            (userRole === 'admin' || userRole === 'professor') ? (
              <>
                <PageTitle title="Tabela de Historico" />
                <TablePosition />
              </>
            ) : (
              <div>Acesso negado. Você não tem permissão para acessar esta página.</div>
            )
          }
        />

        <Route
          path="/tables/event"
          element={
            <>
              <PageTitle title="Tabela de Eventos" />
              <TableEvent />
            </>
          }
        />
        <Route
          path="/tables/AboutUs"
          element={
            <>
              <PageTitle title="Tabela Sobre Nós" />
              <TableAboutUs />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <PageTitle title="Configurações" />
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chart"
          element={
            <ProtectedRoute>
              <PageTitle title="Gráfico Básico" />
              <Chart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <ProtectedRoute>
              <PageTitle title="Alertas" />
              <Alerts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <ProtectedRoute>
              <PageTitle title="Botões" />
              <Buttons />
            </ProtectedRoute>
          }
        />
        <Route
          index
          element={
            <>
              <PageTitle title="UniAlfa" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            userRole === 'admin' ? (
              <>
                <PageTitle title="Inscrever-se" />
                <SignUp />
              </>
            ) : (
              <div>Acesso negado. Você não tem permissão para acessar esta página.</div>
            )
          }
        />

        <Route
          path="/insurt/bazzar"
          element={
            <>
              <PageTitle title="insurt" />
              <Insurt />
            </>
          }
        />
        <Route
          path="/insurt/reserva"
          element={
            (userRole === 'admin' || userRole === 'professor') ? (
              <>
                <PageTitle title="Insert Reserva" />
                <InsurtReserva />
              </>
            ) : (
              <div>Acesso negado. Você não tem permissão para acessar esta página.</div>
            )
          }
        />

        <Route
          path="/insurt/ambiente"
          element={
            userRole === 'admin' ? (
              <>
                <PageTitle title="Insert Ambiente" />
                <InsertAmbient />
              </>
            ) : (
              <div>Acesso negado. Você não tem permissão para acessar esta página.</div>
            )
          }
        />
        <Route
          path="/insurt/transparency"
          element={
            <>
              <PageTitle title="insurt" />
              <InsurtTransparency />
            </>
          }
        />
        <Route
          path="/insurt/voluable"
          element={
            <>
              <PageTitle title="insurt" />
              <InsurtValuable />
            </>
          }
        />
        <Route
          path="/insurt/event"
          element={
            <>
              <PageTitle title="insurt" />
              <InsurtEvents />
            </>
          }
        />
        <Route
          path="/update/AboutUs/:id"
          element={
            <>
              <PageTitle title="insurt" />
              <UpdateAboutUs />
            </>
          }
        />

        <Route
          path="/update/reserva/:id"
          element={
            <>
              <PageTitle title="insurt" />
              <UpdateReserva />
            </>
          }
        />
        <Route
          path="/update/user/:id"
          element={
            <>
              <PageTitle title="insurt" />
              <UpdateUser />
            </>
          }
        />

        <Route
          path="/registrar"
          element={
            <>
              <PageTitle title="insurt" />
              <InsertUser />
            </>
          }
        />
      </Routes>



    </DefaultLayout>
  );
}

export default App;