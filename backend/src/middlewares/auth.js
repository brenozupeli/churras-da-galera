const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('../database/models/User');
const User = mongoose.model('user');

const opts = { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: process.env.jwtKey };

module.exports = function (passport) {
  passport.use(
    new localStrategy(
      { usernameField: 'email', passwordField: 'password' },
      async (email, password, done) => {
        let user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: 'User not found.' });
        }

        bcrypt.compare(password, user.password, (err, match) => {
          if (match) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Invalid credentials.' });
          }
        });
      }
    )
  );

  passport.use(
    new JwtStrategy(opts, function (jwtPayload, done) {
      User.findOne({ email: jwtPayload.email }, function (err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
