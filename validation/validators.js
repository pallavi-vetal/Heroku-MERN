const Validators = require('validator');
const isEmpty = require('is-empty');

module.exports.loginValidator = loginValidator = function validateLoginInput(data){
    const errors = {}

    data.email = !(isEmpty(data.email)) ? data.email:"";
    data.password = !isEmpty(data.password) ? data.password:"";

    if(Validators.isEmpty(data.email)){
        errors.email = "Email is required. Can't be empty!"
    }
    if(!Validators.isEmail(data.email)){
        errors.email = "Email is invalid. Please provide valid email address!";
    }

    if(Validators.isEmpty(data.password)){
        errors.password = "Please provide passowrd!";
    }
    return {
        errors: errors,
        isValid: isEmpty(errors)
    };
}

module.exports.registerValidator = registerValidator= function validateRegisterInput(data){

    const errors = {}
    data.email = !(isEmpty(data.email)) ? data.email:"";
    data.password = !isEmpty(data.password) ? data.password:"";
    data.name = !(isEmpty(data.name)) ? data.name : "";
    if(Validators.isEmpty(data.email)){
        errors.email = "Email is required. Can't be empty!"
    }
    if(Validators.isEmpty(data.name)){
        errors.name = "Name is required. Can't be empty!"
    }
    if(!Validators.isEmail(data.email)){
        errors.email = "Email is invalid. Please provide valid email address!";
    }

    if(Validators.isEmpty(data.password)){
        errors.password = "Please provide passowrd!";
    }
    return {
        errors:errors,
        isValid:isEmpty(errors)
    };
    
}