import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Docs from './pages/Docs';
import AgentDemo from './pages/AgentDemo';
import GlobalLayout from './components/GlobalLayout';
import 'antd/dist/reset.css';

function App() {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/docs/*" element={<Docs />} />
        <Route path="/agent-demo" element={<AgentDemo />} />
      </Route>
    </Routes>
  );
}

export default App;