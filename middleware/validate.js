const Actions = require('../data/helpers/actionModel.js');

function validateProjectData(){
    return (req, res, next) => {
        if(!req.body.name || !req.body.description){
            return res.status(400).json({ error: "A new project requires a name and description"})
        } else {
            next();
        }
    }
}

function validateProjectId(){
    return (req, res, next) => {
        Projects.get(req.params.id)
            .then(project => {
                if(project){
                    req.project = project
                    next()
                } else {
                    res.status(404).json({error: `A project with an id of ${req.params.id} does not exist.`})
                }
            })
    }
}

function validateActionData(){
    return (req, res, next) => {
        if(!req.body.project_id || !req.body.description || !req.body.notes){
            return res.status(400).json({ error: "A new action requires a project id, a description, and notes"})
        } else {
            next()
        }
    }
}

function validateActionId(){
    return (req, res, next) => {
        Actions.get(req.params.id)
            .then(action => {
                if(action){
                    req.action = action
                    next()
                } else {
                    res.status(404).json({error: `A action with an id of ${req.params.id} does not exist.`})
                }
            })
    }
}

function validateProjectActionId(){
    return (req, res, next) => {
        Projects.get(req.body.project_id)
            .then(project => {
                if(project){
                    req.project = project
                    next()
                } else {
                    res.status(404).json({error: `A project with an id of ${req.body.project_id} does not exist.`})
                }
            })
    }
}

module.exports = {
    validateProjectData,
    validateProjectId,
    validateActionData,
    validateProjectActionId,
    validateActionId

} 