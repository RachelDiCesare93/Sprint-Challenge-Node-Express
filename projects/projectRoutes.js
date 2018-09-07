const express = require('express');
const db = require('../data/helpers/projectModel.js')
const router = express.Router();


// projects 

router.get('/', (req, res) => {
    db.get().then(projects=> {
        res.status(200).json(projects);
    }).catch(err => {
        console.error('error',err);

        
    })
});

router.get('/:id', (req, res) => {
    db.get(req.params.id)
    .then((projects) => {
        res.status(200).json(projects);
    })
    .catch((err) => {
    console.error(err);
    })
    
  });

  router.post('/', (req, res) => {
    db.insert(req.body)
      .then((projects) => {
        res.status(201).json(projects);
      })
      .catch((err) => {
        console.error(err);
      })
  });

  router.delete('/:id', (req , res) => {
      db.remove(req.params.id)
      .then((projects) => {
          if (projects === 0) {
            res.status(404).json({message: 'The project with this id does not exist'});
          }
          res.status(200).json({ message: `project iD ${req.params.id} successfully deleted.` });
      })
  })

  router.put('/:id', (req, res) => {
    db.update(req.params.id, req.body)
    .then((projects) => {
      if (projects === 0) {
        res.status(404).json({ message: 'The project with this id does not exist' });
      }
      res.status(200).json({ message: `project id ${req.params.id} successfully edited.` });
    })
})

router.get('/actions/:id', (req, res) => {
    db.getProjectActions(req.params.id)
    .then((projects) => {
        if ( projects.length === 0) {
        res.status(404).json({ message: 'This project has no actions or does not exists'});
        }
    })
})

module.exports = router;