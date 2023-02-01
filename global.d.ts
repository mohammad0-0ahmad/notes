/* eslint-disable no-undef */

declare type FC<P = {}> = {
  (props: P, context?: any): React.ReactElement<any, any> | null;
  propTypes?: WeakValidationMap<P> | undefined;
  contextTypes?: ValidationMap<any> | undefined;
  defaultProps?: Partial<P> | undefined;
  displayName?: string | undefined;
};
declare type FCWC<P = {}> = (props: P & PropsWithChildren) => JSX.Element;
declare type PropsWithChildren<P = {}> = React.PropsWithChildren<P>;
declare type SetStateType<S> = React.Dispatch<React.SetStateAction<S>>;
declare type StateType<S> = [S, SetStateType<S>];

declare type PageType = next.NextPage & { noAuth?: boolean };
