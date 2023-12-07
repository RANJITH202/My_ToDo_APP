const getTasksList = async (req, res) => {
  try {
    res.status(200).send({ message: "Get all tasks", data: [] });
  } catch (error) {
    res.status(400).send({ message: "Exception Occurred.", data: [] , error: error });
  }
}

module.exports = { getTasks }