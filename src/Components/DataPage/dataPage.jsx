import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Button,
  CircularProgress
} from "@mui/material";
import { Edit, Delete, Save, Add } from "@mui/icons-material";

const API_URL = "http://localhost:8000";

const DataPage = () => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [newRow, setNewRow] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/list_tables`).then((res) => setTables(res.data.tables));
  }, []);

  const fetchTableData = async (tableName) => {
    setLoading(true);
    setSelectedTable(tableName);
    try {
      const res = await axios.get(`${API_URL}/display_table?table_name=${tableName}`);
      console.log("Fetched table data:", res.data);
      setColumns(res.data.columns);
      setRows(res.data.rows);

      const newRowTemplate = {};
      res.data.columns.forEach((col) => (newRowTemplate[col] = ""));
      setNewRow(newRowTemplate);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleInputChange = (e, col, index = null) => {
    const value = e.target.value;
    if (index === null) {
      setNewRow({ ...newRow, [col]: value });
    } else {
      const updated = { ...editedRow, [col]: value };
      setEditedRow(updated);
    //   console.log("updated row",JSON.stringify(updated));
    }
    
  };

  const handleAddRow = async () => {
    try {
    //   await axios.post(`${API_URL}${selectedTable}/insert_row`, newRow);
        const { id, ...data } = newRow;
      const updatedAddRow = {table_name: selectedTable,row_data : {...data}};
      await axios.post(`${API_URL}/insert_row`, updatedAddRow, {
        headers: {
            'Content-Type': 'application/json'
        }
        });
      fetchTableData(selectedTable);
    } catch (error) {
      console.error("Failed to add row:", error);
    }
  };

  const handleDeleteRow = async (rowData) => {
    try {
      await axios.delete(`${API_URL}/delete_row?table_name=${selectedTable}&row_id=${rowData.id}`);
      fetchTableData(selectedTable);
    } catch (error) {
      console.error("Failed to delete row:", error);
    }
  };

  const handleEditClick = (index, row) => {
    setEditIndex(index);
    setEditedRow(row);
  };

  const handleSaveEdit = async () => {
    try {
      const { id, ...updates } = editedRow;
      const updatedEditRow = {table_name: selectedTable,row_id : id ,updates : { ...updates}};
      await axios.patch(`${API_URL}/update_row`, updatedEditRow, {
        headers: {
            'Content-Type': 'application/json'
        }
        });

      setEditIndex(null);
      fetchTableData(selectedTable);
    } catch (error) {
      console.error("Failed to update row:", error);
    }
  };

  if(rows.length === 0 && selectedTable) {
    const data = rows.map((row, index) => {
  return columns.map((col) => {
    if (editIndex === index) {
      // Editing mode logic
      return editedRow[col] || "";
    } else {
      // Display mode logic
      return row[col];
    }
  });
});
console.log("Data to display:", rows);
  }

  return (
    <Box p={4} sx={{ background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)", minHeight: "100vh" }}>
      <Box maxWidth={800} margin="auto">
        <Typography variant="h4" align="center" gutterBottom fontWeight={700} color="#333">
          Dynamic Table Manager
        </Typography>

        <FormControl fullWidth margin="normal">
          <InputLabel>Select Table</InputLabel>
          <Select value={selectedTable} onChange={(e) => fetchTableData(e.target.value)} label="Select Table">
            {tables.map((table) => (
              <MenuItem key={table} value={table}>{table}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {loading ? (
          <Box textAlign="center" mt={4}><CircularProgress /></Box>
        ) : selectedTable && (
          <Box mt={4}>
            <TableContainer component={Paper} elevation={4}>
              <Table>
                <TableHead>
                  <TableRow>
                    {columns.map((col) => (
                      <TableCell key={col} sx={{ fontWeight: 600 }}>{col}</TableCell>
                    ))}
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow key={index}>
                      {columns.map((col) => (
                        <TableCell key={col}>
                          {editIndex === index ? (
                            <TextField
                              variant="standard"
                              value={editedRow[col] || ""}
                              onChange={(e) => handleInputChange(e, col, index)}
                            />
                          ) : (
                            row[col]
                          )}
                        </TableCell>
                      ))}
                      <TableCell>
                        {editIndex === index ? (
                          <IconButton color="primary" onClick={handleSaveEdit}>
                            <Save />
                          </IconButton>
                        ) : (
                          <IconButton color="info" onClick={() => handleEditClick(index, row)}>
                            <Edit />
                          </IconButton>
                        )}
                        <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}

                  {/* Add New Row */}
                  {columns.length > 0 && (
                    <TableRow>
                      {columns.map((col) => (
                        <TableCell key={col}>
                          <TextField
                            variant="standard"
                            placeholder={`Enter ${col}`}
                            value={newRow[col] || ""}
                            onChange={(e) => handleInputChange(e, col)}
                          />
                        </TableCell>
                      ))}
                      <TableCell>
                        <IconButton color="success" onClick={handleAddRow}>
                          <Add />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DataPage;
