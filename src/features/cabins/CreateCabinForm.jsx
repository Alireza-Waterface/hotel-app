import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({onClose, cabinToEdit = {}}) {
   const {id: editID, ...editValues} = cabinToEdit;

   const isEditSession = Boolean(editID);

   const { register, handleSubmit, reset, getValues, formState } = useForm({
      defaultValues: isEditSession ? editValues : {},
   });

   const { errors } = formState;

   const {createCabin, isCreating} = useCreateCabin();
   const {editCabin, isEditing} = useEditCabin();

   const isLoading = isCreating || isEditing;

   const onSubmit = (data) => {
      const image = typeof data.image === 'string' ?
         data.image : data.image[0];

      if (!isEditSession) createCabin({...data, image: image}, {
         onSuccess: () => {
            reset();
            onClose?.();
         },
      });
      else editCabin({
         newCabinData: {
            ...data,
            image,
         },
         id: editID,
      }, {
         onSuccess: () => {
            reset();
            onClose?.();
         },
      });
   };

   const onError = () => {

   };

   return (
      <Form onSubmit={handleSubmit(onSubmit, onError)} type={onClose ? 'modal' : 'regular'}>
         <FormRow label='Cabin name' error={errors?.name?.message}>
            <Input
               type="text"
               id="name"
               disabled={isLoading}
               {...register('name', {
                  required: 'This field is required'
               })}
            />
         </FormRow>

         <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
            <Input               
               type="number"
               id="maxCapacity"
               disabled={isLoading}
               {...register('maxCapacity', {
                  required: 'This field is required',
                  min: {
                     value: 1,
                     message: 'Capacity must be at least "1"',
                  }
               })}
            />
         </FormRow>

         <FormRow label='Regular price' error={errors?.regularPrice?.message}>
            <Input               
               type="number"
               id="regularPrice"
               disabled={isLoading}
               {...register('regularPrice', {
                  required: 'This field is required',
                  min: {
                     value: 1,
                     message: 'Price must be greater than "0"',
                  }
               })}
            />
         </FormRow>

         <FormRow label='Discount' error={errors?.discount?.message}>
            <Input               
               type="number"               
               id="discount"               
               defaultValue={0}  
               disabled={isLoading}
               {...register('discount', {
                  required: 'This field is required',
                  min: {
                     value: 0,
                     message: 'Discount can\'t be lower than "0"',
                  },
                  validate: (value) =>
                     value <= getValues().regularPrice || 'Discount must be less than regular price'
               })}
            />
         </FormRow>

         <FormRow label='Description' error={errors?.description?.message}>
            <Textarea               
               type="number"        
               id="description"               
               defaultValue=""     
               disabled={isLoading}          
               {...register('description', {
                  required: 'Please provide some description about the cabin',
                  minLength: {
                     value: 10,
                     message: 'Write at least 10 characters about the cabin!'
                  }
               })}
            />
         </FormRow>

         <FormRow label='Cabin photo' error={errors?.image?.message}>
            <FileInput
               id="image"
               accept="image/*"
               disabled={isLoading}
               {...register('image', {
                  required: isEditSession ? false : 'An image of the cabin is required',
               })}
            />
         </FormRow>

         <FormRow>
            <Button
               variation="secondary"
               type="reset"
               disabled={isLoading}
               onClick={() => onClose?.()}
            >Cancel</Button>
            <Button disabled={isLoading} type="submit">{isEditSession ? 'Edit cabin' : 'Create cabin'}</Button>
         </FormRow>
      </Form>
   );
}

export default CreateCabinForm;