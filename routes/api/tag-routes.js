const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const routeData = await Tag.findAll({
      include: [{ model: Product, through: { attributes: [] } }]
    });
    res.json(routeData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const singleTag = await Tag.findByPk(req.params.id,
      {
        include: [{ model: Product, through: { attributes: [] } }]
      });
    if (!singleTag) {
      res.status(404).json({
        message: `No tag found with this id!`
      });
      return;
    }
    res.json(singleTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const createTag = await Tag.create({
      tag_name: req.body.tag_name
    })
    res.json(createTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update({
      tag_name: req.body.tag_name
    },
      {
        where: {
          id: req.params.id
        }
      })
    if (!updateTag) {
      res.status(404).json({
        message: `No tag found with this id!`
      });
      return;
    }
    res.json(updateTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: { id: req.params.id }
    })
    if (!deleteTag) {
      res.status(404).json({
        message: `No tag found with this id!`
      });
      return;
    }
    res.json(deleteTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
