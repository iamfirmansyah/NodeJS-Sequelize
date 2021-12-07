var express = require('express');
const Validator = require('fastest-validator');
var router = express.Router();

const { Product } = require('../models');

const v = new Validator

router.post('/', async(req, res) => {
    const schema = {
        name: 'string',
        brand: 'string',
        description: 'string|optional',
    }

    const validate = v.validate(req.body, schema)

    if (validate.length) {
        return res
            .status(400)
            .json(validate)
    }

    const product = await Product.create({
        name: req.body.name,
        brand: req.body.brand,
        description: req.body.description
    })

    res.json(product)


})

module.exports = router