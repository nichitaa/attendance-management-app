import { App } from './src/App';

class APIServer {

  static readonly forceSync = false;

  public static run = async () => {
    const app = new App();

    await app.listen({ forceSync: this.forceSync });
  };

}

APIServer.run();