const { default: axios } = require("axios");
const redis=require('redis');
 
const DEFAULT_EXPIRATION =3600;

let redisClient;

(async () => {
  redisClient=redis.createClient() //add prod url when run on prod.Default localhost.
  redisClient.on("error", (error) => console.error(`Error : ${error}`));
  await redisClient.connect();

})();
 

async function fetchApiData(species) {
  const apiResponse = await axios.get(
    `http://www.fishwatch.gov/api/species/${species}`
  );
  console.log("Request sent to the API");
  return apiResponse.data;
}

exports.getSpeciesData = async (req,res)=>{
  const species = req.params.species;
  let results;
  let isCached = false;

  try {
    const cacheResults = await redisClient.get(species);

    if (cacheResults) {
      isCached = true;
      results = JSON.parse(cacheResults);
    } else {
      results = await fetchApiData(species);

      if (results.length === 0) {
        throw "API returned an empty array";
      }
      await redisClient.set(species, JSON.stringify(results),{
        EX:180,
        NX:true
      });
    }

    res.status(200).send({
      fromCache: isCached,
      data: results,
    });
  } catch (error) {
    console.error(error);
    res.status(404).send("Data unavailable");
  }
}


