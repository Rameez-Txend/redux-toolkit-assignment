import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addnewName, removeNames, updateName } from './redux/slices/counterSlice';
import { useGetPostsQuery } from './api/apiSlice';

export function Counter() {
  const names = useSelector(state => state.name.names);
  const dispatch = useDispatch();

  const [namee, setName] = useState('');
  const [newtext, setnewText] = useState('');
  const [editingId, setEditingId] = useState(null); 
  const {data, isLoading, isError} = useGetPostsQuery();
  console.log(data);
  

  const changeName = (e) => {
    e.preventDefault();
    if (namee.trim()) {
      const id = crypto.randomUUID(); 
      setName('');
      dispatch(addnewName({ id, name: namee }));
    }
  };

  const update = (id) => {
    if (newtext.trim()) {
      dispatch(updateName({ id, name: newtext }));
      setnewText(''); 
      setEditingId(null); 
    }
  };

  const startEditing = (id, currentName) => {
    setEditingId(id);
    setnewText(currentName); 
  };

  return (
    <div>
      <div>
        <form onSubmit={changeName}>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            type='text'
            value={namee}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit'>Save</button>
        </form>
        
        <div>
          <h3>Saved Names:</h3>
          <ul>
            {names.map((data) => (
              <div key={data.id}>
                <li>{data.name}</li>
                <button onClick={() => startEditing(data.id, data.name)}>Edit</button>
                <button onClick={() => dispatch(removeNames({ id: data.id }))}>Delete</button>

                {editingId === data.id && (
                  <div>
                    <input
                      type='text'
                      value={newtext}
                      onChange={(e) => setnewText(e.target.value)}
                    />
                    <button onClick={() => update(data.id)}>Update</button>
                  </div>
                )}
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h3>Posts:</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error fetching posts.</p>
        ) : (
          <ul>
            {data && data.length > 0 ? (
              data.map((post) => (
                <li key={post.id}>
                  <h4>{post.title}</h4>
                  <p>{post.body}</p>
                </li>
              ))
            ) : (
              <p>No posts available</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
