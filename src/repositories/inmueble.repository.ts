import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Inmueble, InmuebleRelations, AlquilerCompra} from '../models';
import {AlquilerCompraRepository} from './alquiler-compra.repository';

export class InmuebleRepository extends DefaultCrudRepository<
  Inmueble,
  typeof Inmueble.prototype.id,
  InmuebleRelations
> {

  public readonly alquilerCompras: HasManyRepositoryFactory<AlquilerCompra, typeof Inmueble.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AlquilerCompraRepository') protected alquilerCompraRepositoryGetter: Getter<AlquilerCompraRepository>,
  ) {
    super(Inmueble, dataSource);
    this.alquilerCompras = this.createHasManyRepositoryFactoryFor('alquilerCompras', alquilerCompraRepositoryGetter,);
    this.registerInclusionResolver('alquilerCompras', this.alquilerCompras.inclusionResolver);
  }
}
