import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SpinnerMini from '../../ui/SpinnerMini';

import useSignup from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
   const { register, formState, getValues, handleSubmit, reset } = useForm();

   const { errors } = formState;

   const { signup, isSigningUp } = useSignup();

   function onSubmit({fullName, email, password}) {
      signup({fullName, email, password}, { onSettled: () => reset() });
   }

   return (
      <Form onSubmit={handleSubmit(onSubmit)}>
         <FormRow label="Full name" error={errors?.fullName?.message}>
            <Input
               type="text"
               id="fullName"
               disabled={isSigningUp}
               {...register('fullName', {
                  required: 'Please provide user\'s name'
               })}
            />
         </FormRow>

         <FormRow label="Email address" error={errors?.email?.message}>
            <Input
               type="email"
               id="email"
               autoComplete="off"
               disabled={isSigningUp}
               {...register('email', {
                  required: 'Please provide an email',
                  pattern: {
                     value: /\S+@\S+\.\S+/,
                     message: 'Email is not valid',
                  }
               })}
            />
         </FormRow>

         <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
            <Input
               type="password"
               id="password"
               autoComplete="off"
               disabled={isSigningUp}
               {...register('password', {
                  required: 'Password is required',
                  minLength: {
                     value: 8,
                     message: 'Minimum password length is 8 chars'
                  }
               })}
            />
         </FormRow>

         <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
            <Input
               type="password"
               id="passwordConfirm"
               disabled={isSigningUp}
               {...register('passwordConfirm', {
                  required: 'This field is required',
                  validate: (value) => value === getValues().password || 'Passwords need to match'
               })}
            />
         </FormRow>

         <FormRow>
            <Button variation="secondary" type="reset" disabled={isSigningUp}>
               Cancel
            </Button>
            <Button type="submit" disabled={isSigningUp}>{isSigningUp ? <SpinnerMini /> : 'Create new user'}</Button>
         </FormRow>
      </Form>
   );
}

export default SignupForm;