import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ProtectRoute from "./ProtectRoute";
// Các pages
import Introduction from "./pages/Introduction";
import Experience from "./pages/Experience";
import Skill from "./pages/Skill";
import Education from "./pages/Education";
import Portfolio from "./pages/Portfolio";
import PortfolioDetail from "./pages/PortfolioDetail";
import Contact from "./pages/Contact";
import Notification from "./pages/Notification";
import Notification_Detail from "./pages/Notification_Detail";
function Users({ token, setStatus }) {
  return (
    <div className="flex h-screen">
      <div className="flex-[2] p-5 bg-gray-900 text-white flex flex-col items-center rounded-3xl overflow-y-auto scroll-hidden">
        <Sidebar token={token} setStatus={setStatus} />
      </div>
      <div className="flex-[8] p-5 bg-gray-900 rounded-3xl text-white ms-5  flex-row flex gap-5">
        <div className="flex-[2] border-r">
          <Navbar token={token} />
        </div>
        <div className="flex-[12] overflow-y-auto scroll-hidden p-1">
          <Routes>
            <Route
              index
              element={<Introduction token={token} setStatus={setStatus} />}
            />
            <Route
              path="experience"
              element={<Experience token={token} setStatus={setStatus} />}
            />
            <Route
              path="skill"
              element={<Skill token={token} setStatus={setStatus} />}
            />
            <Route
              path="education"
              element={<Education token={token} setStatus={setStatus} />}
            />
            <Route
              path="portfolio"
              element={<Portfolio token={token} setStatus={setStatus} />}
            />
            <Route path="contact" element={<Contact setStatus={setStatus} />} />
            {/* Nếu chưa login thì ko thể vào được qua đường link */}
            <Route
              path="notifications"
              element={
                <ProtectRoute>
                  <Notification />
                </ProtectRoute>
              }
            />
            <Route
              path="portfolio_detail/:id"
              element={
                <PortfolioDetail
                  token={token}
                  setStatus={setStatus}
                ></PortfolioDetail>
              }
            ></Route>
            <Route
              path="notification_detail/:id"
              element={
                <ProtectRoute>
                  <Notification_Detail />
                </ProtectRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Users;
