import React from 'react';
import dummyData from '../components/DummyContent'; // Adjust the path as necessary

const UserProfile = ({ user }) => {
    // Use the imported dummyData
    // Assuming dummyData is an array of objects
    console.log('dummyData:', dummyData); // Debugging: Log the dummyData

    return (
        <div>
            <h1>News Article</h1>
            <ul>
                {dummyData.map((item) => (
                    <li key={item.id}>{item.name} - Age is {item.age}</li> // Adjust according to the structure of your data
                ))}
            </ul>
        </div>
    );
};

export default UserProfile;