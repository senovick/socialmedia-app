export const validateRegisterInput = (username, email, password, confirmPassword) => {
    const errors = { };
    const params = {username, email, password, confirmPassword};
    
    for(const key in params){
        if(params[key] != ''){
            if(key === 'email'){
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(!params[key].match(re)) errors.email = "Email must be a valid email address";    
            }
            else if(key === 'confirmPassword' && params[key] != params['password']){
                errors.confirmPassword = 'Passwords much match';
            }    
        }
        else {
            errors[key] = `${key} may not be empty`;
        }
    }
    return {
        errors,
        valid: Object.keys(errors).length == 0
    }
}

export const validateLoginInput = (username, password) => {
    const errors = {};
    if(username.trim() === '') errors.username = 'username may not be empty';
    if(password.trim() === '') errors.password = 'password may not be empty';

    return {
        errors,
        valid: Object.keys(errors).length == 0
    }
}