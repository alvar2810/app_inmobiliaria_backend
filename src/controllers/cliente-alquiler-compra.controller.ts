import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Cliente,
  AlquilerCompra,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteAlquilerCompraController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/alquiler-compras', {
    responses: {
      '200': {
        description: 'Array of Cliente has many AlquilerCompra',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AlquilerCompra)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<AlquilerCompra>,
  ): Promise<AlquilerCompra[]> {
    return this.clienteRepository.alquilerCompras(id).find(filter);
  }

  @post('/clientes/{id}/alquiler-compras', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(AlquilerCompra)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AlquilerCompra, {
            title: 'NewAlquilerCompraInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) alquilerCompra: Omit<AlquilerCompra, 'id'>,
  ): Promise<AlquilerCompra> {
    return this.clienteRepository.alquilerCompras(id).create(alquilerCompra);
  }

  @patch('/clientes/{id}/alquiler-compras', {
    responses: {
      '200': {
        description: 'Cliente.AlquilerCompra PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AlquilerCompra, {partial: true}),
        },
      },
    })
    alquilerCompra: Partial<AlquilerCompra>,
    @param.query.object('where', getWhereSchemaFor(AlquilerCompra)) where?: Where<AlquilerCompra>,
  ): Promise<Count> {
    return this.clienteRepository.alquilerCompras(id).patch(alquilerCompra, where);
  }

  @del('/clientes/{id}/alquiler-compras', {
    responses: {
      '200': {
        description: 'Cliente.AlquilerCompra DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(AlquilerCompra)) where?: Where<AlquilerCompra>,
  ): Promise<Count> {
    return this.clienteRepository.alquilerCompras(id).delete(where);
  }
}
