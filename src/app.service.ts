import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  @Inject(ConfigService) public config: ConfigService;

  getHello(): string {
    const developmentMode: string = `DEVELOPMENT_MODE: ${process.env.DEVELOPMENT_MODE}`;
    console.log(developmentMode);
    return `<body style="background-color: blue;">
              <h1>Hello World!</h1>
              <p>https://sambli-tech.herokuapp.com/</p>
            </body`
  }
}
