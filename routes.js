import express from "express";
const router = express.Router();
import {UserController} from './controller/UserController.js';
import {JobController} from './controller/JobController.js';
import {JwtVerify} from "./middleware/JwtVerify.js";

const UserControllers = new UserController();
const JobControllers = new JobController();
const JwtVerifys = new JwtVerify();

// Register API
router.post('/register', UserControllers.register);

// Login API
router.post('/login', UserControllers.login);

// Define a GET job list endpoint
router.get('/jobs', JwtVerifys.verifyToken, JobControllers.job);

// Define a GET job endpoint
router.get('/jobs/:id', JwtVerifys.verifyToken, JobControllers.getJob);

export default router;