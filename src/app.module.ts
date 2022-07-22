import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

import 'dotenv/config';

@Module({
  imports: [AuthModule, MongooseModule.forRoot(process.env.MONGO_URL)],
})
export class AppModule {}
