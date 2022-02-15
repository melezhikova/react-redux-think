import React, {Fragment} from 'react';
import ServiceList from './components/ServiceList';
import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import ServiceEdit from './components/ServiceEdit';


function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route exact path="/" element={<Navigate to={'/services'} />} />
          <Route path="/services/:id" element={<ServiceEdit />} />
          <Route path="/services" element={<ServiceList />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
