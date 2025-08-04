const Brand = require('../models/Brand');

exports.addBrand = async (req, res) => {
  try {
    const { brandName} = req.body;

    const product = await Brand.create({
      brandName
    });

    res.status(201).json({ message: 'Brand added successfully', product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add brand' });
  }
};

exports.getAllBrands = async (req, res) => {
  try {
    const brand = await Brand.findAll();
    res.json(brand);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch brands' });
  }
};

exports.updateBrand = async (req, res) => {
  try {
    const { brandName } = req.body;

    const brand = await Brand.findByPk(req.params.id);
    if (!brand) return res.status(404).json({ error: 'Brand not found' });

    await brand.update({ brandName });

    res.json({ message: 'Brand updated successfully', brand });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update brand' });
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findByPk(req.params.id);
    if (!brand) return res.status(404).json({ error: 'Brand not found' });

    await brand.destroy();
    res.json({ message: 'Brand deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete brand' });
  }
};
