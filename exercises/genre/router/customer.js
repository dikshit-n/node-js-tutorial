const express = require('express');
const mongoose = require('../mongoose');
const { Customer } = require('../model');
const { customer: customerValidation } = require('../validation');
const { processValidationError } = require('../utils');
const customer = express.Router();

customer.get('/', async(req, res) => {
    const customers = await Customer.find();
    return res.send(customers);
});

customer.post('/', async(req, res) => {
    const { error } = await customerValidation.validateAddCustomer(req.body);
    if(error) return res.status(400).send(processValidationError(error));
    const customer = await new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    });
    const result = await customer.save();
    return res.send(result);
});

customer.patch('/:id', async(req, res) => {
    const { error } = await customerValidation.validateEditCustomer(req.body);
    console.log(error)
    if(error) return res.status(400).send(processValidationError(error));
    const customer = await Customer.findByIdAndUpdate(new mongoose.Types.ObjectId(req.params.id), {
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    }, { new: true });
    if(!customer) return res.status(404).send('Customer Not found');
    return res.send(customer);
});

customer.get('/:id', async(req, res) => {
    const customer = await Customer.findById(new mongoose.Types.ObjectId(req.params.id));
    if(!customer) return res.status(404).send('Customer Not found');
    return res.send(customer);
});

customer.delete('/:id', async(req, res) => {
    const customer = await Customer.findByIdAndDelete(new mongoose.Types.ObjectId(req.params.id));
    if(!customer) return res.status(404).send('Customer Not found');
    return res.send(customer);
});

module.exports = customer;
