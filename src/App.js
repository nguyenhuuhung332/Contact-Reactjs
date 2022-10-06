import React from "react";
import './App.css';
import {Routes,Route, Navigate} from 'react-router-dom';
import NavBar from "./component/navbar/navbar";
import ContactList from "./component/contact/contactlist/contactlist";
import AddconTact from "./component/contact/addcontact/addcontact";
import EditconTact from "./component/contact/editcontact/editcontact";
import ViewconTact from "./component/contact/viewcontact/viewcontact";
const App = () => {
  return (
    <React.Fragment>
      <NavBar/>
      <Routes>
        <Route path={'/'} element={<Navigate to={'/contacts/list'}/>} />
        <Route path={'/contacts/list'} element ={<ContactList/>} />
        <Route path={'/contacts/add'} element ={<AddconTact/>} />
        <Route path={'/contacts/view/:contactId'} element ={<ViewconTact/>} />
        <Route path={'/contacts/edit/:contactId'} element ={<EditconTact/>} />
      </Routes>
    </React.Fragment>
  )
}

export default App;
