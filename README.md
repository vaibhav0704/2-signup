## Project Made using Next.js

## Run Project in Dev Mode?

```bash
$ docker compose up
```

## Approach towards the problem
Validating forms generally doesn't require controlled inputs, but here we needed the submit button to be disabled till all inputs passed the validation. This requires the implementation of controlled input and if it done using useState it will increase the number of rerenders.

To mitigate the above issue I used react-hook-form library which increases DX as well as optimizes the number of rerenders made to validate the inputs. The button stays enabled untill the first submission attempt, but if the validation fails the button is disabled and errors are diplayed accordingly. This improves user experience as the user would see a form full of error messages upfornt.
