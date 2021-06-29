import "reflect-metadata";
import { createConnection } from "typeorm";
import { Product } from "./entity/product";
import * as express from 'express';

createConnection().then(async connection => {

  const app = express()

  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())

  app.get('/', async (req, res) => {
    const result = await connection.manager.find(Product);
    res.send(result)
  })

  app.post('/', async (req, res) => {
    const product = new Product();
    product.Name = req.body.Name;
    product.Price = req.body.Price

    const result = await connection.manager.save(product);
    res.send(result)
  })

  app.put('/:id', async (req, res) => {
    const result = await connection.manager.update(Product, req.params.id, req.body);
    res.send(result)
  })

  app.get('/:id', async (req, res) => {
    const result = await connection.manager.findOne(Product, req.params.id);
    res.send(result)
  })

  app.delete('/:id', async (req, res) => {
    const result = await connection.manager.delete(Product, req.params.id);
    res.send(result)
  })


  app.listen(8000, () => console.log('listening'))

  // console.log("Inserting a new user into the database...");
  // const user = new User();
  // user.firstName = "Timber";
  // user.lastName = "Saw";
  // user.age = 25;
  // await connection.manager.save(user);
  // console.log("Saved a new user with id: " + user.id);
  //
  // console.log("Loading users from the database...");
  // const users = await connection.manager.find(User);
  // console.log("Loaded users: ", users);
  //
  // console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
