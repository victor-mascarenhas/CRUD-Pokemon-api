const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Types = require('../../models/types');
const Pokemons = require('../../models/pokemons');
const MSGS = require('../../messages')
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin')


//@route  POST /type
//@desc   CREATE type
//@acess  Public
router.post('/', auth, admin, async (req, res, next) => {
    try {        
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        } else {
            let type = new Types(req.body)

            await type.save()
            if (type.id) {
                res.status(201).json(type);
            }
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send({ 'error': MSGS.GENERIC_ERROR })
    }
})

//@route   GET/type
//@desc    LIST type
//@access  Public
router.get('/', async (req, res, next) => {
    try {
        const type = await Types.find({})
        res.json(type)
    } catch (err) {
        console.error(err.message)
        res.status(500).send({ "error": MSGS.GENERIC_ERROR })
    }

})

//@route   GET/type/:id
//@desc    DETAIL type
//@access  Public
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const type = await Types.findOne({ _id: id })
        if (type) {
            res.json(type)
        } else {
            res.status(404).send({ "error": MSGS.TYPE_404 })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send({ "error": MSGS.GENERIC_ERROR })
    }

})

//@route   DELETE/type/:id
//@desc    DELETE type
//@access  Public
router.delete('/:id', auth, admin, async (req, res, next) => {
    try {
        const id = req.params.id
        let type = await Types.findOne({ _id: id })
        if (type) {
            const pokemonByType = await Pokemons.find({ type1: type._id, type2: type._id })
            if (pokemonByType.lentgh > 0) {
                res.status(400).send({ "error": MSGS.CANTDELETE })
            } else {
                await Types.findOneAndDelete({ _id: id })
                res.json(type)
            }
        } else {
            res.status(404).send({ "error": MSGS.TYPE_404 })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send({ "error": MSGS.GENERIC_ERROR })
    }

})

//@route   PATCH/type/:id
//@desc    PARTIAL UPDATE type
//@access  Public
router.patch('/:id', auth, admin, async (req, res, next) => {
    try {
        const id = req.params.id
        const update = { $set: req.body }
        const type = await Types.findByIdAndUpdate(id, update, { new: true })
        if (type) {
            res.json(type)
        } else {
            res.status(404).send({ "error": MSGS.TYPE_404 })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send({ "error": MSGS.GENERIC_ERROR })
    }

})


module.exports = router;