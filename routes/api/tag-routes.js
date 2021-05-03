const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { restore } = require('../../models/Product');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll();
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', (req, res) => {
  try {
    const tagData = await Tag.findByPk.apply(req.params.id, {
      include: [{model: Tags}]
    })   
    
    if(!tagData) {
      res.status(404).json({message: 'No tag found with this ID'});
      return;
    }

    res.status(200).json(tagData);
  } catch {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  try {
    const tagData = await Tag.findByPk.apply(req.params.id, {
      include: [{model: Tags}]
    })   
    
    if(!tagData) {
      res.status(404).json({message: 'No tag found with this ID'});
      return;
    }

    tagData.id = req.body;
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this ID' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
