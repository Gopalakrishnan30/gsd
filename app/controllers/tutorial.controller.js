const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  let tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };
  try {
    const data = await Tutorial.create(tutorial);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Tutorial."
    });
  }
};

exports.findAll = async (req, res) => {
  const title = req.query.title;
  let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  try {
    const data = await Tutorial.findAll({ where: condition });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials."
    });
  }
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Tutorial.findByPk(id);
    res.send(data);
  }
  catch (err) {
    res.status(500).send({
      message: "Error retrieving Tutorial with id=" + id
    });
  }
};


exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Tutorial.update(req.body, { where: { id: id } });
    if (data == 1) {
      res.send({
        message: "Tutorial was updated successfully."
      });

    }
    else {
      res.send({
        message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Tutorial with id=" + id
    });
  }
};

// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Tutorial.destroy({ where: { id: id } });
    if (data == 1) {
      res.send({
        message: "Tutorial was deleted successfully!"
      });
    }
    else {
      res.send({
        message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
      });
    }

  } catch (err) {
    res.status(500).send({
      message: "Could not delete Tutorial with id=" + id
    });

  }
};

// Delete all Tutorials from the database.
exports.deleteAll = async (req, res) => {
  try {
    const data = await Tutorial.destroy({ where: {}, truncate: false })
    res.send({ message: `${data} Tutorials were deleted successfully!` });

  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all tutorials."
    });
  }
};

exports.updateData = async (req, res) => {
  let tutorial = {
    title: req.body.title,
  };
  const id = req.params.id;

  try {
    const data = await Tutorial.update(req.body, { where: { id: id } });
    if (data == 1) {
      res.send({
        message: "Tutorial was updated successfully."
      });

    }
    else {
      res.send({
        message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Tutorial with id=" + id
    });
  }
};
