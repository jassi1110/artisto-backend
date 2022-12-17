const { PythonShell } = require('python-shell');
exports.recoML = async (name) => {
    return new Promise((res, rej) => {
        obj = []
        let options = {
            mode: 'text',
            pythonOptions: ['-u'],
            scriptPath: './V1.0.0/ML',
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
