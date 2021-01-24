const express = require('express');
const router = express.Router();
const Teams = require('../../models/teams');
const User = require('../../models/user');
const MSGS = require('../../messages');
const auth = require('../../middleware/auth');
const config = require('config');


//@route  POST /team
//@desc   CREATE team
//@acess  Public
router.post('/', auth, async (req, res, next) => {
    try {
        req.body.user = req.user.id
        let team = new Teams(req.body)
        await team.save()
        
        if (team.id) {

            let user = await User.findById(req.user.id)
            user.teams.push(team.id)
            await user.save()
           
            res.status(201).json(team);
        }

    } catch (err) {
        console.error(err.message)
        res.status(500).send({ 'error': MSGS.GENERIC_ERROR })
    }
})

//@route   GET/team
//@desc    LIST team
//@access  Public
router.get('/', async (req, res, next) => {
    try {
        let team = await Teams.find({}).populate('user pokemon1 pokemon2 pokemon3 pokemon4 pokemon5 pokemon6')
       
        res.json(team)
    } catch (err) {
        console.error(err.message)
        res.status(500).send({ "error": MSGS.GENERIC_ERROR })
    }

})

//@route   GET/team/:id
//@desc    DETAIL product
//@access  Public
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        let team = await Teams.findOne({ _id: id }).populate('user pokemon1 pokemon2 pokemon3 pokemon4 pokemon5 pokemon6')
                   
        if (team) {
            res.json(team)
        } else {
            res.status(404).send({ "error": MSGS.TEAM_404 })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send({ "error": MSGS.GENERIC_ERROR })
    }

})

//@route   DELETE/team/:id
//@desc    DELETE team
//@access  Public
router.delete('/:id', auth, async (req, res, next) => {
    try {
        const id = req.params.id
        const team = await Teams.findOneAndDelete({ _id: id })
        
        if (team) {
            let user = await User.findById(req.user.id)
            user.teams.pull(id)
            await user.save()
            res.json(team)
        } else {
            res.status(404).send({ "error": MSGS.TEAM_404 })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send({ "error": MSGS.GENERIC_ERROR })
    }

})

//@route   PATCH/team/:id
//@desc    PARTIAL UPDATE tean
//@access  Private
router.patch('/:id', auth, async (req, res, next) => {
    try {        
        const id = req.params.id
        const update = { $set: req.body }
        const team = await Teams.findByIdAndUpdate(id, update, { new: true })

        if (team) {           
            res.json(team)
        } else {
            res.status(404).send({ "error": MSGS.TEAM_404 })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send({ "error": MSGS.GENERIC_ERROR })
    }

})


module.exports = router;
