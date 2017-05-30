# Building for production

To start the build run the following command

```
npm run build:prod
```

After the process is done you should have a directory called ```./dist/prod```. 
In this directory you will find all you need to serve the application on a web server.

## Other commands

In the scripts section of package.json file there should be a total of four scripts for the **prod** build

"build:prod": "npm run clean:prod && npm run bundle:prod",
    "clean:prod": "rimraf dist/prod",
    "bundle:prod": "webpack --env=prod --colors --progress --display-used-exports",
    "serve:prod": "lite-server -c config/server.prod.js",

### The cleaning process
This command will remove all content of the ```./dist/prod``` directory
```
npm run clean:prod
```

### The bundle process
This command will remove run the ```./config/webpack.prod.js``` and copy all the content to the ```./dist/prod``` directory.
```
npm run clean:prod
```


### The building process. 
The build:prod is a combination of the clean- and bundle- process
```
npm run build:prod
```

It will first run the ```clean:prod``` command, then the ```bundle:prod``` command.

### Finally, we have the Serve process
This comman will serve your application on http://localhost:4030 using the lite-server project from npm

```
npm run serve:prod
```

## Minification

## Tree Shaking

## Compression

## Copying files and assets

## Testing the deployment

## What about AOT?