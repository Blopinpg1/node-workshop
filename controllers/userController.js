// const root = (req, res) => {
//   res.json({
//     name: "homepage",
//     route: "root",
//   });
// };

function root(req, res) {
  res.json({
    name: "homepage",
    route: "root",
  });
}

function about(req, res) {
  res.json({
    address: "about page address",
    age: "1032",
    name: "lkdsffdsj",
  });
}

const deleteUser = async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndDelete(id);
  console.log(req.params.id);

  res.json({
    message: "User deleted successfully",
  });
};

const fetchUserById = async (req, res) => {
  const id = req.params.id;
  const data = await User.findById(id).select(["-password", "-__v"]);
  res.json({
    data: data,
  });
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  // const name = req.body.name;
  const { name, email, password } = req.body;
  await User.findByIdAndUpdate(id, {
    name,
    email,
    password: bcrypt.hashSync(password, 10),
  });
  res.json({
    message: "user updated successfully",
  });
};

const fetchAllUsers = async (req, res) => {
  //response ma User table ma vako user data sent grnu paryo
  const data = await User.find();
  res.json({
    userData: data,
  });
};

module.exports = {
  root,
  about,
  deleteUser,
  fetchUserById,
  fetchAllUsers,
  updateUser,
};
