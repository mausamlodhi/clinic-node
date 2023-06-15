import bodyParser from 'body-parser';
import express from 'express';
import models from './models';
import db from './models/index.js';
import routes from './routes';

export default class Bootstrap {
    /**
   * Creates an instance of Bootstrap.
   * @param {object} app
   * @memberOf Bootstrap
   */
  constructor(app) {
    this.app = app;
    this.middleware();
    this.routes();
    this.start();
    this.connectDb();
    
  }
  
  /**
   * Load all middleware
   * @memberOf Bootstrap
   */
  middleware(){
    const { app } = this;
    app.use(
        bodyParser.urlencoded({
          extended: false,
        }),
      );
      app.use(bodyParser.json({ limit: '2000mb' }));
      //app.use('/public', express.static(`${__dirname}/../public`));

  }

  routes() {
    routes(this.app);
  }
  /**
   * Check database connection
   * @memberOf Bootstrap
   */
  connectDb() {

    const { sequelize } = db;

    sequelize

      .authenticate()

      .then(async () => {
        await sequelize
        .sync()
        .then(() => {
            console.log("database connected");
        })
        .catch((error) => {
            console.log(error);
        });

      })

      .catch((error) => {

       console.log(error);

      });

  }

  start() {
    const { app } = this;
    const port = app.get('port');
    // eslint-disable-next-line no-unused-vars
    const server = app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log('Server has started on port %d', port);
    });
    
  }
 
}