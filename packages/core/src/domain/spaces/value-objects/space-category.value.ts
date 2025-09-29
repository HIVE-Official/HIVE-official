/**
 * SpaceCategory Value Object
 * Represents the category/type of a space
 */

import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';

export enum SpaceCategoryEnum {
  GENERAL = 'general',
  STUDY_GROUP = 'study-group',
  SOCIAL = 'social',
  EVENT = 'event',
  RESOURCE = 'resource',
  DORM = 'dorm',
  CLUB = 'club',
  SPORTS = 'sports',
  ACADEMIC = 'academic'
}

interface SpaceCategoryProps {
  value: SpaceCategoryEnum;
}

export class SpaceCategory extends ValueObject<SpaceCategoryProps> {
  get value(): SpaceCategoryEnum {
    return this.props.value;
  }

  private constructor(props: SpaceCategoryProps) {
    super(props);
  }

  public static create(category: string): Result<SpaceCategory> {
    if (!Object.values(SpaceCategoryEnum).includes(category as SpaceCategoryEnum)) {
      return Result.fail<SpaceCategory>(`Invalid space category: ${category}`);
    }

    return Result.ok<SpaceCategory>(
      new SpaceCategory({ value: category as SpaceCategoryEnum })
    );
  }

  public static createGeneral(): Result<SpaceCategory> {
    return Result.ok<SpaceCategory>(
      new SpaceCategory({ value: SpaceCategoryEnum.GENERAL })
    );
  }

  public static createStudyGroup(): Result<SpaceCategory> {
    return Result.ok<SpaceCategory>(
      new SpaceCategory({ value: SpaceCategoryEnum.STUDY_GROUP })
    );
  }

  public isAcademic(): boolean {
    return [
      SpaceCategoryEnum.STUDY_GROUP,
      SpaceCategoryEnum.ACADEMIC,
      SpaceCategoryEnum.RESOURCE
    ].includes(this.props.value);
  }

  public isSocial(): boolean {
    return [
      SpaceCategoryEnum.SOCIAL,
      SpaceCategoryEnum.DORM,
      SpaceCategoryEnum.CLUB,
      SpaceCategoryEnum.SPORTS
    ].includes(this.props.value);
  }

  public toString(): string {
    return this.props.value;
  }
}