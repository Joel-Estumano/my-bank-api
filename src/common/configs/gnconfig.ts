import { registerAs } from "@nestjs/config";

const path = require('path');

export default registerAs('gnconfig', () => ({

    credentials: {
        sandbox: Boolean(process.env.GN_SANDBOX),
        client_id: process.env.GN_CLIENT_ID,
        client_secret: process.env.GN_CLIENT_SECRET,
        pix_cert: path.join(__dirname, `../../modules/gerencianet/${process.env.GN_PIX_CERT}`)
    },

    chave_pix: process.env.GN_CHAVE_PIX

}))