import axios from "axios";
import Cookies from "js-cookie";

const DashboardController = async (data) => {
    try {

        const authToken = Cookies.get("auth_token");


        if (!authToken) {
            throw new Error("Jeton d'authentification manquant.");
        }


        const response = await axios.post(
            "http://127.0.0.1:8000/api/tableau-budgee",
            data,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                withCredentials: true,
            }
        );

        if (response.status === 201) {
            console.log("Données enregistrées avec succès :", response.data);
            return response.data;
        } else {
            throw new Error(`Erreur HTTP ${response.status}: ${response.statusText}`);
        }
    } catch (error) {

        if (error.response) {
            console.error("Erreur lors de l'envoi des données :", error.response.data);
            throw new Error(error.response.data.message || "Erreur serveur");
        } else {
            console.error("Erreur inconnue :", error.message);
            throw new Error("Une erreur inconnue s'est produite.");
        }
    }
};

export default DashboardController;