"use strict";
/**
 * Base CQRS Infrastructure
 * Foundation for Commands, Queries, and Handlers
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Saga = exports.QueryBus = exports.CommandBus = exports.ApplicationService = exports.Query = exports.Command = void 0;
const value_objects_1 = require("../../domain/profile/value-objects");
// Base command class
class Command {
    constructor(userId, campusId) {
        this.userId = userId;
        this.campusId = campusId;
        this.commandId = `cmd_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.timestamp = new Date();
    }
}
exports.Command = Command;
// Base query class
class Query {
    constructor(campusId, userId) {
        this.campusId = campusId;
        this.userId = userId;
        this.queryId = `qry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.timestamp = new Date();
    }
}
exports.Query = Query;
// Application service base
class ApplicationService {
    constructor(unitOfWork, eventDispatcher) {
        this.unitOfWork = unitOfWork;
        this.eventDispatcher = eventDispatcher;
    }
    async executeInTransaction(operation) {
        try {
            await this.unitOfWork.begin();
            const result = await operation();
            if (result.isSuccess) {
                await this.unitOfWork.commit();
            }
            else {
                await this.unitOfWork.rollback();
            }
            return result;
        }
        catch (error) {
            await this.unitOfWork.rollback();
            return value_objects_1.Result.fail(`Transaction failed: ${error}`);
        }
        finally {
            await this.unitOfWork.complete();
        }
    }
}
exports.ApplicationService = ApplicationService;
// Simple command bus implementation
class CommandBus {
    constructor() {
        this.handlers = new Map();
    }
    register(commandType, handler) {
        this.handlers.set(commandType, handler);
    }
    async execute(command) {
        const commandType = command.constructor.name;
        const handler = this.handlers.get(commandType);
        if (!handler) {
            return value_objects_1.Result.fail(`No handler registered for command: ${commandType}`);
        }
        return handler.execute(command);
    }
}
exports.CommandBus = CommandBus;
// Simple query bus implementation
class QueryBus {
    constructor() {
        this.handlers = new Map();
    }
    register(queryType, handler) {
        this.handlers.set(queryType, handler);
    }
    async execute(query) {
        const queryType = query.constructor.name;
        const handler = this.handlers.get(queryType);
        if (!handler) {
            return value_objects_1.Result.fail(`No handler registered for query: ${queryType}`);
        }
        return handler.execute(query);
    }
}
exports.QueryBus = QueryBus;
// Saga base class for cross-aggregate transactions
class Saga {
    constructor() {
        this.steps = [];
        this.compensations = [];
    }
    addStep(step, compensation) {
        this.steps.push(step);
        this.compensations.push(compensation);
    }
    async execute() {
        const executedCompensations = [];
        for (let i = 0; i < this.steps.length; i++) {
            const step = this.steps[i];
            const result = await step();
            if (result.isFailure) {
                // Rollback in reverse order
                for (const compensation of executedCompensations.reverse()) {
                    await compensation();
                }
                return value_objects_1.Result.fail(`Saga failed at step ${i + 1}: ${result.error}`);
            }
            executedCompensations.push(this.compensations[i]);
        }
        return value_objects_1.Result.ok();
    }
}
exports.Saga = Saga;
//# sourceMappingURL=base.js.map