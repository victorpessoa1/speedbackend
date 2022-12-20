import { Router } from "express";
import { CreateClienteController } from "./controllers/cliente/CreateClienteController";
import { CreateColaboradorController } from "./controllers/colaborador/CreateColaboradorController";
import { ReadClienteController } from "./controllers/cliente/ReadClienteController";
import { DeleteClienteController } from "./controllers/cliente/DeleteClienteController";
import { UpdateClienteController } from "./controllers/cliente/UpdateClienteController";

const router = Router()

const createColaborador = new CreateColaboradorController()
router.post("/cadastrarcolaborador", createColaborador.handle)

const createCliente = new CreateClienteController   
router.post("/cadastrarcliente/:uuidcolaborador", createCliente.handle)
const readCliente = new ReadClienteController
router.get("/clientes", readCliente.clientes)
router.get("/cliente/:uuid", readCliente.cliente)
const deleteCliente = new DeleteClienteController
router.delete("/deletarcliente/:uuid", deleteCliente.delete)
const updateClient = new UpdateClienteController
router.put("/atualizarcliente/:uuid", updateClient.update)


export {router}