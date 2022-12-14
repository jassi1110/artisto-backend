const { PythonShell } = require('python-shell');
const shell = require('shelljs');
const pm2 = require('pm2');
const path = require('path');
// const spawn = require('child_process').spawn

exports.recoML = async (name) => {
    return new Promise((res, rej) => {
    obj = []
    const py_path = path.join(__dirname, '');
    const python_exe_path = path.join(__dirname, 'python/Scripts/python.exe');
        let options = {
            mode: 'text',
            pythonPath:python_exe_path, 
            pythonOptions: ['-u'],
            scriptPath: py_path,
            args: [name]
        };
        PythonShell.run('model.py', options, function (err, result) {
            if (err) rej(err);
            result = JSON.parse(result)
            i = 0;
            for (var key in result.Correlation) {
                if (i > 3) {
                    break;
                }
                else if (result.Correlation[key] == 1) {
                    continue;
                }
                else {
                    myJSON = {
                        name: key,
                        Correlation: result.Correlation[key],
                        Rating: result.rating[key],
                        "Number of Ratings": result["num of ratings"][key]
                    }
                    obj.push(myJSON);
                }
                i++;
            }
            i = 0;
            res(obj)
        obj = []
        });
    })

}

// const helper = async () => {
//     const d = await this.recoML('Aarya');
//     console.log(d);
// }

// helper();