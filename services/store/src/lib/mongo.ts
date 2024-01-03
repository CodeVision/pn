import { Schema, model, connect as mconnect } from 'mongoose';


export interface PhoneNumber {
  number: string,
  country: string,
  mobile?: boolean
}

const phoneNumberSchema = new Schema<PhoneNumber>({
  number: { type: String, required: true, unique: true },
  country: { type: String, required: true },
  mobile: { type: Boolean, default: false }
});

const PhoneNumber = model<PhoneNumber>('PhoneNumber', phoneNumberSchema);

export const connect = async (uri: string) => {
  await mconnect(uri);
}


export const store = async (item: PhoneNumber) => {
  const pn = new PhoneNumber(item)

  const result = await pn.save()
  console.log(result)
}


