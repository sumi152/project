import express from 'express';
import cors from 'cors';
import { processArray, validateFile } from './utils.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// GET endpoint
app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

// POST endpoint
app.post('/bfhl', (req, res) => {
  try {
    const { data, file_b64 } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: 'Data must be an array'
      });
    }

    const processedData = processArray(data);
    const fileInfo = validateFile(file_b64);

    const response = {
      is_success: true,
      user_id: "AkshaySethi_24112003",
      email: "akshatsethi210486@acropolis.in",
      roll_number: "0827CS211016",
      ...processedData,
      ...fileInfo
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});