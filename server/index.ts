import { App } from './src/App';

class APIServer {

  static readonly forceSync = true;

  public static run = async () => {
    const app = new App();

    await app.listen({ forceSync: this.forceSync });
  };

}

APIServer.run();