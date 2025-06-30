import React, { useState, useRef } from 'react';
import { assets } from '../../assets/assets';
import { addFood } from '../../services/foodService';
import { toast } from 'react-toastify';

const AddFood = () => {
  const imageInputRef = useRef();
  const [imageFile, setImageFile] = useState(null);
  const [data, setData] = useState({
    name : '',
    description : '',
    category : '',
    price : ''
  })

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData(data => ({...data, [name]:value}))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    } else {
      setImageFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    imageInputRef.current.value = null;
    if (!imageFile) {
      toast.error('Add a photo.');
    }
    try {
      await addFood(data, imageFile)
      toast.success('Food added.');
      setData({
        name:'',
        description:'',
        category:'',
        price:''
      })
      setImageFile(null)
    } catch {
      toast.error('Couldn\'t add food.');
    }
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 fw-bold">ADD FOOD</h2>
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row" style={{ minHeight: '300px' }}>
              {/* Left: Image Upload (40%) */}
              <div className="col-md-5 d-flex flex-column justify-content-center align-items-center border-end mb-4 mb-md-0">
                <label htmlFor="image" className="form-label d-block">
                  <img
                    src={imageFile ? URL.createObjectURL(imageFile) : assets.upload}
                    alt="Preview"
                    height={250}
                    width={250}
                    className="rounded"
                    style={{ objectFit: 'cover', cursor: 'pointer' }}
                  />
                </label>
                <input
                  type="file"
                  className="form-control mt-3"
                  name="image"
                  id="image"
                  ref={imageInputRef}
                  onChange={handleImageChange}
                  style={{ maxWidth: '350px' }}
                />
              </div>

              {/* Right: Form Fields (60%) */}
              <div className="col-md-7">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    name="name" 
                    required 
                    placeholder='e.g. Chicken Biryani'
                    onChange={onChangeHandler}
                    value={data.name} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="3"
                    required
                    placeholder='Describe the dish — ingredients, taste, etc.'
                    onChange={onChangeHandler}
                    value={data.description}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Category</label>
                  <select name="category" id="category" className="form-control" required onChange={onChangeHandler} value={data.category}>
                    <option value="">Select category</option>
                    <option value="BIRYANI">BIRYANI</option>
                    <option value="CAKE">CAKE</option>
                    <option value="BURGER">BURGER</option>
                    <option value="PIZZA">PIZZA</option>
                    <option value="ROLLS">ROLLS</option>
                    <option value="SALAD">SALAD</option>
                    <option value="ICE CREAM">ICE CREAM</option>
                    <option value="COLD DRINK">COLD DRINK</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Price (in Rs)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    required
                    placeholder='e.g. &#8377;299'
                    onChange={onChangeHandler}
                    value={data.price}
                  />
                </div>
                <button type="submit" className="btn btn-secondary mt-2">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
