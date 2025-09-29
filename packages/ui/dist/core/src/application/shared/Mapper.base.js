/**
 * Base Mapper class for converting between domain models and DTOs
 * Enforces proper layer separation in DDD
 */
export class Mapper {
    toDTOArray(domains) {
        return domains.map(domain => this.toDTO(domain));
    }
    toDomainArray(dtos) {
        return dtos.map(dto => this.toDomain(dto));
    }
}
//# sourceMappingURL=Mapper.base.js.map