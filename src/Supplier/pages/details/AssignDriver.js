// import React, { useState } from 'react';
// import Pagination from 'react-js-pagination';
// import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
// import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

// const AssignDriver = ({productList}) => {
//     const [currentPage, setCurrentPage] = useState(1);
//     const ordersPerPage = 10; 
//     const activeOrders = [
//         { productId: 'PR1234567', productName: 'Paracetamol (acetaminophen)', quantity: 200, totalAmount: '500 AED' },
//         { productId: 'PR1234568', productName: 'Ibuprofen', quantity: 100, totalAmount: '300 AED' },
//         { productId: 'PR1234569', productName: 'Aspirin', quantity: 150, totalAmount: '450 AED' },
//     ];

//     const indexOfLastOrder = currentPage * ordersPerPage;
//     const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//     const currentOrders = activeOrders.slice(indexOfFirstOrder, indexOfLastOrder);

//     const handlePageChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     return (
//         <div className="card-body">
//             <div>
//                 <div className="table-assign-driver-heading">Product List</div>
//             </div>
//             <table className="table">
//                 <tbody>
//                     {
//                         productList && productList.length > 0 ? (
//                             productList?.map((product, i) => {
//                                 return (
                                    
//                                         <tr key={i}>
//                                             <td className='tables-td'>
//                                                 <div className="table-g-section-content">
//                                                     <span className="table-g-driver-name">Product ID</span>
//                                                     <span className="table-g-not-names">{product.product_id}</span>
//                                                 </div>
//                                             </td>
//                                             <td className='tables-td-cont' >
//                                                 <div className="table-second-container">
//                                                     <span className="table-g-section">G</span>
//                                                     <div className="table-g-section-content">
//                                                         <span className="table-g-driver-name">Product Name</span>
//                                                         <span className="table-g-not-name">{product.product_name}</span>
//                                                     </div>
//                                                 </div>
//                                             </td>
//                                             <td className='tables-td'>
//                                                 <div className="table-g-section-content">
//                                                     <span className="table-g-driver-name">Quantity</span>
//                                                     <span className="table-g-not-name">{product.quantity}</span>
//                                                 </div>
//                                             </td>
//                                             <td className='tables-td'>
//                                                 <div className="table-g-section-content">
//                                                     <span className="table-g-driver-name">Total Amount</span>
//                                                     <span className="table-g-not-name">{product.price}</span>
//                                                 </div>
//                                             </td>
//                                             <td className='tables-status'>
//                                                 <div className='tables-button-conatiner'>
//                                                     <div className='table-accept-button'>Accept</div>
//                                                     <div className='table-reject-button'>Reject</div>
//                                                 </div>
//                                             </td>
//                                         </tr>
                                    
//                                 )
//                             })
//                         ) : (
//                             <>
//                              {currentOrders.map((order, index) => (
//                         <tr key={index}>
//                             <td className='tables-td'>
//                                 <div className="table-g-section-content">
//                                     <span className="table-g-driver-name">Product ID</span>
//                                     <span className="table-g-not-names">{order.productId}</span>
//                                 </div>
//                             </td>
//                             <td className='tables-td-cont' >
//                                 <div className="table-second-container">
//                                     <span className="table-g-section">G</span>
//                                     <div className="table-g-section-content">
//                                         <span className="table-g-driver-name">Product Name</span>
//                                         <span className="table-g-not-name">{order.productName}</span>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td className='tables-td'>
//                                 <div className="table-g-section-content">
//                                     <span className="table-g-driver-name">Quantity</span>
//                                     <span className="table-g-not-name">{order.quantity}</span>
//                                 </div>
//                             </td>
//                             <td className='tables-td'>
//                                 <div className="table-g-section-content">
//                                     <span className="table-g-driver-name">Total Amount</span>
//                                     <span className="table-g-not-name">{order.totalAmount}</span>
//                                 </div>
//                             </td>
//                             <td className='tables-status'>
//                                 <div className='tables-button-conatiner'>
//                                     <div className='table-accept-button'>Accept</div>
//                                     <div className='table-reject-button'>Reject</div>
//                                 </div>
//                             </td>
//                         </tr>
//                     ))}
//                             </>
//                         )
//                     }
                    
//                 </tbody>
//             </table>
//             <div className='pagi-container'>
//                 <Pagination
//                     activePage={currentPage}
//                     itemsCountPerPage={ordersPerPage}
//                     totalItemsCount={activeOrders.length}
//                     pageRangeDisplayed={5}
//                     onChange={handlePageChange}
//                     itemClass="page-item"
//                     linkClass="page-link"
//                     prevPageText={<KeyboardDoubleArrowLeftIcon style={{ fontSize: '15px' }} />}
//                     nextPageText={<KeyboardDoubleArrowRightIcon style={{ fontSize: '15px' }} />}
//                     hideFirstLastPages={true}
//                 />
//                 <div className='pagi-total'>
//                     <div>Total Items: {activeOrders.length}</div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AssignDriver;


import React, { useState } from 'react';
import Pagination from 'react-js-pagination';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const AssignDriver = ({ productList }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 1;
    const activeOrders = [
        { productId: 'PR1234567', productName: 'Paracetamol (acetaminophen)', quantity: 200, totalAmount: '500 AED' },
        { productId: 'PR1234568', productName: 'Ibuprofen', quantity: 100, totalAmount: '300 AED' },
        { productId: 'PR1234569', productName: 'Aspirin', quantity: 150, totalAmount: '450 AED' },
    ];

    const data = productList && productList.length > 0 ? productList : activeOrders;

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = data.slice(indexOfFirstOrder, indexOfLastOrder);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="card-body">
            <div>
                <div className="table-assign-driver-heading">Product List</div>
            </div>
            <table className="table">
                <tbody>
                    {
                        currentOrders.map((order, i) => (
                            <tr key={i}>
                                <td className='tables-td'>
                                    <div className="table-g-section-content">
                                        <span className="table-g-driver-name">Product ID</span>
                                        <span className="table-g-not-names">{order.productId || order.product_id}</span>
                                    </div>
                                </td>
                                <td className='tables-td-cont' >
                                    <div className="table-second-container">
                                        <span className="table-g-section">G</span>
                                        <div className="table-g-section-content">
                                            <span className="table-g-driver-name">Product Name</span>
                                            <span className="table-g-not-name">{order.productName || order.product_name}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className='tables-td'>
                                    <div className="table-g-section-content">
                                        <span className="table-g-driver-name">Quantity</span>
                                        <span className="table-g-not-name">{order.quantity}</span>
                                    </div>
                                </td>
                                <td className='tables-td'>
                                    <div className="table-g-section-content">
                                        <span className="table-g-driver-name">Total Amount</span>
                                        <span className="table-g-not-name">{order.totalAmount || order.price}</span>
                                    </div>
                                </td>
                                <td className='tables-status'>
                                    <div className='tables-button-conatiner'>
                                        <div className='table-accept-button'>Accept</div>
                                        <div className='table-reject-button'>Reject</div>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className='pagi-container'>
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={ordersPerPage}
                    totalItemsCount={data.length}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                    itemClass="page-item"
                    linkClass="page-link"
                    prevPageText={<KeyboardDoubleArrowLeftIcon style={{ fontSize: '15px' }} />}
                    nextPageText={<KeyboardDoubleArrowRightIcon style={{ fontSize: '15px' }} />}
                    hideFirstLastPages={true}
                />
                <div className='pagi-total'>
                    <div>Total Items: {data.length}</div>
                </div>
            </div>
        </div>
    );
};

export default AssignDriver;

