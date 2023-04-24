// import React from 'react'
// import { useState } from 'react';
// const Demo = () => {
//     const [items, setItems] = useState([
// 		{ id:1,  price: 100, ticket:"Aditya", isSelected: false },
	
//         { id:1,  price: 100, ticket:"tusal", isSelected: false },
// 	]);
//     const [totalItemCount, setTotalItemCount] = useState(6);
//     // const [inputValue, setInputValue] = useState('');
//     const handleQuantityIncrease = (index) =>{
       
//         const newItems = [...items];

// 		newItems[index].price++;

// 		setItems(newItems);
// 		calculateTotal();
        
//     }

//     const handleQuantityDecrease =(index)=>{
//         const newItems = [...items];

// 		newItems[index].price--;

// 		setItems(newItems);
// 		calculateTotal();

//     }
//     const calculateTotal = () => {
// 		const totalItemCount = items.reduce((total, item) => {
// 			return total + item.quantity;
// 		}, 0);

// 		setTotalItemCount(totalItemCount);
// 	};

//   return (
//     <>
//     <div className='main-div'>
//         {
//           items.map((ele,index)=>(
//             <div className='ele-rending'>
//               {ele.ticket}
//               <input />
//               {ele.price}
//             </div>
//         ))
//         }
//         <button onClick={handleQuantityIncrease}>+
//         </button>
//         <span> {items.price}</span>
//         <button onClick={handleQuantityDecrease}></button>
//     </div>
    
//     </>
//   )
// }

// export default Demo