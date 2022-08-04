import * as dotenv from "dotenv";
dotenv.config();

/**
 * secret: Chave para assinar o id do usuário que está fazendo login
 * expiresIn: Tempo que essa chave será mantida, ou seja, tempo com que o usuário se manterá autorizado para acessar rotas protegidas
 */
export default {
  secret: process.env.JWT_SECRET!,
  expiresIn: process.env.JWT_EXPIRESIN!,
};
