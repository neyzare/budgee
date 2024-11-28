import axios from 'axios';

const InscriptionController = async (name, email, password) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/register', {
      name,
      email,
      password,
    });
    return response.data
  } catch (e) {
    console.error('Erreur lors de l\'inscription:', e);
    throw e;
  }
};

export default InscriptionController