const express = require('express');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config();

const CLIENT_ID = process.env.API_CLIENT_ID;

router
  .get('/oauth', async (req, res) => {
    try {
      const args = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          'client_id': CLIENT_ID,
          'code': req.query.authcode,
          'code_verifier': req.query.verifier,
          'grant_type': 'authorization_code',
        })
      }

      const response = await fetch('https://myanimelist.net/v1/oauth2/token', args);
      const access = await response.json();
      if (!response.ok) return res.send({ success: false, data: access })

      const authresponse = {
        access_token: access.access_token,
        expires_in: access.expires_in * 1000 + Date.now(),
        refresh_token: access.refresh_token,
        token_type: access.token_type
      }

      res.send({ success: true, data: authresponse });
    } catch (error) {
      res.send({ success: false, data: error });
    }
  })

router
  .all('/oauthwebflow', (req, res) => {
    res.redirect(`https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&code_challenge=${req.query.challenge}`)
  })

// router
//   .get('/refresh', (req, res) => {
//     const params = {
//       'client_id': CLIENT_ID,
//       'grant_type': 'refresh_token',
//       'refresh_token': req.query.token,
//     }

//     const args = {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       },
//       body: new URLSearchParams(params)
//     };

//     try {
//       const response = await fetch('https://myanimelist.net/v1/oauth2/token', args);
//       const access = await response.json();

//       const authresponse = {
//         access_token: access.access_token,
//         expires_in: access.expires_in + Date.now(),
//         refresh_token: access.refresh_token,
//         token_type: access.token_type
//       }

//       res.send({ success: true, data: authresponse });
//     } catch (error) {
//       res.send({ success: false, data: error });
//     }
//   })

/*
router
  .get('/cors', async (req, res) => {
    const url = req.query.href;
    const token = req.query.token;

    const args = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }

    try {
      const response = await fetch(url, args)
      const data = await response.json();
      res.send(data || null);
    } catch (error) {
      console.log(error);
      res.send(null);
    }
  })
  .put('/cors', async (req, res) => {
    const token = req.query.token;
    const url = req.query.href;
    delete req.query.token;
    delete req.query.href;
    
    const args = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      },
      body: new URLSearchParams({ ...req.query }),
    }

    try {
      const response = await fetch(url, args);
      const data = await response.json();
      res.send(data);
    } catch (error) {
      console.log(error);
    }
  })
*/
module.exports = router;