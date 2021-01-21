const express = require('express')
const router = express.Router();
const Teams = require('../../models/teams')
const auth = require('../../middleware/auth')


router.post('/:id', auth, async(req, res, next) => {
    try {
        const id = req.params.id
        let teams = await Teams.findOne({_id: id})
        teams.pokemons.push(req.body.id)
        await teams.save()
        if (teams.id){
            res.json(teams.pokemons)
        }
    } catch (err) {
      res.status(500).send({ "error": err.message })
    }
})

router.delete('/:id', auth, async(req, res, next) => {
    try {        
        const id = req.params.id
        let teams = await Teams.findOne({_id: id})
        teams.pokemons.pull(req.body.id)
        await teams.save()
        if (teams.id){
            res.json(teams.pokemons)
        }
    } catch (err) {
      res.status(500).send({ "error": err.message })
    }
})

module.exports = router;




