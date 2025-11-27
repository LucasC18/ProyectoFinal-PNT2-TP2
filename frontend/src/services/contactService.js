import axios from "axios";

const API_URL = "https://690beb956ad3beba00f68e06.mockapi.io/contact"; 

class ContactService {
  async enviarMensaje(data) {
    const res = await axios.post(API_URL, data);
    return res.data;
  }
}

export default new ContactService();
