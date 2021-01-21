const express = require('express');
const router = express.Router();
const Pokemons = require('../../models/pokemons');
const MSGS = require('../../messages');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin')


//@route  POST /pokemon
//@desc   CREATE pokemon
//@acess  Private
router.post('/', auth, admin, async (req, res, next) => {
    try {
        let pokemon = new Pokemons(req.body)
        await pokemon.save()
        
        if (pokemon.id) {
            res.status(201).json(pokemon);
        }

    } catch (err) {
        console.error(err.message)
        res.status(500).send({ 'error': MSGS.GENERIC_ERROR })
    }
})

//@route   GET/pokemon
//@desc    LIST pokemon
//@access  Public
router.get('/', async (req, res, next) => {
    try {
        const pokemon = await Pokemons.find().populate('type1 type2')        
        res.json(pokemon)
    } catch (err) {
        console.error(err.message)
        res.status(500).send({ "error": MSGS.GENERIC_ERROR })
    }

})

//@route   GET/pokemon/:id
//@desc    DETAIL pokemon
//@access  Public
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const pokemon = await Pokemons.findOne({ _id: id }).populate('type1 type2')      
    
        if (pokemon) {
            res.json(pokemon)
        } else {
            res.status(404).send({ "error": MSGS.POKEMON_404 })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send({ "error": MSGS.GENERIC_ERROR })
    }

})

//@route   DELETE/pokemon/:id
//@desc    DELETE pokemon
//@access  Public
router.delete('/:id', auth, admin, async (req, res, next) => {
    try {
        const id = req.params.id
        const pokemon = await Pokemons.findOneAndDelete({ _id: id })
        
        if (pokemon) {
            res.json(pokemon)
        } else {
            res.status(404).send({ "error": MSGS.POKEMON_404 })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send({ "error": MSGS.GENERIC_ERROR })
    }

})

//@route   PATCH/pokemon/:id
//@desc    PARTIAL UPDATE pokemon
//@access  Private
router.patch('/:id', auth, admin, async (req, res, next) => {
    try {
        const id = req.params.id
        const update = { $set: req.body }
        const pokemon = await Pokemons.findByIdAndUpdate(id, update, { new: true })

        if (pokemon) {
            res.json(pokemon)
        } else {
            res.status(404).send({ "error": MSGS.POKEMON_404 })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send({ "error": MSGS.GENERIC_ERROR })
    }

})


module.exports = router;