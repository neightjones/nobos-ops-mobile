const initialListItems = [
  'Masks and Gloves in use. Is there adequate inventory?',
  'Sneeze Guards in place.',
  'FOH Signage: Mask must be worn, Elevator Limits, Social Distancing, Sonesta Pledge.',
  'BOH Signage: Time Clock Attestation.',
  'Sanitizer Stations available for guest and employee use.',
  'Confirm with GM that employee training took place.',
  'Temperature Taking in place.',
  'Retail/Pool/Shoppe/Fitness Center - signage and sanitizer.',
  'Remote Sleeve and Guest Room Door Sticker in use.',
  'F&B - Disposal Menus, Individual packets sugar, salt/pepper, Condiments, Wrapped Silverware.',
  'Linen carts - Clean and Dirty in use.',
  'Front Desk touchless check-in/check-out',
];

const createObj = (itemText, id) => ({
  id,
  text: itemText,
  checked: false,
  imageUri: null,
  videoUri: null,
  comment: '',
});

export default () => initialListItems.map((text,i) => createObj(text, i + 1));