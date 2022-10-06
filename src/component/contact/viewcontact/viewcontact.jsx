import React, {useState,useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
const ViewconTact = () => {

  const {contactId} = useParams();
  const [state,setState] = useState({
    loading:false,  
    contact:[],
    erroMessage:'',
    city:[] 
   });
   useEffect(() => {
     async function fetchData() {
       try{
         setState({...state,loading:true});
       const response = await ContactService.getContact(contactId);
       const cityResponse = await ContactService.getCity(response.data)
       setState({
         ...state,
         loading:false,
         contact:response.data,
         city: cityResponse.data,
       });
       }
       catch(error){
         setState({
           ...state,
           loading:false,
           erroMessage:error.message
         })
       }
     }
     fetchData();
   }, []);
   const {loading,contact,erroMessage,city} =  state;
  return (
    <React.Fragment>
      <section className="view-contact p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-warning fw-bold">View contact</p>
              <p className="fst-italic">
                “Lorem ipsum” dummy text is used by many web-developers to test
                how their HTML templates will look with real data. Often,
                developers use third-party services to generate “Lorem ipsum”
                text, but now you can do that right in your editor. Just expand
                lorem or lipsum abbreviations to get the following snippet:
              </p>
            </div>
          </div>
        </div>
      </section>
      

      {
        Object.keys(contact).length > 0 && Object.keys(city).length > 0 &&
      <section className="view-contact mt-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4">
              <img
                src={contact.photo}
                alt=""
                className="contact-img"
              ></img>
            </div>
            <div className="col-md-8">
              <ul className="list-group ">
                <li className="list-group-item list-group-item-action">
                  Name : <span className="fw-bold">{contact.name}</span>
                </li>
                <li className="list-group-item list-group-item-action">
                  Mobile : <span className="fw-bold">{contact.mobile}</span>
                </li>
                <li className="list-group-item list-group-item-action">
                  Email : <span className="fw-bold">{contact.email}</span>
                </li>
                <li className="list-group-item list-group-item-action">
                  Job : <span className="fw-bold">{contact.company}</span>
                </li>
                <li className="list-group-item list-group-item-action">
                  Title : <span className="fw-bold">{contact.title}</span>
                </li>
                <li className="list-group-item list-group-item-action">
                  City : <span className="fw-bold">{city.city}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Link to={"/contacts/list"} className="btn btn-warning">
                Back
              </Link>
            </div>
          </div>
        </div>
      </section>
      }
    </React.Fragment>
  );
};
export default ViewconTact;
