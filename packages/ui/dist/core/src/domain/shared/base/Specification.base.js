/**
 * Base Specification class following DDD principles
 * Specifications encapsulate business rules that can be combined
 */
export class Specification {
    and(specification) {
        return new AndSpecification(this, specification);
    }
    or(specification) {
        return new OrSpecification(this, specification);
    }
    not() {
        return new NotSpecification(this);
    }
}
class AndSpecification extends Specification {
    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }
    isSatisfiedBy(candidate) {
        return this.left.isSatisfiedBy(candidate) && this.right.isSatisfiedBy(candidate);
    }
}
class OrSpecification extends Specification {
    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }
    isSatisfiedBy(candidate) {
        return this.left.isSatisfiedBy(candidate) || this.right.isSatisfiedBy(candidate);
    }
}
class NotSpecification extends Specification {
    constructor(specification) {
        super();
        this.specification = specification;
    }
    isSatisfiedBy(candidate) {
        return !this.specification.isSatisfiedBy(candidate);
    }
}
//# sourceMappingURL=Specification.base.js.map