/**
 * Base Mapper class for converting between domain models and DTOs
 * Enforces proper layer separation in DDD
 */
export declare abstract class Mapper<TDomain, TDTO> {
    abstract toDTO(domain: TDomain): TDTO;
    abstract toDomain(dto: TDTO): TDomain;
    toDTOArray(domains: TDomain[]): TDTO[];
    toDomainArray(dtos: TDTO[]): TDomain[];
}
//# sourceMappingURL=Mapper.base.d.ts.map