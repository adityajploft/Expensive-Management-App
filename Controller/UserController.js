const userModel = require("../Models/userModel");
const registerSchema = require("../Utill/validationSchema");

// login callback

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // const result = await registerSchema.validateAsync(req.body);

    const user = await userModel.findOne({ email });
    console.log("user", user)
    if (!user) {
      return res.status(404).send("User is not found");
    }
    else {
      res.status(200).json({
        success: true,
        user,
      });
    }

  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      error,
    });
  }
};
// register callback
const registerController = async (req, res) => {
  try {
    const newUser = new userModel(req.body);

    await newUser.save();

    res.send(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      error,
    });
  }
};

module.exports = { loginController, registerController };
