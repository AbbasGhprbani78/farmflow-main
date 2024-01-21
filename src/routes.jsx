import LogIn from "./pages/LogIn";
import HomePage from "./pages/HomePage";
import Chat from "./pages/Chat";
import Convertpoint from "./pages/Convertpoint";
import Employees from "./pages/Employees";
import ProfileAdd from "./pages/Employees";
import Game from "./pages/Game";
import Leaderboard from "./pages/Leaderboard";
import Machines from "./pages/Machines";
import Notifications from "./pages/Notifications";
import Product from "./pages/Product";
import Report from "./pages/Report";
import PageNotFound from "./pages/PageNotFound";
import TriviaGame from "./pages/TriviaGame";
import MemoryGame from "./pages/MemoryGame";
import WeatherGame from "./pages/WeatherGame";
import HistoryDiscount from './components/HistoryDiscount/HistoryDiscount'
import Shop from './components/Shop/Shop'
import EmployeesHome from "./pages/EmployeesHome";
import PrivateRoute from "./components/PrivateRoute";
import ChatEmployee from "./pages/ChatEmployee";
import EmployeeProduct from './pages/EmployeeProduct'
import Employeess from './pages/Employeess';
import EmployeeLeaderboard from './pages/EmployeeLeaderboard'
import EmployeeConvertPoint from './pages/EmployeesConverpoint'
import EmployeeNotifications from './pages/EmployeeNotifications'
import EmployeeGame from "./pages/EmployeeGame";
import EmployeeTrivia from "./pages/EmployeeTrivia";
import EmployeeMemory from "./pages/EmployeeMemory";
import EmployeeWeather from "./pages/EmployeeWeather";
import EmployeeShop from './pages/EmployeeShop'
import EmployeeHistoryDicount from "./components/EmployeeHistoryDiscount";
import SignUp from "./pages/SignUp";
import { EditProf } from "./components/EditProf";
import EmployeeEditProf from "./components/EmployeeEditProf";



let routes = [

    { path: "/", element: <PrivateRoute><HomePage /></PrivateRoute> },
    { path: "/chat", element: <PrivateRoute><Chat /> </PrivateRoute> },
    { path: "/profileadd", element: <PrivateRoute><ProfileAdd /></PrivateRoute> },
    { path: "/employees", element: <PrivateRoute><Employees /></PrivateRoute> },
    { path: "/leaderboard", element: <PrivateRoute><Leaderboard /></PrivateRoute> },
    { path: "/machines", element: <PrivateRoute><Machines /></PrivateRoute> },
    { path: "/notifications", element: <PrivateRoute><Notifications /></PrivateRoute> },
    { path: "/farmdetails", element: <PrivateRoute><Product /></PrivateRoute> },
    { path: "/report", element: <PrivateRoute><Report /></PrivateRoute> },
    { path: "/game", element: <PrivateRoute><Game /></PrivateRoute> },
    { path: "/triviaHome", element: <PrivateRoute>< TriviaGame /></PrivateRoute> },
    { path: '/memoryGame', element: <PrivateRoute><MemoryGame /></PrivateRoute> },
    { path: '/weatherGame', element: <PrivateRoute><WeatherGame /></PrivateRoute> },
    { path: "/convertpoint", element: <PrivateRoute><Convertpoint /> </PrivateRoute> },
    { path: '/shop', element: <PrivateRoute> <Shop /></PrivateRoute> },
    { path: '/historyDiscount', element: <PrivateRoute><HistoryDiscount /></PrivateRoute> },
    { path: '/historyDiscount', element: <PrivateRoute><HistoryDiscount /></PrivateRoute> },
    { path: '/nofi', element: <PrivateRoute><HistoryDiscount /></PrivateRoute> },
    { path: '/editProf', element: <PrivateRoute><EditProf /></PrivateRoute> },


    { path: "/signin", element: <SignUp /> },
    { path: "/login", element: <LogIn /> },
    { path: '/employeeshop', element: <EmployeeShop /> },
    { path: "/employeeconvertpoint", element: <EmployeeConvertPoint /> },
    { path: '/employeehistoryDiscount', element: <EmployeeHistoryDicount /> },
    { path: "/employeegame", element: <EmployeeGame /> },
    { path: "/employeetrivia", element: < EmployeeTrivia /> },
    { path: '/employeememory', element: <EmployeeMemory /> },
    { path: '/employeeweather', element: <EmployeeWeather /> },
    { path: '/employeesHome', element: <EmployeesHome /> },
    { path: '/employeesChat', element: < ChatEmployee /> },
    { path: '/employeefarmdetails', element: <EmployeeProduct /> },
    { path: '/employeess', element: <Employeess /> },
    { path: '/employeeLeaderboard', element: <EmployeeLeaderboard /> },
    { path: '/employeeNotifications', element: <EmployeeNotifications /> },
    { path: '/employeeeditProf', element: <EmployeeEditProf /> },
    { path: "*", element: <PageNotFound /> },
]

export default routes