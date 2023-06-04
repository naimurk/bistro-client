import { useForm } from 'react-hook-form';
import SectionTitle from '../../../Component/SectionTitle/SectionTitle';
import useAdmin from '../../../hooks/useAdmin';
import Swal from 'sweetalert2'
const image_token = import.meta.env.VITE_IMAGE_TOKEN;
// console.log(image_token);


const Additem = () => {
  const [isAdmin] = useAdmin()
  const token = localStorage.getItem('access-token')
  const url = `https://api.imgbb.com/1/upload?expiration=600&key=${image_token}`

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {

    
    // console.log(data.image)
    const formData = new FormData();
    formData.append('image', data.image[0]);
    fetch(url,{
      method : "POST",
      body : formData
    })
    .then(res => res.json())
    .then(imageResponse => {
      // console.log(imageResponse);
      if(imageResponse.success){
        const imageUrl = imageResponse.data.display_url;
        const {category , price , name , recipe , description} = data;
        const newMenuItem = {category, price: parseFloat(price), name, recipe , description, image:imageUrl}
        console.log(newMenuItem);
        if(isAdmin){
          fetch('http://localhost:5000/menu', {
            method : "POST",
            headers : {
              authorization : `bearer ${token}`,
              'content-type': 'application/json'
          },
            body: JSON.stringify(newMenuItem)
          })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if(data.insertedId){
              Swal.fire(
                'item added successfully!',
                'You clicked the button!',
                'success'
              )
            }
          })
        }


        else {
          alert ('you are not a admin')
        }


      }
    })
  };





  console.log(errors);
  return (
    <div className='w-3/5 mx-auto bg-slate-300 p-24'>
      <SectionTitle heading={'Add An Item'} subHeading={"what's New"}></SectionTitle>
      <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex w-full gap-3 my-3'>
          <input className='px-5 py-3 w-full border-2' type="text" placeholder=" food name" {...register("name", { required: true, maxLength: 80 })} />
          <input className='px-5 py-3 w-full border-2' type="text" placeholder="recipe name" {...register("recipe", { required: true, maxLength: 80 })} />
        </div>


        <div className='flex w-full gap-4 my-3'>

          <select className='px-5 py-3 w-full border-2' {...register("category", { required: true })}>
            <option value="salad">salad</option>
            <option value="dessert">dessert</option>
            <option value="drinks">drinks</option>
            <option value="pizza">pizza</option>
            <option value="soup">soup</option>
          </select>


          <input className='px-5 py-3 w-full border-2' type="text" placeholder="price" {...register("price", { required: true, maxLength: 100 })} />
        </div>


        <textarea  className="textarea w-1/2" {...register("description", { maxLength: 100 })} placeholder="Bio"></textarea>
        <div className='my-3'>
          <input type="file"  {...register("image", { required: true })} className="file-input w-full max-w-xs" />
        </div>
        <input className='bg-yellow-500 px-8 py-3 rounded-s-md cursor-pointer ' type="submit" />
      </form>
    </div>
  );
};

export default Additem;