/**
 * userId é o campo utilizado quando há autorização via token jwt com sucesso pelo usuário,
 * ela será armazenada dentro do da variável de requisição(req.userId)
 */
declare namespace Express {
  export interface Request {
    user_id: String;
  }
}
