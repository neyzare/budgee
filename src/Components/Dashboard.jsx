import NavBar from "./NavBar";
import '../css/Dashboard.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardController from "../controllers/DashboardController.jsx";
import Cookies from "js-cookie";


const Modal = ({ isOpen, onClose, onSave, data }) => {
  const [title, setTitle] = useState(data?.title || "");
  const [description, setDescription] = useState(data?.description || "");
  const [transaction_date, setDate] = useState(data?.date || new Date().toISOString().substring(0, 10));
  const [amount, setAmount] = useState(data?.amount || "");
  const handleSave = () => {
    const updatedData = { title, description, transaction_date, amount };
    onSave(updatedData);
    const formattedDate = new Date(date).toISOString().split('T')[0]; // Format 'YYYY-MM-DD'
    const data = {
      title: title,
      description: description,
      transaction_date: formattedDate,  // Utilisation de la date formatée
      amount: parseFloat(amount),
    };

    console.log("Données à enregistrer : ", {
      title,
      description,
      transaction_date: formattedDate,
      amount: parseFloat(amount),
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
        <div className="modal-box bg-white p-6 rounded shadow-lg max-w-md w-full">
          <h2 className="text-xl font-bold mb-4 text-black">Modifier la cellule</h2>

          <div className="mb-4">
            <label className="block text-sm text-black">Titre</label>
            <input
                className="border p-2 w-full bg-white"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-black">Description</label>
            <textarea
                className="border p-2 w-full bg-white"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-black">Date</label>
            <input
                type="date"
                className="border p-2 w-full bg-white"
                value={transaction_date}
                onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-black">Montant (€)</label>
            <input
                type="number"
                className="border p-2 w-full bg-white"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <button className="bg-green-500 text-white px-4 py-2 mr-2 rounded" onClick={handleSave}>
              Enregistrer
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onClose}>
              Annuler
            </button>
          </div>
        </div>
      </div>
  );
};

function Dashboard() {
  const [columns, setColumns] = useState(["Loyer", "Course", "Transport", "Loisir / Sortie", "Remboursement"]);
  const [rows, setRows] = useState(6);
  const [cellData, setCellData] = useState({});
  const [selectedCell, setSelectedCell] = useState(null);

  const AddColumn = () => {
    const newColumnName = `Depense ${columns.length + 1}`;
    setColumns([...columns, newColumnName]);
  };

  const AddRow = () => {
    setRows(rows + 1);
  };

  const handleCellClick = (rowIndex, colIndex) => {
    setSelectedCell({ rowIndex, colIndex });
  };

  const handleModalSave = (data) => {
    const cellKey = `${selectedCell.rowIndex}-${selectedCell.colIndex}`;
    setCellData({
      ...cellData,
      [cellKey]: data,
    });

    // Utiliser le contrôleur pour envoyer les données
    DashboardController({
      row: selectedCell.rowIndex,
      columns: selectedCell.colIndex,
      ...data,
    })
        .then((responseData) => {
          console.log("Données enregistrées avec succès :", responseData);
          // Tu peux ici, par exemple, mettre à jour l'interface ou effectuer d'autres actions
        })
        .catch((error) => {
          console.error("Erreur lors de l'enregistrement des données :", error);
        });

    setSelectedCell(null); // Fermer le modal
  };

  useEffect(() => {

    const getData = async () => {
      const authToken = Cookies.get("auth_token")
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/tableau-budgee',{
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          withCredentials: true,
        });
        const fetchedData = response.data.reduce((acc, item) => {
          const cellKey = `${item.row}-${item.columns}`;
          acc[cellKey] = {
            title: item.title,
            description: item.description,
            transaction_date: item.transaction_date,
            amount: item.amount,
          };
          return acc;
        }, {});
        setCellData(fetchedData);
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    };

    getData();
  }, []);

  return (
      <>
        <NavBar />
        <div className="flex items-center justify-center min-h-screen flex-col bg-white">
          <div className="w-[90%] max-h-[400px] overflow-x-auto overflow-y-auto">
            <table className="border-separate border-spacing-2 border border-slate-500 w-full bg-bleu-card-1 text-white">
              <thead>
              <tr>
                {columns.map((col, index) => (
                    <th key={index} className="border border-white w-40 h-12 bg-bleu-card min-w-44">
                      {col}
                    </th>
                ))}
              </tr>
              </thead>
              <tbody>
              {[...Array(rows)].map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {columns.map((_, colIndex) => {
                      const cellKey = `${rowIndex}-${colIndex}`;
                      const data = cellData[cellKey] || {};
                      return (
                          <td
                              key={colIndex}
                              className="border border-white h-12 bg-bleu-card text-white cursor-pointer min-w-44"
                              onClick={() => handleCellClick(rowIndex, colIndex)}
                          >
                            {data.title && <strong>{data.title}</strong>}<br />
                            {data.amount && <span>{data.amount} €</span>}
                          </td>
                      );
                    })}
                  </tr>
              ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <button
                onClick={AddColumn}
                className="bg-green-500 text-white px-4 py-2 rounded-lg m-4"
            >
              Ajouter une colonne
            </button>

            <button
                onClick={AddRow}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Ajouter une ligne
            </button>
          </div>
        </div>
        {selectedCell && (
            <Modal
                isOpen={selectedCell !== null}
                onClose={() => setSelectedCell(null)}
                onSave={handleModalSave}
                data={cellData[`${selectedCell.rowIndex}-${selectedCell.colIndex}`] || {}}
            />
        )}
      </>
  );
}

export default Dashboard;