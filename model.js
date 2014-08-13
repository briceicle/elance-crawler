var Models = require('./models.json');

var Model = function(model){
    this.init = function(){
        this.model = Models[model];
    }
    if(this.model){

       if(model == 'elance'){
            console.log(model);
       }
    }
}

module.exports = Model;

