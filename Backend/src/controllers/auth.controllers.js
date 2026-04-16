const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenBlackListModel = require("../models/blacklist.model");

/**
 *
 * @name {registerUserController}
 * @description {register users expecting username,email,password}
 * @access public
 */

const registerUserController = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "insert all input fields",
    });
  }

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "user already exists with same username or email",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 24 * 60 * 60 * 1000  // 1 day
});

  res.status(201).json({
    message: "user registered successfully",
    user: {
      user: user.username,
      email: user.email,
    },
  });
};

/**
 *@name {loginUserController}
 *@description {login the user account if already exists}
 *@access public
 */

const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "invalid password or email",
    });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

 res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 24 * 60 * 60 * 1000  // 1 day
});
  res.status(200).json({
    message: "user loggedIn successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

/**
 * 
 * @name {logoutUserController} 
 * @description  {logout user by addding token to blacklist and making it clear} 
 * @access public
 */

const logoutUserController = async (req, res) => {
  const token = req.cookies.token;

  if (token) {
    await tokenBlackListModel.create({ token });
  }

  res.clearCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "none",
});

  res.status(200).json({
    message: "user logged out successfully",
  });
};

/**
 * @name {getMeController}
 * @description {get the current logged in user details}
 * @access private
 */

const getMeController = async(req,res)=>{

    const user = await userModel.findById(req.user.id)
    console.log(user.username)

    res.status(200).json({
        message:"user details fetched successfully",
        user:{

            id:user._id,
            username:user.username,
            email:user.email,

        }
    })
}



module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController,
};
