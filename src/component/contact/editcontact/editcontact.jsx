import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
const EditconTact = () => {
  const { contactId } = useParams();
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

  useEffect(() => {
    async function fetchData() {
      try {
        setState({ ...state });
        const response = await ContactService.getContact(contactId);
        const cityResponse = await ContactService.getCitys();
        setState({
          ...state,
          contact: response.data,
          citys: cityResponse.data,
        });
      } catch (error) {
        setState({
          ...state,
          erroMessage: error.message,
        });
      }
    }
    fetchData();
  }, [contactId]);

  const updateInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      let response = await ContactService.updateContact(
        state.contact,
        contactId
      );
      if (response) {
        navigate("/contacts/list", { replace: true });
      }
    } catch (error) {
      setState({
        ...state,
        errorMessage: error.Message,
      });
      navigate("/contacts/edit/${contactId}", { replace: false });
    }
  };
  let { contact, citys, errorMessage } = state;

  return (
    <React.Fragment>
      <section className="add-contact p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h4 text-primary fw-bold">Edit Contact</p>
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
                    placeholder=""
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
                    placeholder="mobile"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="name"
                    value={contact.email}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="email"
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
                    placeholder="company"
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
                    placeholder="title"
                  />
                </div>
                <div className="mb-2">
                  <select className="form-control"
                    required='true'
                    name='cityId'
                    value={contact.cityId}
                    onChange={updateInput}>
                    <option value=""> Select a City</option>
                    {citys.length > 0 &&
                      citys.map((city) => {
                        return (
                          <option key={city.id} value={city.id}>
                            {city.city}
                          </option>
                        )
                      })}
                  </select>
                </div>
                <div className="mb-2">
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Update  "
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
export default EditconTact;
