import './App.css';
import Helmet from "react-helmet";
import { Outlet } from 'react-router-dom';

export const App = () => {

  return (
    <div className="App">
      <Helmet>
        <link rel="icon" href="/favicon.jpg" />
      </Helmet>
      
      <Outlet />
    </div>
  );
}