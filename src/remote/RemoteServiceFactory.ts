import { remote } from 'electron';
import { RemoteServiceBase } from '@/remote/RemoteServiceBase';

// Factory class to get RemoteService instances from renderer process.
export class RemoteServiceFactory {
  public static getModule<T extends RemoteServiceBase>(service: typeof RemoteServiceBase & { new(): T }): T {
    let remoteModule = null;
    try {
      remoteModule = remote.require('./background').RemoteModule;
    } catch {
      remoteModule = remote.require('./index').RemoteModule;
    }
    return new remoteModule[service.serviceName]();
  }
}
