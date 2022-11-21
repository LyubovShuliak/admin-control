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
  role: string;

  @Prop({ required: true })
  boss: string;

  @Prop()
  subordinators: string[];
}

export const OfficeWorkerSchema = SchemaFactory.createForClass(OfficeWorker);
