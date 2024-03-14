// importing modules 
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const empRoutes = require("./routes/EmployeeRoutes");
const app = express();

// setting cors policy
app.use(cors());

// rendering frontend
app.use(express.static(path.join(__dirname,'build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'build', 'index.html'));
});
const PORT = 8000;
app.use(bodyParser.json());
// setting up the routes 
app.use("/api", empRoutes);
app.use("/api/add",empRoutes);
app.use("/api/update",empRoutes);
app.use("/api/del",empRoutes);
app.use("/api/search", empRoutes);
app.use("/api/filter", empRoutes);
app.use("/api/avgsal", empRoutes);

// start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});