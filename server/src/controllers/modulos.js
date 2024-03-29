const fs = require('fs');

module.exports = {

    getProcesos(req, res) {
        fs.readFile('/usr/src/app/proc/procmodule', 'utf-8', (err, data) => {
            if (err) {
                console.log('error: ', err);
            } else {
                res.send(JSON.parse(data.replace(",]", "]")));
            }
        });
    },

    getRam(req, res) {
        fs.readFile('/usr/src/app/proc/rammodule', 'utf-8', (err, data) => {
            if (err) {
                console.log('error: ', err);
            } else {
                res.send(JSON.parse(data));
            }
        });
    },

}