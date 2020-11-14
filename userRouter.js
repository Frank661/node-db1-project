const express = require('express');

const db = require('./data/dbConfig');

const router = express.Router();

db.on('query', (data) => {
    console.log(data.sql);
});

// router.get('/', (req, res) => {
//     res.status(200).json({api: "is up"})
// });

router.get('/', async (req, res) => {
    try{
        const sql = await (await db('accounts')).toString();
        console.log('sql:', sql);

        const accounts = await db.select('*').from('accounts');
        res.status(200).json(accounts);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'error with DB'})
    }
});

router.get('/:id', async (req, res) =>{
    const {id} = req.params;

    try{
        const [account] = await db('accounts').where({id});

        if(account){
            res.status(200).json(account);
        } else {
            res.status(404).json({message: 'id not found'})
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "error with DB"})
    }
});

router.post('/', async (req, res) => {
    const aData = req.body;

    try{
        const account = await db('accounts').insert(aData);
        res.status(201).json(account);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'error with DB'})
    }
})

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    try{
        const count = await db('accounts').update(changes).where({id});
        if(count) {
            res.status(201).json({ message: 'update success'})
        } else {
            res.status(404).json({message: "id not found"})
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'error with DB'})
    }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    try{
        const count = await db('accounts').del().where({id});
        if(count > 0) {
            res.json({Message: 'Account has been deleted'})
        } else {
            res.status(404).json({message: 'id not found'})
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'error with DB'})
    }

});





module.exports = router;