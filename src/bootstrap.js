import bodyParser from "body-parser";
import model from "./models/index.js";
import config from "./config/config.js";
import swaggerJSDoc from "swagger-jsdoc";
import compression from "compression";
import methodOverride from "method-override";
import express from "express"; 
import path, { dirname } from "path";
import routes from './routes/index.js';
import swaggerUi from "swagger-ui-express";
export default class Bootstrap{
    constructor(app){
        this.app = app;
        this.middleware();
        this.connectDB();
        this.routes();
        this.start();
    }
    middleware(){
        const {app} = this;
        const swaggerDefinition = {
            info : {
                title : "REST API for Clinic Application",
                version : "1.0.0",
                description : "These are the REST API for Clinic Application"
            },
            host : `${config.SWAGGER_HOST}`,
            basePath : "/api",
            securityDefinition : {
                BearerAuth:{
                    type:"apiKey",
                    description:"JWT Authorization of an API",
                    name:"Authorization",
                    in:"header"
                },
            },
        };
        const options = {
            swaggerDefinition,
            apis : ['./api-documents/*.yml']
        };
        const swaggerFunction = swaggerJSDoc(options);
        app.use(compression());
        app.use(methodOverride());
        app.use(bodyParser.urlencoded({extended:true}));
        app.use(bodyParser.json());
        app.use(express.static(path.join(__dirname,'public')));
        if(true)
            app.use('/genrate-docs',swaggerUi.serve,swaggerUi.setup(swaggerFunction));  
    }
    connectDB(){
        const {sequelize} = model;
        sequelize.authenticate().then((res)=>{
            sequelize.sync().then(()=>{console.log("")}).catch(err=>{console.log(err)})
            console.log("\n\t\tDo Your Work...!");
        }).catch((error)=>{
            console.log(error);
        })
    }
    routes(){
        routes(this.app);
    }
    start(){
        const {app}=this;
        const port = app.get("port");
        const server = app.listen(port);
        
    }
}