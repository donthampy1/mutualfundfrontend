import React from 'react'
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"


const Signup = () => {

  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError, reset } = useForm()

  
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/signup',
        data,
        { withCredentials: true } 
      )

      navigate('/mainpage')

      reset()
     } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        
        if (errorMessage === 'User not found') {
          setError('email', {
            type: 'manual',
            message: 'User not found'
          });
        } else if (errorMessage === 'Invalid email or password') {
          setError('password', {
            type: 'manual',
            message: 'Invalid credentials'
          });
        }else {
          console.log('error', error)
        }

    }
  }
}

  return (
    <>
      <div className='flex items-center justify-center min-h-screen bg-gray-50'>
        <div className='relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0'>
          <div className='flex flex-col justify-center p-8 md:p-14'>
            <span className='mb-3 text-4xl font-bold'> Signup</span>
            <span className='font-light text-gray-400 mb-6 '>Enter Your Details to Signup </span>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className='py-1'>
              <span className='mb-2 text-md'>Username</span>
              <input {...register('username', { required: 'Username is required' })} 
                type='text' placeholder='name' className='w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500' name='username' />
               {errors.username && (
                  <p className='text-red-500 text-sm mt-1'>{errors.username.message}</p>
                )}
            </div>
            <div className='py-1'>
              <span className='mb-2 text-md'> Email</span>
              <input  {...register('email', { required: 'Email is required' })}  type='text' placeholder='example@gmail.com' className='w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500' name='email' />
              {errors.email && (
                  <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
                )}
            </div>
            <div className='py-1 mb-5'>
              <span className='mb-2 text-md'> Password</span>
              <input {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' },
                  })}  type='password' placeholder='***********' className='w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500' name='password' />
                  {errors.password && (
                  <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>
                )}

            </div>
            <button
  type="submit"
  disabled={isSubmitting}
  onClick={()=> console.log(isSubmitting)}
  className={`w-full p-3 rounded-lg mb-6 transition duration-300 ease-in-out ${
    isSubmitting
      ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
      : 'bg-black text-white hover:bg-white hover:text-black hover:border hover:border-gray-300'
  }`}
>
  {isSubmitting ? 'Sigining up...' : 'Signup'}
</button>
            </form>
            <div className='text-center text-gray-400'>      
                  Already have an account ? <Link to="/" className="font-bold text-black ml-2">Signin here</Link>

          </div>
          </div>
        </div>
      </div>
        
    </>
  )
}

export default Signup