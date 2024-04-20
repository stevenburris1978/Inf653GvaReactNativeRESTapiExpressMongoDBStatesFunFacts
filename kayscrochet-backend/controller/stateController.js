const State = require("../models/state");
const statesData = require("../models/states.json");

// Helper function to merge funfacts from MongoDB with states data
const mergeFunFacts = async (states) => {
  const statesWithFunfacts = await State.find();
  const stateMap = new Map(statesWithFunfacts.map(s => [s.stateCode, s.funfacts]));
  return states.map(state => ({
    ...state,
    funfacts: stateMap.get(state.code) || []
  }));
};

// GET all states
exports.getStates = async (req, res) => {
  try {
    const mergedStates = await mergeFunFacts(statesData);
    res.json(mergedStates);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error while retrieving states.");
  }
};

// GET states by contiguity
exports.getStatesByContiguity = async (req, res) => {
  const { contig } = req.query;
  try {
    let filteredStates = statesData.filter(state => 
      contig === 'true' ? state.code !== 'AK' && state.code !== 'HI' : state.code === 'AK' || state.code === 'HI'
    );
    const mergedStates = await mergeFunFacts(filteredStates);
    res.json(mergedStates);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error while filtering states.");
  }
};

// GET specific state data
exports.getStateData = async (req, res) => {
  const { stateCode } = req.params;
  try {
    const stateData = statesData.find(state => state.code === stateCode.toUpperCase());
    if (!stateData) return res.status(404).json({ message: "Invalid state abbreviation parameter" });
    const funfacts = (await State.findOne({ stateCode: stateCode.toUpperCase() }))?.funfacts || [];
    res.json({ ...stateData, funfacts });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error.");
  }
};

// POST fun facts
exports.addFunFact = async (req, res) => {
  const { stateCode } = req.params;
  const { funfacts } = req.body;

  if (!funfacts || !funfacts.length) {
    return res.status(400).json({ message: "Funfacts array is required." });
  }

  try {
    const state = await State.findOneAndUpdate(
      { stateCode },
      { $push: { funfacts: { $each: funfacts } } },
      { new: true, upsert: true }
    );
    res.json(state);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to add fun facts.");
  }
};

// Other endpoints (PATCH, DELETE) would be implemented in a similar pattern.

module.exports = exports;
