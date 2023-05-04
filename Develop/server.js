const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid');
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.port || 3001;

const app = express();