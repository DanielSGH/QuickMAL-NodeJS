const app = require('express')();
const cors = require('cors');
// const rateLimit = require('express-rate-limit');
require('dotenv').config();

// const limiter = rateLimit({
// 	windowMs: 60 * 1000, // 1 minute
// 	max: 60, // Limit each IP to 60 requests per `window`
//   message: 'Too many requests!!',
// 	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
// 	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// })

// app.use(limiter)
app.use(cors());
app.use('/mal', require('./routes'))

const PORT = process.env.PORT || 5569;
app.listen(PORT, () => 
  console.log(`Proxy listening on port ${PORT}`)
)











// const app = require('express')();
// const axios = require('axios').default;
// require('dotenv').config();

// const baseurl = process.env.API_BASE_URL;
// const client_id = process.env.API_CLIENT_ID;

// app.get('/mal', async (req, res) => {
//   try {
//     const response = await axios.get(`${baseurl}/anime/${req.query.id}`, {
//       headers: {
//         'X-MAL-CLIENT-ID': client_id,
//       }
//     })
//     res.send(response.data);
//   } catch (error) {
//     console.log(error);
//   }
// })


// const port = process.env.PORT || 5000
// app.listen(port, () =>
//   console.log(`Proxy listening on ${port}`)
// )