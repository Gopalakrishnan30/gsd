const AccountModel = require("../models/mongo/accounts.model");


exports.createAccount=async(req,res)=>{
    try {
        
/* Insert Multiple Data at once */
    //   const sampleAccounts = [
    //     {
    //         account_holder: "Linus Torvalds",
    //         account_id: "MDB829001337",
    //         account_type: "checking",
    //         balance: 50352434,
    //     },
    //     {
    //       account_id: "MDB011235813",
    //       account_holder: "Ada Lovelace",
    //       account_type: "checking",
    //       balance: 60218,
    //     },
    //     {
    //       account_id: "MDB829000001",
    //       account_holder: "Muhammad ibn Musa al-Khwarizmi",
    //       account_type: "savings",
    //       balance: 267914296,
    //     },
    //    ];
    //    let result= await AccountModel.insertMany(sampleAccounts);
     //  res.send({message:`Multiple Account Data inserted successfully`})
 /* Insert Multiple Data at once */
        
 const sampleAccount = {
    account_holder: "DBZ",
    account_id: "MDB829001333",
    account_type: "checking",
    balance: 999999,
   }
   
   let result=await AccountModel.create(sampleAccount);
   res.send({"message":`Account Added successfully ${result.id}`});   

    } catch (err) {
        res.send({message:`Error inserting Account Data ${err}`})
    }
}


exports.fetchAllAccounts=async(req,res)=>{

    try {
       let result=await AccountModel.find({});
       
      // let result=await AccountModel.find({balance:{$lte:999999}}) Balance less then equal to 
        //let result=await AccountModel.find({balance:{$lte:60218}}) 

        res.send({"message":`Account Data fetched  successfully`,"data":{result}});   

    } catch (err) {
        res.send({message:`Error Fetching  Account Data ${err}`})

    }
}

exports.updateAccounts=async(req,res)=>{

    try {
    //Increase balance by 100 for particular id
        let update={$inc:{balance:100}};
        let documentToUpdate={_id:"645b8bbaca1e228411fa2d24"}
       var  result=await AccountModel.updateOne(documentToUpdate,update);

       //Ask on updatemany
       
       let resultCount=result.modifiedCount>0 ?result.modifiedCount:0
        res.send({"message":`Account Data Updated successfully`,"data":{result,resultCount}});   

    } catch (err) {
        res.send({message:`Error Fetching  Account Data ${err}`})

    }
}

exports.deleteAccount=async(req,res)=>{
    try {
    //     let documentToUpdate={_id:"645b8bbaca1e228411fa2d24"}
    //    var  result=await AccountModel.deleteOne(documentToUpdate);
       //Delete Many
       const documentsToDelete = { balance: { $gt: 500 } }
       var  result=await AccountModel.deleteMany(documentsToDelete);

       let resultCount=result.deletedCount>0 ?result.deletedCount:0
        res.send({"message":`Account Data Updated successfully`,"data":{result,resultCount}});   

    } catch (err) {
        res.send({message:`Error Fetching  Account Data ${err}`})

    }
}

//Aggregation example
exports.calculateAverageBalance=async(req,res)=>{
    try {

        const pipeline=[
            //Account with balance greated than 1000
            {$match:{balance:{$gt:1000}}},

            //Calculate avaerage and total balance
            {
                $group:{
                    _id:"$account_type",
                    total_balance:{$sum:"$balance"},
                    avg_balance:{$avg:"$balance"},
                }
            }
        ];

        let result= await AccountModel.aggregate(pipeline);
        res.send({"message":`Account Data Fetched successfully`,"data":{result,result}});   


    } catch (err) {
        res.send({message:`Error Fetching  Account Data ${err}`})

    }
}

exports.sortBalanceData=async(req,res)=>{
try {
    const pipeline=[

        //Account type=Saving and Balance greater than 1500
        {$match:{account_type:'checking',balance:{$gte:1500}}},

        //Desc sort
        {$sort:{balance:-1}},

        //Select required fieds
        {
            $project:{
                _id:0,
                account_id:1,
                account_type:1,
                balance:1,
                //Pounds
                pounds_balance:{$divide:["$balance",1.3]},
                total_balance:{$sum:"$balance"},

            }
        }
    ]
    let result= await AccountModel.aggregate(pipeline);

    res.send({"message":`Account Data Fetched successfully`,"data":{result,result}});   

    
} catch (err) {
    res.send({message:`Error Fetching  Account Data ${err}`})

}
}



