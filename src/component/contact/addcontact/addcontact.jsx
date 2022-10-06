import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
const AddconTact = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    contact: {
      name: "",
      photo: "",
      mobile: "",
      email: "",
      company: "",
      title: "",
      cityId: "",
    },
    citys: [],
    errorMessage: "",
  });

  const updateInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  useEffect(() => {
    async function fetchData() {
      try{
        setState({...state,});
      const response = await ContactService.getCitys();
      setState({
        ...state,
        citys: response.data,
      });
      }
      catch(error){
        setState({
          ...state,
         
          erroMessage:error.message
        })
      }
    }
    fetchData();
  }, []);

  const submitForm = async(event) =>{
    event.preventDefault();
    try {
      let response = await ContactService.creatContact(state.contact);
      if(response){
        navigate('/contacts/list',{replace:true} );
      }
    }
    catch(error){
      setState({
        ...state,
        errorMessage: error.Message
      });
      navigate('/contacts/add',{replace:false});
    }
  };

   
  let { contact, citys, errorMessage } = state;
  return (
    <React.Fragment>
      
      <section className="add-contact p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h4 text-success fw-bold">Creat Contact</p>
              <p className="fst-italic">
                lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Eligendi non quis exercitationem culpa nesciunt nihil aut
                nostrum explicabo reprehenderit optio amet ab temporibus
                asperiores quasi cupiditate. Voluptatum ducimus voluptates
                voluptas?
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <form onSubmit={submitForm}>
                <div className="mb-2">
                  <input
                    required={true}
                    name="name"
                    value={contact.name}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="name"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="photo"
                    value={contact.photo}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Picture"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="mobile"
                    value={contact.mobile}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Mobile"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="email"
                    value={contact.email}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="company"
                    value={contact.company}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Company"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="title"
                    value={contact.title}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Title"
                  />
                </div>
                <div className="mb-2">
                  <select 
                    required={true}
                    name="cityId"
                    value={contact.cityId}
                    onChange={updateInput}
                  className="form-control">
                    <option value=""> Select a City</option>
                    {
                      citys.length > 0 &&
                        citys.map(city=>{
                          return(
                            <option key={city.id} value={city.id}> {city.city}</option>
                          )
                        })
                    }
                  </select>
                </div>
                <div className="mb-2">
                  <input
                    type="submit"
                    className="btn btn-success"
                    value="Create"
                  
                  />
                  <Link to={"/contacts/list"} className="btn btn-dark ms-2">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
export default AddconTact;
