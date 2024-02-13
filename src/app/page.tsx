'use client'

import { 
  Button, 
  FormControl, 
  FormErrorMessage, 
  FormLabel, 
  Input, 
  InputGroup, 
  InputRightElement, 
  NumberDecrementStepper, 
  NumberIncrementStepper, 
  NumberInput, 
  NumberInputField, 
  NumberInputStepper, 
  Select, 
  VStack
} from "@chakra-ui/react";
import { useState } from "react";
import countryList from "@/countries";
import { SubmitHandler, useForm } from "react-hook-form";

// Input Schema for react-hook-form
type Inputs = {
  email: string,
  name: string,
  country: string,
  age: number,
  password: string,
}

const MIN_AGE: number = 0
const MAX_AGE: number = 150

export default function Home() {
  const [show, setShow] = useState<boolean>(false);
  const handlePasswordShow = () => {
    setShow(!show)
  };
  
  /**
   * register: adds the form fields to hook monitoring
   * handleSubmit: invokes on submitting the html form and passes the processed data to callback passed
   * forState: { errors } destructured errors returned by hooks after validation
   */
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();  
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-16 lg:p-24">

      <form  onSubmit={handleSubmit(onSubmit)}>

        <VStack
          padding={10} 
          borderRadius={16}
          spacing={10}
          borderColor={'gray.400'}
          borderWidth={1}
        >
          <h1>Sign Up</h1>

          {/**  isInvalid prop controls display of error message */}
          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Email address</FormLabel>
            <Input 
              variant={'filled'}
              bg={'gray.400'}
              type='email'
              {...register("email", {
                required: "Please give us your email",
                pattern: { 
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
                  message: "This email is not a valid one" 
                }
              })}              
            />
            {!!errors.email && (
              <>
                <FormErrorMessage>{errors.email.message}</FormErrorMessage>
              </>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.name}>
            <FormLabel>Name</FormLabel>
            <Input 
              variant={'filled'} 
              bg='gray.400'
              type='text' 
              {...register("name", {
                required: "Please give us your name",
                minLength: { value: 2, message: "Name should be at least 2 letters long" }
              })}  
            />
            {!!errors.name && (
              <>
                <FormErrorMessage>{errors.name.message}</FormErrorMessage>
              </>
            )}
          </FormControl>    

          <FormControl isInvalid={!!errors.country}>
            <FormLabel>Country</FormLabel>
            <Select 
              placeholder='Select Country' 
              variant='filled'
              bg='gray.400'
              {...register("country", {
                required: "Please provide us your country"
              })}
            >
              {
                countryList.map((country, key) => (
                  <option key={key} value={country}>{country}</option>
                ))
              }
            </Select>
            {!!errors.country && (
              <>
                <FormErrorMessage>{errors.country.message}</FormErrorMessage>
              </>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.age}>
            <FormLabel>Age</FormLabel>
            <NumberInput 
              variant={'filled'} 
              min={MIN_AGE} 
              max={MAX_AGE} 
              clampValueOnBlur={false}
            >
              <NumberInputField  
                bg='gray.400'
                {...register("age", {
                  required: "Please provde us your age",
                  min: { value: MIN_AGE, message: `Age cannot be less than ${MIN_AGE} years` },
                  max: { value: MAX_AGE, message: `Age cannot be more than ${MAX_AGE} years` }
                })}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {!!errors.age && (
              <>
                <FormErrorMessage>{errors.age.message}</FormErrorMessage>
              </>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <InputGroup size='md'>
              <Input
                variant={'filled'}
                bg='gray.400'
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
                {...register("password", {
                  required: "Password is mandatory",
                  minLength: { value: 8, message: "Password must be at least 8 characters long" }
                })}
              />
              <InputRightElement width='4.5rem'>
                <Button variant={'outlined'} h='1.75rem' size='sm' onClick={handlePasswordShow}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            {!!errors.password && (
              <>
                <FormErrorMessage>{errors.password.message}</FormErrorMessage>
              </>
            )}
          </FormControl>
          
          <Button 
            isDisabled={!!errors.age || !!errors.country || !!errors.email || !!errors.password || !!errors.name} 
            type="submit"
            bg={'gray.400'}
          >
              Submit
          </Button>
          
        </VStack>


      </form>
    </main>
  );
}
``