module.exports = {
    conditionHelper: function (condition, status){
        if(condition === status){
            return true;
        }else if(condition !== status){
            return false;
        }else{
            return false;
        }
    },

    stringify: function (object) {
        return JSON.stringify(object);
    }


}