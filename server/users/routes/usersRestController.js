const express = require("express");
const auth = require("../../auth/authService");
const { handleError } = require("../../utils/handleErrors");
const { generateUserPassword } = require("../helpers/bcrypt");
const normalizeUser = require("../helpers/normalizeUser");
const {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  changeUserBusinessStatus,
  deleteUser,
} = require("../models/usersAccessDataService");

const {
  validateRegistration,
  validateLogin,
  validateUserUpdate,
} = require("../validations/userValidationService");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let user = req.body;
    const { error } = validateRegistration(user);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    user = normalizeUser(user);
    user.password = generateUserPassword(user.password);

    user = await registerUser(user);
    return res.status(201).send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    let user = req.body;
    const { error } = validateLogin(user);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    const token = await loginUser(req.body);
    return res.send(token);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const user = req.user;
    if (!user.isAdmin)
      return handleError(
        res,
        403,
        "Authorization Error: You must be an admin user to see all users in the database"
      );

    const users = await getUsers();
    return res.send(users);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { _id, isAdmin } = req.user;

    if (_id !== id && !isAdmin)
      return handleError(
        res,
        403,
        "Authorization Error: You must be an admin type user or the registered user to see this user details"
      );

    const user = await getUser(id);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = req.user;

    if (userId !== user._id)
      return handleError(
        res,
        403,
        "Authorization Error: You must be the registered user to update its  details"
      );

    const { error } = validateUserUpdate(req.body);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    const normalizedUser = normalizeUser(req.body);
    const newUser = await updateUser(userId, normalizedUser);
    // normalizedUser.password = generateUserPassword(normalizedUser.password);
    return res.send(newUser);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    if (id !== user._id && !user.isAdmin)
      return handleError(
        res,
        403,
        "Authorization Error: You must bean an admin type user or the registered user to update its business status"
      );

    const changedStatusUser = await changeUserBusinessStatus(id);
    return res.send(changedStatusUser);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    if (id !== user._id && !user.isAdmin)
      return handleError(
        res,
        403,
        "Authorization Error: You must be an admin type user or the registered user to delete this user"
      );

    const userDeleted = await deleteUser(id);
    return res.send(userDeleted);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

module.exports = router;
