"use strict";
const { Error } = require("mongoose");
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const Personnel = require("../models/personnel.model");
const Token = require("../models/token.model");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  login: async (req, res) => {
    const { username, email, password } = req.body;
    if ((username || email) && password) {
      // girilen veriler db ile eşleşiyor mu
      const user = await Personnel.findOne({ $or: [{ username }, { email }] });

      // böyle bir kullanıcı var ise password kontrol et
      if (user && user.password == passwordEncrypt(password)) {
        if (user.isActive) {
          // artık token oluştur
          // önce kullanıcı için token oluşturulmuş mu kontrol et
          let tokenData = await Token.findOne({ userId: user._id });
          // yoksa oluştur
          if (!tokenData) {
            let tokenKey = passwordEncrypt(user._id + Date.now()); // unique bir değer oluştur
            tokenData = await Token.create({
              userId: user._id,
              token: tokenKey,
            });
          }
          res.status(200).send({
            error: false,
            token: tokenData.token,
            user,
          });
        } else {
          res.errorStatusCode = 401;
          throw new Error("You are not active");
        }
      } else {
        res.errorStatusCode = 401;
        throw new Error("Username/email or password wrong ");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please enter username or email and password");
    }
  },

  logout: async (req, res) => {
        
    const auth=req.headers?.authorization || null
    const tokenKey=auth ? auth.split(' ')[1]:null
    // console.log(tokenKey);
    const tokenData=await Token.deleteOne({token:tokenKey})
    // res.status(tokenData.deletedCount ? 204 : 404).send({

    if (tokenData.deletedCount >=1 )
        res.send({

        error: false,
        message:'Logout OK',
        data:tokenData
    })
    else{
        res.send({

            error: false,
            message:'Please Login',
            data:tokenData
        }) 
    }

},
};
