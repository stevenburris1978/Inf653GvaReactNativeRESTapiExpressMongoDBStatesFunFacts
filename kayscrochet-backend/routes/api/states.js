const express = require('express');
const router = express.Router();
const stateController = require('../../controller/stateController');

// Route to get all states data
router.get('/', stateController.getStates);

// Routes to get contiguous and non-contiguous states
router.get('/contiguous', (req, res) => {
  req.query.contig = 'true';
  stateController.getStatesByContiguity(req, res);
});

router.get('/noncontiguous', (req, res) => {
  req.query.contig = 'false';
  stateController.getStatesByContiguity(req, res);
});

// Route to get specific state data
router.route('/:stateCode')
  .get(stateController.getStateData)
  .post(stateController.addFunFact);

module.exports = router;
