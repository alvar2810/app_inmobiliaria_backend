import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {AlquilerCompra, AlquilerCompraRelations} from '../models';

export class AlquilerCompraRepository extends DefaultCrudRepository<
  AlquilerCompra,
  typeof AlquilerCompra.prototype.id,
  AlquilerCompraRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(AlquilerCompra, dataSource);
  }
}
