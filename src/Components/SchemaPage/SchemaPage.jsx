import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./SchemaPage.css"; // Import your CSS file for styling
// import "tailwindcss/tailwind.css"; // Uncomment if using Tailwind CSS
const API_URL = "http://localhost:8001/query"
function SchemaPage() {
  const [nlInput, setNlInput] = useState("");
//   const [manualFields, setManualFields] = useState([{ name: "", type: "TEXT" }]);

//   const handleAddField = () => {
//     setManualFields([...manualFields, { name: "", type: "TEXT" }]);
//   };

//   const handleFieldChange = (index, key, value) => {
//     const updated = [...manualFields];
//     updated[index][key] = value;
//     setManualFields(updated);
//   };

//   function generateSchemaText(columns) {
//   if (!Array.isArray(columns) || columns.length === 0) {
//     return "No columns provided to define the database schema.";
//   }

//   let description = "Create a database schema with the following structure:";

//   columns.forEach((col, index) => {
//     description += `- Column ${index + 1}: '${col.name}' of type '${col.type}' — `;
//     switch (col.type.toUpperCase()) {
//       case "INTEGER":
//         description += "used to store numeric values like quantities or counts";
//         break;
//       case "TEXT":
//         description += "used to store textual or string data";
//         break;
//       case "BOOLEAN":
//         description += "used to store true/false values";
//         break;
//       case "FLOAT":
//       case "REAL":
//         description += "used to store decimal numbers";
//         break;
//       default:
//         description += "custom or unspecified data type";
//     }
//   });

//   return description;
// }


  const handleSubmitNL = async () => {
    const res = await axios.post(API_URL, {
      "natural_language": nlInput,
    });
    alert(res.data.message || "Schema created!");
  };

//   const handleSubmitManual = async () => {
//     const res = await axios.post(API_URL, {
//       "natural_language": generateSchemaText(manualFields),
//     });
//     if(res.status===200){
//         setNlInput('')
//         setManualFields([{ name: "", type: "TEXT" }]);
//     }
//     alert(res.data.message || "Schema created!");
//     console.log("Manual fields submitted:", generateSchemaText(manualFields));
//   };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex justify-center items-start">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="bg-white shadow-xl rounded-lg p-8 w-full max-w-2xl"
      >
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          🧠 Smart Schema Builder
        </h1>

        {/* Natural Language */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">💬 Describe your data</h2>
          <textarea
            value={nlInput}
            onChange={(e) => setNlInput(e.target.value)}
            placeholder="e.g., I want to store student names, ages, and grades."
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none"
            rows="4"
            mb-4
          />
          <br/>
          <br/>
          <button
            onClick={handleSubmitNL}
            className="mt-3 px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Generate Schema from Text
          </button>
        </div>

        {/* <hr className="my-6 border-gray-300" /> */}

        {/* Manual Fields */}
        {/* <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">📝 Manual Field Entry</h2>
          {manualFields.map((field, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-3 mb-3"
            >
              <input
                type="text"
                placeholder="Field name"
                value={field.name}
                onChange={(e) => handleFieldChange(index, "name", e.target.value)}
                className="flex-1 px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-300 focus:outline-none schema-input-text"
              />
              <select
                value={field.type}
                onChange={(e) => handleFieldChange(index, "type", e.target.value)}
                className="px-3 py-2 border rounded-md shadow-sm"
              >
                <option value="TEXT">TEXT</option>
                <option value="INTEGER">INTEGER</option>
                <option value="REAL">REAL</option>
                <option value="BOOLEAN">BOOLEAN</option>
              </select>
            </motion.div>
          ))}

          <div className="flex items-center justify-between mt-5 schema-builder-actions">
            <button
              onClick={handleAddField}
              className="text-indigo-600 hover:underline transition"
            >
              + Add another field
            </button>
            <button
              onClick={handleSubmitManual}
              className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Create Schema
            </button>
          </div>
        </div> */}
      </motion.div>
    </div>
  );
}

export default SchemaPage;
