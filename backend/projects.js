const pmongo=require('mongoose');

const projSchema = pmongo.Schema;

var projects = new projSchema({
    projectid:{
        type: Number,
        required: true
    },
    projmngr:{
        type: String,
        required: true
    },
    projname:{
        type: String,
        required: true
    },
    projdes:{
        type: String,
        required: true
    },
    projtype:{
        type: String,
        required: true
    },
    projdate:{
        type:String,
        required: true
    },
    projloc:{
        type: String,
        required: true
    },
    projtasks:{
        type: String,
    }

});

const project=module.exports=pmongo.model('projects',projects);