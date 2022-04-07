import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  @Inject(ConfigService) public config: ConfigService;

  getHello(): string {
    const developmentMode: string = `DEVELOPMENT_MODE: ${process.env.DEVELOPMENT_MODE}`;
    console.log(developmentMode);
    return `
    <style>
        .container {
            width: 100vw;
            height: 100vh;
            background: #6C7A89;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }
        
        .box {
            width: 300px;
            height: 300px;
            background: #fff;
        }
        
        body {
            margin: 0px;
        }
    </style>
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <title>Hello World!</title>
    </head>
    
    <body>
        <div class="container">
            <div class="box">
                Sambli Tech
            </div>
        </div>
    </body>
    
    </html>`
  }
}
