// import { useEffect, useState } from 'react';
// import Table from 'react-bootstrap/Table';

// function Categories() {
//   const [category, setCategory] = useState([]);

//   const getCategories = () => {
//     getAllCategories(category_id).then(setCategory);
//   };

//   useEffect(() => {
//     getCategories();
//   }, []);

//   return (
//     <Table striped bordered hover>
//       <thead>
//         <tr>
//           <th>Categories</th>
//         </tr>
//       </thead>
//       <tbody>
//         {
//           category?.map((categories) => (
//             <tr>
//               <td>{categories.label}</td>
//             </tr>
//           ))
//         }
//       </tbody>
//     </Table>
//   );
// }

// export default Categories;
