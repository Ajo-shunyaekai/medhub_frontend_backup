import React, { useState } from 'react';
import Pagination from 'react-js-pagination';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import moment from "moment-timezone";


const AssignDriver = ({ items, inquiryDetails }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3; // Number of orders to display per page

  // Logic to slice orders for pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = items?.slice(indexOfFirstOrder, indexOfLastOrder);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="product-list-main-container">
      <div className='table-card-body-container'>
        <div className="table-assign-driver-heading">Product List</div>
        <div className='table-assign-date-time'>
        {moment(inquiryDetails?.created_at)
                      .tz("Asia/Kolkata")
                      .format("DD/MM/YYYY HH:mm:ss")}
          </div>
      </div>

      <table className="table">
        <tbody>
          {currentOrders?.map((item, i) => (
            <tr key={i}>
              <td className='tables-td'>
                <div className="table-g-section-content">
                  <span className="table-g-driver-name">Product ID</span>
                  <span className="table-g-not-names">{item.medicine_id}</span>
                </div>
              </td>
              <td className='tables-td-cont'>
                <div className="table-second-container">
                  <span className="table-g-section">{item?.medicine_details?.medicine_name?.charAt(0).toUpperCase()}</span>
                  <div className="table-g-section-content">
                    <span className="table-g-driver-name">Product Name</span>
                    <span className="table-g-not-name">{item?.medicine_details?.medicine_name}</span>
                  </div>
                </div>
              </td>
              <td className='tables-td'>
                <div className="table-g-section-content">
                  <span className="table-g-driver-name">Quantity Req.</span>
                  <span className="table-g-not-name">{item.quantity_required}</span>
                </div>
              </td>
              <td className='tables-td'>
                <div className="table-g-section-content">
                  <span className="table-g-driver-name">Listed Price</span>
                  <span className="table-g-not-name">
                    {/* {item.unit_price} AED */}
                    {item.unit_price ? `${item.unit_price} AED` : ''}
                    </span>
                </div>
              </td>
              <td className='tables-td'>
                <div className="table-g-section-content">
                  <span className="table-g-driver-name">Target Price</span>
                  <span className="table-g-not-name">
                    {/* {item.target_price} AED */}
                    {item.target_price
                        ? item.target_price.toLowerCase().includes('aed')
                            ? item.target_price.replace(/days/i, 'AED')
                            : `${item.target_price} AED` 
                        : '-'}
                  </span>
                </div>
              </td>
              <td className='tables-td'>
                <div className="table-g-section-content">
                  <span className="table-g-driver-name">Est. Delivery Time</span>
                  <span className="table-g-not-name">
                  {item.est_delivery_days
                        ? item.est_delivery_days.toLowerCase().includes('days')
                            ? item.est_delivery_days.replace(/days/i, 'Days')
                            : `${item.est_delivery_days} Days` 
                        : ''}
                    </span>
                </div>
              </td>
              <td className='tables-td'>
                <div className="table-g-section-content">
                  <span className="table-g-driver-name">Status</span>
                  <span className="table-g-not-name">
                    {item.status === 'Quotation submitted'
                      ? 'Quotation Received'
                      : item?.status?.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                    }
                  </span>
                </div>
              </td>

              <td>
                {/* Any additional actions */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination section */}
      <div className='pagi-container'>
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={ordersPerPage}
          totalItemsCount={items?.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
          prevPageText={<KeyboardDoubleArrowLeftIcon style={{ fontSize: '15px' }} />}
          nextPageText={<KeyboardDoubleArrowRightIcon style={{ fontSize: '15px' }} />}
          hideFirstLastPages={true}
        />
        <div className='pagi-total'>
          Total Items: {items?.length}
        </div>
      </div>
    </div>
  );
};

export default AssignDriver;
