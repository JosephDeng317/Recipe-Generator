// // server.js
// import express from 'express';
// import axios from 'axios';
// import bodyParser from 'body-parser';
// import cors from 'cors';

// const app = express();
// const port = 3000; // Or any port you prefer

// app.use(bodyParser.json());
// app.use(cors());

// // Endpoint to handle requests from the frontend
// app.post('/api/generate-recipe', async (req, res) => {
//   const prompt = req.body.prompt;
//   try {
//     const response = await axios.post('https://api.openai.com/v1/chat/completions', {
//       model: 'gpt-3.5-turbo',
//       messages: [{ role: 'user', content: prompt }]
//     }, {
//       headers: {
//         'Authorization': `org-Xo4GFbGVbz8FiZ8OkZsoORqc`,
//         'Content-Type': 'application/json'
//       }
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error('Error calling OpenAI API:', error);
//     res.status(500).send('Error calling OpenAI API');
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });