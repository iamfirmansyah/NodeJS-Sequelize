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

router.put('/:id', async(req, res) => {
    const id = req.params.id

    let product = await Product.findByPk(id)

    if (!product) {
        return res.status(401).json({
            message: `Product where id ${id} not found`
        })
    }

    const schema = {
        name: 'string|optional',
        brand: 'string|optional',
        description: 'string|optional',
    }

    const validate = v.validate(req.body, schema)

    if (validate.length) {
        return res
            .status(400)
            .json(validate)
    }

    product = await product.update({
        name: req.body.name,
        brand: req.body.brand,
        description: req.body.description
    })

    res.send(product)
})

module.exports = router