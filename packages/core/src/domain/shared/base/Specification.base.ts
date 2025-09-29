/**
 * Base Specification class following DDD principles
 * Specifications encapsulate business rules that can be combined
 */
export abstract class Specification<T> {
  abstract isSatisfiedBy(candidate: T): boolean;

  and(specification: Specification<T>): Specification<T> {
    return new AndSpecification(this, specification);
  }

  or(specification: Specification<T>): Specification<T> {
    return new OrSpecification(this, specification);
  }

  not(): Specification<T> {
    return new NotSpecification(this);
  }
}

class AndSpecification<T> extends Specification<T> {
  constructor(
    private left: Specification<T>,
    private right: Specification<T>
  ) {
    super();
  }

  isSatisfiedBy(candidate: T): boolean {
    return this.left.isSatisfiedBy(candidate) && this.right.isSatisfiedBy(candidate);
  }
}

class OrSpecification<T> extends Specification<T> {
  constructor(
    private left: Specification<T>,
    private right: Specification<T>
  ) {
    super();
  }

  isSatisfiedBy(candidate: T): boolean {
    return this.left.isSatisfiedBy(candidate) || this.right.isSatisfiedBy(candidate);
  }
}

class NotSpecification<T> extends Specification<T> {
  constructor(private specification: Specification<T>) {
    super();
  }

  isSatisfiedBy(candidate: T): boolean {
    return !this.specification.isSatisfiedBy(candidate);
  }
}