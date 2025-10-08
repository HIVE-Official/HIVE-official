/**
 * Firebase Tool Repository Implementation
 * Handles tool (HiveLab) persistence with Firebase
 */
import { IToolRepository } from '../interfaces';
import { Result } from '../../../domain/shared/base/Result';
import { Tool } from '../../../domain/tools/aggregates/tool.aggregate';
import { ToolId } from '../../../domain/tools/value-objects/tool-id.value';
export declare class FirebaseToolRepository implements IToolRepository {
    private readonly collectionName;
    findById(id: ToolId | any): Promise<Result<Tool>>;
    findByCreator(profileId: string): Promise<Result<Tool[]>>;
    findBySpace(spaceId: string): Promise<Result<Tool[]>>;
    findByStatus(status: string, campusId: string): Promise<Result<Tool[]>>;
    findByVisibility(visibility: string, campusId: string): Promise<Result<Tool[]>>;
    findPublished(campusId: string, limitCount?: number): Promise<Result<Tool[]>>;
    findDeployedToSpace(spaceId: string): Promise<Result<Tool[]>>;
    findTrending(campusId: string, limitCount?: number): Promise<Result<Tool[]>>;
    findForkableTools(campusId: string): Promise<Result<Tool[]>>;
    searchTools(searchQuery: string, campusId: string): Promise<Result<Tool[]>>;
    recordUse(toolId: string): Promise<Result<void>>;
    save(tool: Tool): Promise<Result<void>>;
    delete(id: ToolId | any): Promise<Result<void>>;
    private toDomain;
    private toPersistence;
}
//# sourceMappingURL=tool.repository.d.ts.map