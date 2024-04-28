const State = require('../model/State.js');
const statesData = require('../model/states.json');

const GetAllStates = async (req, res) => {
  try {
    const { contig } = req.query;
    const funfactsData = await State.find();
    let filteredStates = statesData;

    if (contig === 'true') {
      filteredStates = statesData.filter(state => state.code !== 'AK' && state.code !== 'HI');
    } else if (contig === 'false') {
      filteredStates = statesData.filter(state => state.code === 'AK' || state.code === 'HI');
    }

    const enrichedStates = filteredStates.map(state => {
      const mongoFunfacts = funfactsData.find(f => f.stateCode.toUpperCase() === state.code.toUpperCase())?.funfacts || [];
      const stateFunfacts = Array.isArray(state.funfacts) ? state.funfacts : [];
      return { ...state, funfacts: [...stateFunfacts, ...mongoFunfacts] };
    });

    res.json(enrichedStates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching state data' });
  }
};

const GetRandomFunFact = async (req, res) => {
  const { stateCode } = req.params;
  const state = statesData.find(s => s.code.toUpperCase() === stateCode.toUpperCase());
  if (!state) {
    return res.status(404).json({ message: 'State not found.' });
  }

  const mongoState = await State.findOne({ stateCode: stateCode.toUpperCase() });
  const funfacts = (mongoState && Array.isArray(mongoState.funfacts) ? mongoState.funfacts : [])
                    .concat(Array.isArray(state.funfacts) ? state.funfacts : []);

  if (funfacts.length === 0) {
    return res.status(404).json({ message: 'No fun facts found for this state.' });
  }

  const randomIndex = Math.floor(Math.random() * funfacts.length);
  res.json({ funfact: funfacts[randomIndex] });
};

const GetStateDetail = (req, res, detail) => {
  const { stateCode } = req.params;
  const state = statesData.find(s => s.code.toUpperCase() === stateCode.toUpperCase());
  if (!state) {
    return res.status(404).json({ message: 'State not found.' });
  }
  res.json({ [detail]: state[detail] });
};

const GetState = async (req, res) => {
  const { stateCode } = req.params;
  const state = statesData.find(s => s.code.toUpperCase() === stateCode.toUpperCase());
  if (!state) {
    return res.status(404).json({ message: 'State not found.' });
  }

  const mongoState = await State.findOne({ stateCode: stateCode.toUpperCase() });

  const stateFunfacts = Array.isArray(state.funfacts) ? state.funfacts : [];
  const mongoFunfacts = mongoState && Array.isArray(mongoState.funfacts) ? mongoState.funfacts : [];

  const response = { ...state, funfacts: [...stateFunfacts, ...mongoFunfacts] };
  res.json(response);
};


const GetStateCapital = (req, res) => {
  GetStateDetail(req, res, 'capital_city');
};

const GetStateNickname = (req, res) => {
  GetStateDetail(req, res, 'nickname');
};

const GetStatePopulation = (req, res) => {
  GetStateDetail(req, res, 'population');
};

const GetStateAdmissionDate = (req, res) => {
  GetStateDetail(req, res, 'admission_date');
};

const UpdateFunFact = async (req, res) => {
  const { stateCode } = req.params;
  const { index, funfact } = req.body;

  if (!index || !funfact) {
    return res.status(400).json({ message: 'Index and fun fact are required.' });
  }

  const zeroBasedIndex = parseInt(index) - 1;
  
  try {
    const state = await State.findOne({ stateCode: stateCode.toUpperCase() });
    if (!state) {
      
      const newState = new State({
        stateCode: stateCode.toUpperCase(),
        funfacts: [funfact] 
      });
      await newState.save();
      return res.status(201).json(newState);
    }

    // Update or add the fun fact at the given index
    if (zeroBasedIndex >= 0 && zeroBasedIndex < state.funfacts.length) {
      state.funfacts[zeroBasedIndex] = funfact;
    } else {
      state.funfacts.push(funfact); 
    }

    await state.save();
    res.json(state);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update fun facts.' });
  }
};

const AddFunFacts = async (req, res) => {
  const { stateCode } = req.params;
  const { funfacts } = req.body;

  if (!funfacts || !Array.isArray(funfacts) || funfacts.length === 0) {
    return res.status(400).json({ message: 'Funfacts array is required and should not be empty.' });
  }

  try {
    const state = await State.findOne({ stateCode: stateCode.toUpperCase() }) || new State({ stateCode: stateCode.toUpperCase(), funfacts: [] });
    state.funfacts.push(...funfacts);
    await state.save();
    res.status(201).json(state);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update fun facts.' });
  }
};

const DeleteFunFacts = async (req, res) => {
  const { stateCode } = req.params;
  const { index } = req.body;

  if (!index) {
    return res.status(400).json({ message: 'Index is required.' });
  }

  const zeroBasedIndex = parseInt(index) - 1;
  if (zeroBasedIndex < 0) {
    return res.status(400).json({ message: 'Index must be greater than zero.' });
  }

  try {
    const state = await State.findOne({ stateCode: stateCode.toUpperCase() });
    if (!state || zeroBasedIndex >= state.funfacts.length) {
      return res.status(404).json({ message: 'Fun fact not found or state does not exist.' });
    }

    state.funfacts.splice(zeroBasedIndex, 1);
    await state.save();
    res.json(state);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete fun fact.' });
  }
};

module.exports = {
  GetAllStates,
  GetRandomFunFact,
  GetStateCapital,
  GetStateNickname,
  GetStatePopulation,
  GetStateAdmissionDate,
  GetState,
  UpdateFunFact,
  AddFunFacts,
  DeleteFunFacts
};
