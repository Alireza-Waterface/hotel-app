import { useState, useEffect } from 'react';

import useSettings from './useSettings';
import useUpdateSettings from './useUpdateSettings';

import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';

function UpdateSettingsForm() {
   const {
      settings: {
         minBookingLength,
         maxBookingLength,
         maxGuestsPerBooking,
         breakfastPrice,
      } = {},
      isLoading,
   } = useSettings();

   const [formValues, setFormValues] = useState({
      minBookingLength: minBookingLength || '',
      maxBookingLength: maxBookingLength || '',
      maxGuestsPerBooking: maxGuestsPerBooking || '',
      breakfastPrice: breakfastPrice || '',
   });

   const { updateSettings, isUpdating } = useUpdateSettings();

   useEffect(() => {
      setFormValues({
         minBookingLength: minBookingLength || '',
         maxBookingLength: maxBookingLength || '',
         maxGuestsPerBooking: maxGuestsPerBooking || '',
         breakfastPrice: breakfastPrice || '',
      })
   }, [minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice]);

   const handleUpdate = (e) => {
      const { value, name } = e.target;

      if (!value || value == formValues[name]) return;
      else updateSettings({
         [name]: value,
      });
   };

   return isLoading ? <Spinner /> : (
      <Form>
         <FormRow label='Minimum nights/booking'>
            <Input
               type='number'
               id='min-nights'
               name='minBookingLength'
               defaultValue={minBookingLength}
               disabled={isUpdating}
               onBlur={handleUpdate}
            />
         </FormRow>
         <FormRow label='Maximum nights/booking'>
            <Input
               type='number'
               id='max-nights'
               name='maxBookingLength'
               defaultValue={maxBookingLength}
               disabled={isUpdating}
               onBlur={handleUpdate}
            />
         </FormRow>
         <FormRow label='Maximum guests/booking'>
            <Input
               type='number'
               id='max-guests'
               name='maxGuestsPerBooking'
               defaultValue={maxGuestsPerBooking}
               disabled={isUpdating}
               onBlur={handleUpdate}
            />
         </FormRow>
         <FormRow label='Breakfast price'>
            <Input
               type='number'
               id='breakfast-price'
               name='breakfastPrice'
               defaultValue={breakfastPrice}
               disabled={isUpdating}
               onBlur={handleUpdate}
            />
         </FormRow>
      </Form>
   );
}

export default UpdateSettingsForm;