const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');

router.get('/', homeController.get);
router.get('/login', authController.get);
router.post('/login', authController.post);
router.post('/', homeController.post);

const isAdmin = (req, res, next) => {
  if (req.session.isAdmin) {
    return next();
  }
  res.redirect('/login');
}

router.get('/admin', isAdmin, adminController.get);
router.post('/admin/upload', isAdmin, adminController.upload);
router.post('/admin/skills', isAdmin, adminController.skills);

module.exports = router;