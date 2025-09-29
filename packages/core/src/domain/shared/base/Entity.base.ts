/**
 * Base Entity class following DDD principles
 * Entities have identity that persists over time
 */
export abstract class Entity<TProps> {
  protected readonly _id: string;
  protected props: TProps;

  protected constructor(props: TProps, id: string) {
    this._id = id;
    this.props = props;
  }

  get id(): string {
    return this._id;
  }

  equals(entity?: Entity<TProps>): boolean {
    if (!entity) {
      return false;
    }

    if (!(entity instanceof Entity)) {
      return false;
    }

    return this._id === entity._id;
  }
}