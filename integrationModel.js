const { PythonShell } = require('python-shell');
// const spawn = require('child_process').spawn

exports.recoML = async (name) => {
    return new Promise((res, rej) => {
    obj = []
    var spawn = require('child_process').spawn;
    var process = spawn('python3', ['./model.py',name]);
    process.stdout.on('data', function (data) {
        // console.log(data.toString())
        result = JSON.parse(data)
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
    //     // res();

        // let options = {
        //     mode: 'text',
        //     pythonPath:'python', 
        //     pythonOptions: ['-u'],
        //     scriptPath: './V1.0.0/ML',
        //     args: [name]
        // };
        // PythonShell.run('model.py', options, function (err, result) {
        //     if (err) rej(err);
        //     result = JSON.parse(result)
        //     i = 0;
        //     for (var key in result.Correlation) {
        //         if (i > 3) {
        //             break;
        //         }
        //         else if (result.Correlation[key] == 1) {
        //             continue;
        //         }
        //         else {
        //             myJSON = {
        //                 name: key,
        //                 Correlation: result.Correlation[key],
        //                 Rating: result.rating[key],
        //                 "Number of Ratings": result["num of ratings"][key]
        //             }
        //             obj.push(myJSON);
        //         }
        //         i++;
        //     }
        //     i = 0;
        //     res(obj)
        // obj = []
        });
    })

}

const helper = async () => {
    const d = await this.recoML('Aarya');
    console.log(d);
}

helper();