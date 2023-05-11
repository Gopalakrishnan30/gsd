const userModel=require('../models/user')

exports.create=async(req,res)=>{
    if (!req.body.email && !req.body.firstName && !req.body.lastName && !req.body.phone) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    const user = new userModel({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone
    });
    
    try {
        const data=await user.save();
        res.send({
            message:"User created successfully!!",
            user:data
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });

    }
}

exports.findAll=async (req,res)=>{
try {
    const user=await userModel.find();
    res.send({
        message:"UsUserer data fetched successfully!!",
        user:user
    });
} catch (error) {
    res.status(404).send({
        message: err.message || "Unable to fetch data"
    });
}
}

exports.findOne = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    const data=await userModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false });
    try {
        if (!data) {
            res.status(404).send({
                message: `User not found.`
            });
        }else{
            res.send({ message: "User updated successfully." })
        }
    } catch (error) {
        res.status(500).send({
            message: err.message
        });
    }
    
};

exports.destroy = async (req, res) => {

    const data=await userModel.findByIdAndRemove(req.params.id);

    try {
        if (!data) {
            res.status(404).send({
              message: `User not found.`
            });
          } else {
            res.send({
              message: "User deleted successfully!"
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message
          });
    }
}


