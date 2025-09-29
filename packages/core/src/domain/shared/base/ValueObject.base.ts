/**
 * Base Value Object class following DDD principles
 * Value Objects are immutable and defined by their properties
 */
export abstract class ValueObject<TProps> {
  protected readonly props: TProps;

  protected constructor(props: TProps) {
    this.props = Object.freeze(props);
  }

  equals(vo?: ValueObject<TProps>): boolean {
    if (!vo || !(vo instanceof ValueObject)) {
      return false;
    }

    return JSON.stringify(this.props) === JSON.stringify(vo.props);
  }

  getValue(): TProps {
    return this.props;
  }
}