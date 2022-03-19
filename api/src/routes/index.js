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
        const apiInfo = await data.map((c)=>{
            return {
           id: c.cca3,
           name: c.name.common,
           img: c.flags[0],
           continents: c.continents[0],
           capital: c.capital + c.flags[0] , //?.[0] por alguna razon pregunto y accedo
           subregion: c.subregion,  // de lo contrario no accedo
           area: c.area,
           population: c.population,
            }
        }) 
        const countryResutl = await Country.bulkCreate(apiInfo)
        //// El metodo "bulkCreate" permite insertar multiples registros
        // en la tabla de su base de datos con una sola llamada de funcion,
        // por ende cargamos los datos en la tabla con una sola llamada
        return countryResutl;
    }
    catch(err){
        throw new Error
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
        throw new err;
    }
}

const getApiActivity = async () => {
    try{
        return Activity.findAll({
            include:{
                model: Country,
                atributes:['name','img','continents','capital'],
                through:{
                    atributes:[]
                }
            }
        })
    }
    catch(err){
        throw new err;
    }
}

router.get('/activity',async( req,res)=>{
    try{
    const activities = await getApiActivity();
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
    try{
        const {id} = req.params;
        const countriesAll = getDb();
        if(id){
            const countryId = countriesAll.find(id=>id.id===id);
            countryId.length ? res.status(200).send(countryId) : res.status(404).send("the country does not exist");
        }
    }
    catch(err){
        console.log("The country or id does not exist",err)
    }
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
