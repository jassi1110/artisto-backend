const {PythonShell} =require('python-shell');
exports.recoML = async () => {

    return new Promise((res,rej)=>{
        let options = {
            mode: 'text',
            pythonOptions: ['-u'],
            scriptPath: './'
        };

        PythonShell.run('model.py', options, function (err, result){
            if (err) rej(err);
            res(result)
      });
    })
    
}
