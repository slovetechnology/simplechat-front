import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatRoom from "./pages/ChatRoom";
import UsersPage from "./pages/UsersPage";

export default function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/users" element={<UsersPage />} />
    <Route path="/chat/:roomid" element={<ChatRoom />} />
   </Routes>
   </BrowserRouter>
  )
}