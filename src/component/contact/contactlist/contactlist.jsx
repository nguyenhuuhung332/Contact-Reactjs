import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { ContactService } from "../../../services/ContactService";

const ContactList = () => {
  const[query,setQuery] = useState({
    text:''
  });
  const [state, setState] = useState({
    loading: false,
    contacts: [],
    fillterContacts:[],
    erroMessage: "",
  });
  useEffect(() => {
    async function fetchData() {
      try {
        setState({ ...state, loading: true });
        const response = await ContactService.getAllContacts();
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          fillterContacts:response.data
        });
      } catch (error) {
        setState({
          ...state,
          loading: false,
          erroMessage: error.message,
        });
      }
    }
    fetchData();
  }, []);

   const clickDelete = async(contactId) =>{
    try{
      let reponse = await ContactService.deleteContact(contactId);
      if(reponse){
      setState({ ...state, loading: true });
      const response = await ContactService.getAllContacts();
      setState({
        ...state,
        loading: false,
        contacts: response.data,
        fillterContacts:reponse.data
      });
    }
    }
    catch(error){
      setState({
        ...state,
        loading: false,
        erroMessage: error.message,
      });
    }
   }

   const searchContacts = (event) =>{
      setQuery({
        ...query,
        text: event.target.value
      });
      const theContacts = state.contacts.filter(contact => {
        return contact.name.toLowerCase().includes(event.target.value.toLowerCase())
      });
      setState ({
        ...state,
        fillterContacts: theContacts
      })
   };
  const { loading, contacts, erroMessage,fillterContacts } = state;
  return (
    <React.Fragment>
      <section className="contact-search p-3">
        <div className="container">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3 fw-bold>">
                  Contact Manager
                  <Link to={"/contacts/add"} className="btn btn-primary ms-2">
                    <i className="fa fa-plus-circle me-2" />
                    New
                  </Link>
                </p>
                <p className="fst-italic">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Neque, odio!
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <form className="row">
                  <div className="col">
                    <div className="mb-2">
                      <input
                        name="text"
                        value={query.text}
                        onChange={searchContacts}
                        type="text"
                        className="form-control"
                        placeholder="Search Name"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-2">
                      <input
                        type="submit"
                        className="btn btn-outline-dark"
                        value="Search"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-list">
        <div className="container">
          <div className="row">
            {fillterContacts.length > 0 &&
              fillterContacts.map((contact) => {
                return (
                  <div className="col-md-6" key={contact.id}>
                    <div className="card my-2">
                      <div className="card-body">
                        <div className="row align-items-center d-flex justify-content-around">
                          <div className="col-md-4">
                            <img
                              src={contact.photo}
                              alt=""
                              className="contact-img"
                            ></img>
                          </div>
                          <div className="col-md-7">
                            <ul className="list-group ">
                              <li className="list-group-item list-group-item-action">
                                Name :{" "}
                                <span className="fw-bold">{contact.name}</span>
                              </li>
                              <li className="list-group-item list-group-item-action">
                                Mobile :{" "}
                                <span className="fw-bold">
                                  {contact.mobile}
                                </span>
                              </li>
                              <li className="list-group-item list-group-item-action">
                                Email :{" "}
                                <span className="fw-bold">{contact.email}</span>
                              </li>
                            </ul>
                          </div>
                          <div className="col-md-1 d-flex flex-column align-items-center">
                            <Link
                              to={`/contacts/view/${contact.id}`}
                              className="btn btn-warning my-1"
                            >
                              <i className="fa fa-eye" />
                            </Link>
                            <Link
                              to={`/contacts/edit/${contact.id}`}
                              className="btn btn-primary my-1"
                            >
                              <i className="fa fa-pen" />
                            </Link>
                            <button className="btn btn-danger my-1" onClick={()=>clickDelete(contact.id)}>
                              <i className="fa fa-trash" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
export default ContactList;
