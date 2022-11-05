import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {AlquilerCompra} from '../models';
import {AlquilerCompraRepository} from '../repositories';

export class AlquilerCompraController {
  constructor(
    @repository(AlquilerCompraRepository)
    public alquilerCompraRepository : AlquilerCompraRepository,
  ) {}

  @post('/alquiler-compras')
  @response(200, {
    description: 'AlquilerCompra model instance',
    content: {'application/json': {schema: getModelSchemaRef(AlquilerCompra)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AlquilerCompra, {
            title: 'NewAlquilerCompra',
            exclude: ['id'],
          }),
        },
      },
    })
    alquilerCompra: Omit<AlquilerCompra, 'id'>,
  ): Promise<AlquilerCompra> {
    return this.alquilerCompraRepository.create(alquilerCompra);
  }

  @get('/alquiler-compras/count')
  @response(200, {
    description: 'AlquilerCompra model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AlquilerCompra) where?: Where<AlquilerCompra>,
  ): Promise<Count> {
    return this.alquilerCompraRepository.count(where);
  }

  @get('/alquiler-compras')
  @response(200, {
    description: 'Array of AlquilerCompra model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AlquilerCompra, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AlquilerCompra) filter?: Filter<AlquilerCompra>,
  ): Promise<AlquilerCompra[]> {
    return this.alquilerCompraRepository.find(filter);
  }

  @patch('/alquiler-compras')
  @response(200, {
    description: 'AlquilerCompra PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AlquilerCompra, {partial: true}),
        },
      },
    })
    alquilerCompra: AlquilerCompra,
    @param.where(AlquilerCompra) where?: Where<AlquilerCompra>,
  ): Promise<Count> {
    return this.alquilerCompraRepository.updateAll(alquilerCompra, where);
  }

  @get('/alquiler-compras/{id}')
  @response(200, {
    description: 'AlquilerCompra model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AlquilerCompra, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(AlquilerCompra, {exclude: 'where'}) filter?: FilterExcludingWhere<AlquilerCompra>
  ): Promise<AlquilerCompra> {
    return this.alquilerCompraRepository.findById(id, filter);
  }

  @patch('/alquiler-compras/{id}')
  @response(204, {
    description: 'AlquilerCompra PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AlquilerCompra, {partial: true}),
        },
      },
    })
    alquilerCompra: AlquilerCompra,
  ): Promise<void> {
    await this.alquilerCompraRepository.updateById(id, alquilerCompra);
  }

  @put('/alquiler-compras/{id}')
  @response(204, {
    description: 'AlquilerCompra PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() alquilerCompra: AlquilerCompra,
  ): Promise<void> {
    await this.alquilerCompraRepository.replaceById(id, alquilerCompra);
  }

  @del('/alquiler-compras/{id}')
  @response(204, {
    description: 'AlquilerCompra DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.alquilerCompraRepository.deleteById(id);
  }
}
