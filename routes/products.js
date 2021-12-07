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

router.get('/', async(req, res) => {
    const product = await Product.findAll();
    return res.json(product)
})

router.get('/:id', async(req, res) => {
    const id = req.params.id
    const product = await Product.findByPk(id)

    return res.json(product || {})

})

router.delete('/:id', async(req, res) => {
    const id = req.params.id

    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(401).json({
            message: "product not found"
        })
    }

    await product.destroy()

    res.json({
        message: "product is deleted",
        data: product
    })

})

module.exports = router