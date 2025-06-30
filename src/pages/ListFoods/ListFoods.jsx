import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './ListFoods.css';
import { deleteFood, getFoodLists } from '../../services/foodService';

const ListFoods = () => {
  const [list, setList] = useState([]);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const fetchList = async () => {
    try {
      const data = await getFoodLists();
      setList(data);
    } catch {
      toast.error('Can’t load list.');
    }
  };

  const removeFood = async (foodId) => {
    if (pendingDeleteId === foodId) {
      try {
        const success = await deleteFood(foodId);
        if (success) {
          toast.success('Food deleted.');
          await fetchList();
        } else {
          toast.error('Delete failed.');
        }
      } catch {
        toast.error('Delete failed.');
      } finally {
        setPendingDeleteId(null);
      }
    } else {
      setPendingDeleteId(foodId);
      toast.info('Click again to confirm.');
      // Optional: auto-clear pending state after 5 seconds
      setTimeout(() => setPendingDeleteId(null), 5000);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="py-5 row justify-content-center">
      <div className="col-11 card">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.imageUrl} className='rounded' height={100} width={100} alt={item.name} />
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>&#8377;{item.price}</td>
                <td className="text-danger">
                  <i
                    className="bi bi-trash-fill"
                    style={{ fontSize: '1.5rem', cursor: 'pointer' }}
                    onClick={() => removeFood(item.id)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListFoods;
