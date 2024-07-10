import flightModel from "../models/flightModel.js";


export const flightData = async(req,res) => {
    try{
        const{flightNumber,airline,date,departure,arrival,status} = req.body;
        const flight = new flightModel({
            flightNumber,
            airline,
            date,
            departure,
            arrival,
            status
          });
          const result =  await flight.save();
          console.log(result)
          return res.status(200).json({message: "flight data saved successfully!!",result})
      
    }

    catch(err){
        return res.status(500).json({message: "Internal server error!!"})
    }
}