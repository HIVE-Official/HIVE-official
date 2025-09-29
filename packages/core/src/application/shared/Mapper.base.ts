/**
 * Base Mapper class for converting between domain models and DTOs
 * Enforces proper layer separation in DDD
 */
export abstract class Mapper<TDomain, TDTO> {
  abstract toDTO(domain: TDomain): TDTO;
  abstract toDomain(dto: TDTO): TDomain;

  toDTOArray(domains: TDomain[]): TDTO[] {
    return domains.map(domain => this.toDTO(domain));
  }

  toDomainArray(dtos: TDTO[]): TDomain[] {
    return dtos.map(dto => this.toDomain(dto));
  }
}