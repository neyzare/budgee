import PagePrincipale from "./PagePrincipale";
import Dashboard from "./Dashboard";
import Login from "./Login";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Inscription from "./Inscription";

function AppRouter() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<PagePrincipale />}/>
          <Route path="/Dashboard" element={<Dashboard/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Inscription" element={<Inscription/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default AppRouter;