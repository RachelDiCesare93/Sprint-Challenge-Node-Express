const express = require('express');
const db = require('../data/helpers/actionModel.js')
const router = express.Router();


// actions

router.get('/', (req, res) => {
    db.get().then(actions=> {
        res.status(200).json(actions);
    }).catch(err => {
        console.error('error',err);

        
    })
});

router.get('/:id', (req, res) => {
    db.get(req.params.id)
    .then((actions) => {
        res.status(200).json(actions);
    })
    .catch((err) => {
    console.error(err);
    })
    
  });

  router.post('/', (req, res) => {
    db.insert(req.body)
      .then((actions) => {
        res.status(201).json(actions);
      })
      .catch((err) => {
        console.error(err);
      })
  });

  router.delete('/:id', (req, res) => {
      const { id } = req.params;

      db.remove(id)
      .then(actions => {
        if (actions === 0) {
            res.status(404).json({ message: "The action with the specified ID does not exist"});
        } 

      res.status(200).json({ message: `The action id ${req.params.id} successfully deleted.` });
      })
  });



  router.put('/:id', (req, res) => {
    db.update(req.params.id, req.body)
    .then((actions) => {
      if (actions === 0) {
        res.status(404).json({ message: 'The action with this id does not exist' });
      }
      res.status(200).json({ message: `action id ${req.params.id} successfully edited.` });
    })
})

module.exports = router;