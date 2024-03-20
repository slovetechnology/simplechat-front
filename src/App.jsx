import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/admin/HomePage";
import ChatRoom from "./pages/admin/ChatRoom";
import UsersPage from "./pages/admin/UsersPage";
import AuthRoute from "./services/AuthRoute";
import Login from "./pages/general/Login";
import Signup from "./pages/general/Signup";


export default function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<AuthRoute><HomePage/></AuthRoute>} />
    <Route path="/users" element={<UsersPage />} />
    <Route path="/chat/:roomid" element={<ChatRoom />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
   </Routes>
   </BrowserRouter>
  )
}