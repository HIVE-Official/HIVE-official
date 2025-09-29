"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mapper = void 0;
/**
 * Base Mapper class for converting between domain models and DTOs
 * Enforces proper layer separation in DDD
 */
class Mapper {
    toDTOArray(domains) {
        return domains.map(domain => this.toDTO(domain));
    }
    toDomainArray(dtos) {
        return dtos.map(dto => this.toDomain(dto));
    }
}
exports.Mapper = Mapper;
//# sourceMappingURL=Mapper.base.js.map