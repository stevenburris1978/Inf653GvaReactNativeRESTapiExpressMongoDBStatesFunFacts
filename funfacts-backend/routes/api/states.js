const express = require('express');
const router = express.Router();
const stateController = require('../../controller/stateController');

router.route('/')
  .get(stateController.GetAllStates); 

router.get('/:stateCode/funfact', stateController.GetRandomFunFact);
router.get('/:stateCode/capital', stateController.GetStateCapital);
router.get('/:stateCode/nickname', stateController.GetStateNickname);
router.get('/:stateCode/population', stateController.GetStatePopulation);
router.get('/:stateCode/admission', stateController.GetStateAdmissionDate);
router.get('/:stateCode', stateController.GetState);
router.post('/:stateCode/funfact', stateController.AddFunFacts);
router.patch('/:stateCode/funfact', stateController.UpdateFunFact);
router.delete('/:stateCode/funfact', stateController.DeleteFunFacts);

module.exports = router;
