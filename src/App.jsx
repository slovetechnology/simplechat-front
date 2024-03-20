import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatRoom from "./pages/ChatRoom";
import UsersPage from "./pages/UsersPage";
import Passengers from "./pages/Passengers";

export default function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/pass" element={<Passengers />} />
    <Route path="/users" element={<UsersPage />} />
    <Route path="/chat/:roomid" element={<ChatRoom />} />
   </Routes>
   </BrowserRouter>
  )
}