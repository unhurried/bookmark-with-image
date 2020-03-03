import { RemoteServiceBase } from './RemoteServiceBase';

// Decorator to set "serviceName" static property in RemoteService sub-classes.
export function RemoteService(param: string): Function {
    return function (constructor: typeof RemoteServiceBase) {
        constructor.serviceName = param;
    }
}
