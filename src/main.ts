import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use((req, res, next) => {
    const auth = {username: "Ah3kY&6t", password: "KjTY&3mb"}

    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [username, password] = Buffer.from(b64auth, 'base64').toString().split(':')

    if (username && password && username === auth.username && password === auth.password) {
      return next()
    }

    res.set('WWW-Authenticate', 'Basic realm="401"')
    res.status(401).send({status: 401, message: "Credênciais de acesso inválidas"})
  })

  await app.listen(3000);
}
bootstrap();
