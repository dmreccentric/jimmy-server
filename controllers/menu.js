const Menu = require("../model/menu");

const getAllItems = async (req, res) => {
  const menu = await Menu.find({});
  res.status(200).json({ menu, nbHits: menu.length });
};

// const createItem = async (req, res) => {
//   const menu = await Menu.create(req.body);
//   res.status(201).json({ menu });
// };
const createItem = async (req, res) => {
  try {
    const item = await Menu.create(req.body);
    res.status(201).json({ item });
  } catch (error) {
    console.error("❌ Create Item Error:", error);
    res.status(500).json({ msg: error.message });
  }
};

const editItem = async (req, res) => {
  const { id: itemID } = req.params;

  const menu = await Menu.findOneAndUpdate({ _id: itemID }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ menu });
};

const deleteItems = async (req, res) => {
  const { id: itemID } = req.params;

  const menu = await Menu.findOneAndDelete({ _id: itemID });
  res.status(200).json({ menu });
};

module.exports = {
  editItem,
  deleteItems,
  createItem,
  getAllItems,
};
