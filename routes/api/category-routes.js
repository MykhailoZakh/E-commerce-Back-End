const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const oneCategoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!oneCategoryData) {
      res.status(404).json({
        message: `No category found with this id!`
      });
      return;
    }
    res.json(oneCategoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createCategory = await Category.create({
      category_name: req.body.category_name
    });
    res.json(createCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update({
      category_name: body.req.category_name
    },
      {
        where: {
          id: req.params.id
        }
      });

    if (!updateCategory) {
      res.status(404).json({
        message: `No category found with this id!`
      });
      return;
    }

    res.json(updateCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: req.params.id
    });
    if (!deleteCategory) {
      res.status(404).json({
        message: `No category found with this id!`
      });
      return;
    }
    res.json(deleteCategory)
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
