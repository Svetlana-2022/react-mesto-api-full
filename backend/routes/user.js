const router = require('express').Router();

const { getUser, getUserId, getUserMe } = require('../controllers/user');
const { updateUserMe, updateUserMeAvatar } = require('../controllers/user');
const { celebrateParamsUserMe, celebrateUserMe, celebrateUsers } = require('../validators/users');
const { celebrateUserMeAvatar } = require('../validators/users');

router.get('/users', celebrateUsers, getUser);

router.get('/users/me', getUserMe);

router.patch('/users/me', celebrateUserMe, updateUserMe);

router.patch('/users/me/avatar', celebrateUserMeAvatar, updateUserMeAvatar);

router.get('/users/:id', celebrateParamsUserMe, getUserId);

module.exports = router;
