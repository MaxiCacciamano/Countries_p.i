const { Router } = require('express');
const axios = require('axios');
const { conn } = require('../db')
const { Country, Activity } = conn.models;
const urls = require('../urls')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
    try {
        const {data} = await axios.get(urls.getAllCountries)
        const apiInfo = await data.map((e)=>{
            return {
           id: e.cca3,
           name: e.name.common,
           img: e.flags[0],
           continents: e.continents[0],
           capital: e.capital + e.flags[0] , 
           subregion: e.subregion,  
           area: e.area,
           population: e.population,
            }
        }) 
        const countryResutl = await Country.bulkCreate(apiInfo)
        // por ende cargamos los datos en la tabla con una sola llamada
        return countryResutl;
    }
    catch(err){
        console.log("Error saving data", err);
    }
}

const getDb = async()=>{
    //agrego las actividades a la base de datos
    try{
        return await Country.findAll({ //guardo las activitis
            include:{
                model: Activity,
                atributes:['name','difficulty','duration','season'],
                through:{
                    atributes:[]
                }
            }
        })
    }
    catch(err){
        console.log("Error saving data", err);
    }
}

const getApiActivity = async () => {
    try{
        getApiInfo.forEach(async (element) => {
            await Country.findOrCreate({ where:  {
            name: element.name,
            id: element.id,
            image: element.image,
            continent: element.continent,
            capital: element.capital,
            subregion: element.subregion,
            area: element.area,
            population: element.population  
            }})
        });
    }
    catch(err){
        console.log("Error saving data", err);
    }
}

router.get('/',async( req,res)=>{
    try{
    const activities = await Country.findAll({include:{model:Activity}});
    const {name}= req.query;
    res.status(200).send(activities);
}
catch(err){
    console.log("Error saving data",err)
}
})
router.get('/countries', async(req, res, next)=>{
    const {name} = req.query;
    try{
        let countries;
        const dbCountry = await Country.count(); //cuento lso registros de paises
        countries = dbCountry === 0 ? await getApiInfo(): await getDb(); // is db esta " " llamo a la api si uso los registros de la db
        if(name){
            console.log(name);
            const porName = countries.filter(n => n.name.toLowerCase().includes(name.toLowerCase()));
            porName ? res.status(200).send(porName):res.status(404).send('The country was not found')
        }else{
            res.status(200).send(countries);
        }
    }
    catch(err){
        console.log("Something went wrong",err)
    }
})

router.get('/countries/:id', async(req,res)=>{
    try {
        const id = req.params.id
        const getAll = await getAllCountries()
        if(id){let countriesId = await getAll.filter((e)=>{e.id===id})
        countriesId.length ?res.status(200).send(countriesId) :res.status(404)
    }}
    catch(e){console.log(e)}
    //     const country = await Country.find(idPais,
    //         { include: Activity } 
    //     )
    //     country ? res.json(idPais, country) : res.sendStatus(404)
    //     console.log(country)
        
    // } catch (err) {
    //     res.send(err);
    // }
})
router.post('/activity', async(req,res)=>{
    let { id,
          name,
          difficulty,
          duration,
          season,
          countryId} = req.body;
   try{
     const addCountries = await Activity.create({
        id,
        name,
        difficulty,
        duration,
        season,
    });
     if(countryId){
         await addCountries.addCountry(countryId);
     }
     res.status(200).json({mesage:'Successfully loaded tourist activity', addCountries})
    }
    catch(err){
                console.log("Error loading country, try again", err)
            }
    })
module.exports = router;
