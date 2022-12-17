const { PythonShell } = require('python-shell');
exports.recoML = async () => {
    return new Promise((res, rej) => {
        obj = []
        let options = {
            mode: 'text',
            pythonOptions: ['-u'],
            scriptPath: './V1.0.0/ML'
        };

        PythonShell.run('model.py', options, function (err, result) {
            if (err) rej(err);
            result = JSON.parse(result[0])
            for (var key in result.Correlation) {
                // console.log(key)
                if (result.Correlation[key] == 1) {
                    myJSON = {
                        name: key,
                        Correlation: result.Correlation[key],
                        Rating: result.rating[key],
                        "Number of Ratings": result["num of ratings"][key]
                    }
                    obj.push(myJSON);
                    break;
                }
            }
            i = 0;
            for (var key in result.Correlation) {
                if (i > 2) {
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
            res(obj)
        });
    })

}

const helper = async () => {
    const d = await this.recoML();
    console.log(d);
}

helper();