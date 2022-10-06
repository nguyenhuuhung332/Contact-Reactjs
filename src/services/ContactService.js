  import axios from "axios";

  
  export class ContactService{
    static  serverURL = `http://localhost:9000`;
    static getCitys(){
      const dataURL = `${this.serverURL}/citys`;
      return axios.get(dataURL);
    }

    static getCity(contact){
      const cityId = contact.cityId;
      const dataURL = `${this.serverURL}/citys/${cityId}`;
      return axios.get(dataURL);

    }
    static getAllContacts(){
      const dataURL = `${this.serverURL}/contacts`;
      return axios.get(dataURL);
    }
    static getContact(contactId){
      const dataURL = `${this.serverURL}/contacts/${contactId}`;
      return axios.get(dataURL)
    }
    static creatContact(contact){
      let dataURL = `${this.serverURL}/contacts`;
      return axios.post(dataURL, contact)
    }
    static updateContact(contact,contactId){
      let dataURL = `${this.serverURL}/contacts/${contactId}`;
      return axios.put(dataURL, contact)
    }
    static deleteContact(contactId){
      let dataURL = `${this.serverURL}/contacts/${contactId}`;
      return axios.delete(dataURL)
    }
  }