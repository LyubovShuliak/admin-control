import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = OfficeWorker & Document;

@Schema()
export class OfficeWorker {
  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;
}

export const OfficeWorkerSchema = SchemaFactory.createForClass(OfficeWorker);
