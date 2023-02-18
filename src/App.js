import { Box, Button, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import TableComponent from "./components/commonTable/TableComponent";

function App() {
  const headCells = [
    {
      id: "id",
      numeric: true,
      disablePadding: false,
      label: "ID",
    },
    {
      id: "calories",
      numeric: true,
      disablePadding: false,
      label: "Name",
    },
    {
      id: "fat",
      numeric: true,
      disablePadding: false,
      label: "Fat (g)",
    },
    {
      id: "carbs",
      numeric: true,
      disablePadding: false,
      label: "Carbs (g)",
    },
    {
      id: "protein",
      numeric: true,
      disablePadding: false,
      label: "Protein (g)",
    },
    {
      id: "action",
      numeric: true,
      disablePadding: false,
      label: "Action",
    },
  ];
  const rows = [
    {
      id: "1",
      calories: "adnan",
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
    },
    {
      id: "2",
      calories: "turjoy",
      fat: 24.7,
      carbs: 51,
      protein: 4.9,
    },
    {
      id: "3",
      calories: "abir",
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
    },
    {
      id: "4",
      calories: "helal",
      fat: 24.7,
      carbs: 51,
      protein: 4.9,
    },
    {
      id: "5",
      calories: "shovon",
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
    },
    {
      id: "6",
      calories: "rinku",
      fat: 24.7,
      carbs: 51,
      protein: 4.9,
    },
    {
      id: "7",
      calories: "sazzad",
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
    },
    {
      id: "8",
      calories: "hasan",
      fat: 24.7,
      carbs: 51,
      protein: 4.9,
    },
  ];
  const [action, setAction] = useState({
    isAction: true,
    actionName: "read",
  });

  const [checkedData, setCheckedData] = useState([]);
  const [clickedAction, setCLickedAction] = useState({});
  const [open, setOpen] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const handleModalOpen = (data) => {
    setCLickedAction(data);
    setOpen(true);
  };
  console.log(checkedData);
  return (
    <div className="App">
      <Modal
        hideBackdrop
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="child-modal-title">{clickedAction.calories}</h2>
          <p id="child-modal-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequatur, qui. {clickedAction.fat}
          </p>
          <Button
            variant="contained"
            size="small"
            onClick={() => setOpen(false)}
          >
            Ok Now Go
          </Button>
        </Box>
      </Modal>
      <TableComponent
        rows={rows} // table data
        headCells={headCells} // table field name
        action={action} // button action if need any
        tableName="This is a table" // title of table
        isChecked={true} // need checked or not
        setCheckedData={setCheckedData} // get checked id of field
        handleModalOpen={handleModalOpen} // model open or not and get data
      />
    </div>
  );
}

export default App;
