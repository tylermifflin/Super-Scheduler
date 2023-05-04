// used math.floor in order to generate a random id for each note and exported it to use in server.js
module.exports = () => 
Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
