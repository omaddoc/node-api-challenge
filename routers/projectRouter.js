const express = require('express');

// import middleware functions
const { validateProjectData, validateProjectId } = require('../middleware/validate.js')

// import project model helper functions
const Projects = require('../data/helpers/projectModel.js');

// use express router
const router = express.Router();


// Get project by id
router.get('/:id', (req, res) => {
    const { id } = req.params;

    Projects.get(id)
        .then(project => {
            if(project){
                console.log(project)
                res.status(200).json(project)
            } else {
                res.status(404).json({ error: `A project with an id of ${id} does not exist.`})
            }

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: `There was an error getting the specified project`})
        })
})

// Get all projects (there only seems to be one)
router.get('/', (req, res) => {

    Projects.get()
        .then(projects => {
            if(projects){
                return res.status(200).json(projects)
            } else {
                return res.status(404).json({ error: 'No projects were found'})
            }

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: `There was an error getting the projects`})
        })
})

// Get project actions
router.get('/:id/actions', validateProjectId(), (req, res) => {
    const { id } = req.params;
    Projects.getProjectActions(id)
        .then(projectActions => {
            if(projectActions.length){
                res.status(200).json(projectActions)
            } else {
                res.status(404).json({ message: `Project id ${id} exists but there are no actions associated with it`})
            }

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'There was an error retrieving project actions'})
        })
})

// Add a new project
router.post('/', validateProjectData(), (req, res) => {
    const { name, description } = req.body;
    Projects.insert({ name, description })
        .then(posted => {
            console.log(posted)
            res.status(201).json(posted)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'There was an error added the new project'})
        })
})

// Delete a project
router.delete('/:id', validateProjectId(), (req, res) => {

    const { id } = req.params;
    Projects.remove(id)
        .then(deleted => {
            res.status(204).end()
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: `There was an error deleting the post`})
        })
})

router.put('/:id', validateProjectId(), validateProjectData(), (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    Projects.update(id, { name, description })
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'There was an error updating the project'})
        })
})


module.exports = router; 