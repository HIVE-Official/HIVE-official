import { Mapper } from '../../shared/Mapper.base';
import { Profile } from '../../../domain/profile/aggregates/profile.aggregate';
import { ProfileDTO } from '../dtos/profile.dto';
export declare class ProfileMapper extends Mapper<Profile, ProfileDTO> {
    toDTO(profile: Profile): ProfileDTO;
    toDomain(dto: ProfileDTO): Profile;
}
//# sourceMappingURL=profile.mapper.d.ts.map