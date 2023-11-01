const User = require("../models/userModel");


const createUser = async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne(email);
    if (!findUser) {
        //Crear un nuevo usuario
        const newUser = User.create(req.body);
        res.json(newUser);
    }
    else {
        res.json({
            msg:"Usuario ya existente",
            succes: false,
        });
    };
};

module.export= {createUser};