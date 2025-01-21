import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignupPage from './pages/LoginSignupPage';
import DashboardPage from './pages/DashboardPage';
import EducationalContentPage from './pages/EducationalContentPage';
import PeerChatPage from './pages/PeerChatPage';
import ChatWindow from "./components/Chat/ChatWindow";
import RelaxationResourcesPage from "./pages/RelaxationResourcesPage";
import TherapistSearchPage from "./pages/TherapistSearchPage";
import AppointmentForm from "./components/Therapist/AppointmentForm";
import JournalPage from "./pages/JournalPage";
import JournalForm from "./components/Journal/JournalForm";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginSignupPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/content" element={<EducationalContentPage />} />
      <Route path="/chat" element={<PeerChatPage />} />
      <Route path="/chat/:roomName" element={<ChatWindow />} />
      <Route path="/relaxation" element={<RelaxationResourcesPage />} />
      <Route path="/therapists" element={<TherapistSearchPage />} />
      <Route path="/appointment/:id" element={<AppointmentForm />} />
      <Route path="/journals" element={<JournalPage />} />
        <Route path="/journals/new" element={<JournalForm />} />
        <Route path="/journals/edit/:id" element={<JournalForm />} />
    </Routes>
  </Router>
);

export default AppRoutes;
