function buildConfig(env) {  
    if (env === undefined) {
        env = "local";
    }

    console.log("*************************************************")
    console.log("** Build Application, Environment: ", env);  
    console.log("*************************************************")
    console.log("")

    return require('./config/webpack.' + env + '.js')(env)
}

module.exports = buildConfig;
