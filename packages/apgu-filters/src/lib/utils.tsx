import { ReactNode } from "react";
import {
  ComparatorDef,
  PredicateDef,
  ComparatorDefaultPayload,
  PredicateInstance,
  ComparatorInstance,
  PredicateDefaultPayload
} from "./types";

export const createComparator = <
  TFieldType = any,
  TFilterValue = any,
  TComparatorPayload extends object = ComparatorDefaultPayload
>(
  def: ComparatorDef<TFieldType, TFilterValue>
) => {
  return <TInitialPayload extends Partial<TComparatorPayload>>(
    payload: TInitialPayload
  ) => {
    type MissingKeys = Exclude<keyof TComparatorPayload, keyof TInitialPayload>;
    type HasMissingKeys = MissingKeys extends never ? false : true;

    return <TOverride extends Partial<TComparatorPayload>>(
      payloadOverride?: HasMissingKeys extends true
        ? Pick<TComparatorPayload, MissingKeys> &
            Partial<Omit<TComparatorPayload, MissingKeys>>
        : Partial<TComparatorPayload>
    ): ComparatorInstance<TFieldType, TFilterValue, TComparatorPayload> => {
      return {
        def,
        payload: {
          ...payload,
          ...payloadOverride
        } as unknown as TComparatorPayload
      };
    };
  };
};

export const createPredicate = <
  TFieldType = any,
  TFilterValue = any,
  TPredicatePayload extends object = PredicateDefaultPayload,
  TComparators extends readonly ComparatorInstance<
    TFieldType,
    TFilterValue
  >[] = ComparatorInstance<TFieldType, TFilterValue>[]
>(
  def: PredicateDef<TFieldType, TFilterValue, TComparators>
) => {
  return <TInitialPayload extends Partial<TPredicatePayload>>(
    payload: TInitialPayload
  ) => {
    type MissingKeys = Exclude<keyof TPredicatePayload, keyof TInitialPayload>;
    type HasMissingKeys = MissingKeys extends never ? false : true;

    return (
      args: {
        field: string;
      } & (HasMissingKeys extends true
        ? Pick<TPredicatePayload, MissingKeys> &
            Partial<Omit<TPredicatePayload, MissingKeys>>
        : Partial<TPredicatePayload>)
    ): PredicateInstance<
      TFieldType,
      TFilterValue,
      TComparators,
      TPredicatePayload
    > => {
      const { field, ...payloadOverride } = args;

      return {
        field,
        def,
        payload: {
          ...payload,
          ...payloadOverride
        } as unknown as TPredicatePayload
      };
    };
  };
};
