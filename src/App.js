import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ChatView from "./container/ChatView/ChatView";
import UserForm from "./container/UseForm/UserForm";
import { ROUTINGS } from "./constants/routingConstant";
import PrivateRoutes from "./hoc/PrivateRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTINGS.FORM} element={<UserForm />} />
          <Route path={ROUTINGS.PRIVATE_ROUTES} element={<PrivateRoutes />}>
            <Route path={ROUTINGS.CHATVIEW} element={<ChatView />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <ChatView /> */}
    </>
  );
}

export default App;
