// Bounded Context Owner: HiveLab Guild
import type { ToolAggregate } from "./aggregates/tool.aggregate";

export interface ToolRepository {
  findById(_toolId: string): Promise<ToolAggregate | null>;
  listByCreator(_profileId: string): Promise<ToolAggregate[]>;
  listByCampus(_campusId: string): Promise<ToolAggregate[]>;
  listBySpace(_spaceId: string): Promise<ToolAggregate[]>;
  listAll(): Promise<ToolAggregate[]>;
  save(_tool: ToolAggregate): Promise<void>;
  listLimitedRunExpiring(_reference: Date, _limit?: number): Promise<ToolAggregate[]>;
}
