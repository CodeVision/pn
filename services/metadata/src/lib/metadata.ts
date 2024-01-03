import { PhoneNumberType, PhoneNumberUtil } from 'google-libphonenumber'

const numberUtil = PhoneNumberUtil.getInstance()

export const getMetadata = (numberString: string) => {
  const prefixedNumber = '+' + numberString;
  try {
    const info = numberUtil.parse(prefixedNumber);

    if (numberUtil.isValidNumber(info)) {
      return {
        number: prefixedNumber,
        country: numberUtil.getRegionCodeForNumber(info),
        mobile: numberUtil.getNumberType(info) == PhoneNumberType.MOBILE
      }
    }
    throw new Error("Invalid number")
  } catch(error) {
    throw new Error("Could not parse phone number")
  }
}
