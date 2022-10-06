import logo from './logo.svg';
import './App.css';
import UserList from './components/users/UserList';
import AddUser from './components/users/AddUser';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
      <NotificationContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<UserList />} />
          <Route path="/add" element={<AddUser />} />
          <Route path="/edit/:id" element={<AddUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
