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
  Inmueble,
  AlquilerCompra,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmuebleAlquilerCompraController {
  constructor(
    @repository(InmuebleRepository) protected inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/alquiler-compras', {
    responses: {
      '200': {
        description: 'Array of Inmueble has many AlquilerCompra',
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
    return this.inmuebleRepository.alquilerCompras(id).find(filter);
  }

  @post('/inmuebles/{id}/alquiler-compras', {
    responses: {
      '200': {
        description: 'Inmueble model instance',
        content: {'application/json': {schema: getModelSchemaRef(AlquilerCompra)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Inmueble.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AlquilerCompra, {
            title: 'NewAlquilerCompraInInmueble',
            exclude: ['id'],
            optional: ['inmuebleId']
          }),
        },
      },
    }) alquilerCompra: Omit<AlquilerCompra, 'id'>,
  ): Promise<AlquilerCompra> {
    return this.inmuebleRepository.alquilerCompras(id).create(alquilerCompra);
  }

  @patch('/inmuebles/{id}/alquiler-compras', {
    responses: {
      '200': {
        description: 'Inmueble.AlquilerCompra PATCH success count',
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
    return this.inmuebleRepository.alquilerCompras(id).patch(alquilerCompra, where);
  }

  @del('/inmuebles/{id}/alquiler-compras', {
    responses: {
      '200': {
        description: 'Inmueble.AlquilerCompra DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(AlquilerCompra)) where?: Where<AlquilerCompra>,
  ): Promise<Count> {
    return this.inmuebleRepository.alquilerCompras(id).delete(where);
  }
}
