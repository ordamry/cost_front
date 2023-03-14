/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import CostList from './pages/CostList'
import Home from './pages/Home'
import ProtectedRoute from './routing/ProtectedRoute'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Profile from './pages/Profile'
import Category from './pages/Category'
import CreateCategory from './pages/CreateCategory'
import UpdateCategory from './pages/UpdateCategory'
import AddCost from './pages/AddCost'
import UpdateCost from './pages/UpdateCost'
import UserList from './pages/UserList'
import Report from './pages/Report'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/costs' element={<CostList />} />
            <Route path='/new-cost' element={<AddCost />} />
            <Route path='/costs/:costId' element={<UpdateCost />} />
            <Route path='/profile' element={<Profile />} />
            {/* Category Part */}
            <Route path='/category' element={<Category />} />
            <Route path='/report' element={<Report />} />
            <Route path='/new-category' element={<CreateCategory />} />
            <Route path='/category/:categoryId' element={<UpdateCategory />} />
            <Route path='/users' element={<UserList />} />
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
