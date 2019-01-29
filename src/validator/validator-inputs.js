'use strict';

let errors = [];

function ValidationContract(){
    errors = [];
}

ValidationContract.prototype.isRequires = (value, message) => {
    if(!value || value.length <= 0)
        errors.push({ message: message});
}

ValidationContract.prototype.hasMinLen = (value, min, message) => {
    if(!value || value.length < min)
        errors.push({ message: message });        
}

ValidationContract.prototype.hasMaxLen = (value, max, message) => {
    if(!value || value.length > max)
        errors.push({ message: message });
}

ValidationContract.prototype.isFixedLen = (value, len, message) => {
    if(value.length != len)
        errors.push({ message: message });
}

ValidationContract.prototype.isEmail = (value, message) => {
    let regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if(!regex.test(value))
        errors.push({ message: message });
}

ValidationContract.prototype.erros = () => {
    return errors;
}

ValidationContract.prototype.clear = () => {
    erros = [];
}

ValidationContract.prototype.isValid = () => {
    return errors.length == 0;
}

module.exports = ValidationContract;