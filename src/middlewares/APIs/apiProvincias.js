const fetch = require("node-fetch")

module.exports ={
    list: async (req, res) => {
       await fetch("https://apis.datos.gob.ar/georef/api/provincias")
       .then(response => response.json())
       .then(provincias =>{
           return res.render("apiProvincias"(provincias))
       })

        res.provincias
        }
    }

