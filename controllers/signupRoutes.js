const router = require('express').Router();
const session = require('express-session');
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(dbUser => {
        req.session.save(() => {
        req.session.user_id = dbUser.id;
        req.session.username = dbUser.username;
        req.session.loggedIn = true;
        res.json(dbUser);
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// router.get('/', (req, res) => {
//   res.render('login')
// });

router.post('/', async (req, res) => {
    try {
      const userData = await User.findOne({ 
              where: { username: req.body.username } 
          });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  // router.get('/', (req, res) => {
  //   if (req.session.logged_in) {
  //     req.session.destroy(() => {
  //       res.redirect('/login')
  //     });
  //   } else {
  //     res.redirect('/login')
  //   }
  // });

module.exports = router;