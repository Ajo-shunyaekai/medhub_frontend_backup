import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../style/dashboardorder.css'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import { postRequestWithToken } from '../../api/Requests';
import moment from 'moment/moment';
import OrderCancel from '../OrderCancel';
import Pagination from 'react-js-pagination';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Table } from 'react-bootstrap';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';

const PendingInvoicesList = () => {
    const navigate = useNavigate()

    const [show, setShow] = useState(false);

    const [modal, setModal] = useState(false)
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const showModal = (orderId) => {
        setSelectedOrderId(orderId)
        setModal(!modal)
    }

    const [loading, setLoading] = useState(true);
    const [invoiceList, setInvoiceList] = useState([]);
    const [totalInvoices, setTotalInvoices] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage     = 5;
    const indexOfLastOrder  = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        const supplierIdSessionStorage = sessionStorage.getItem("supplier_id");
        const supplierIdLocalStorage   = localStorage.getItem("supplier_id");

        if (!supplierIdSessionStorage && !supplierIdLocalStorage) {
        navigate("/supplier/login");
        return;
        }
        setLoading(true); 
        const obj = {
            supplier_id  : supplierIdSessionStorage || supplierIdLocalStorage,
            filterKey : 'pending',
            page_no   : currentPage, 
            limit     : ordersPerPage,
        }

        postRequestWithToken('order/get-invoice-list-all-users', obj, async (response) => {
            if (response.code === 200) {
                setInvoiceList(response.result.data);
                setTotalInvoices(response.result.totalItems);
            } else {
               console.log('error in order list api',response);
            }
            setLoading(false);
          })
    },[currentPage])
    return (
        <>
         {loading ? (
                        <Loader />
                    ) : (
            <div className='completed-order-main-container'>
                <div className="completed-order-main-head">Pending Invoices</div>
                <div className="completed-order-container">
                    <div className="completed-order-container-right-2">
                        <Table responsive="xxl" className='completed-order-table-responsive'>
                            <thead>
                                <div className='completed-table-row-container m-0' style={{ backgroundColor: 'transparent' }} >
                                    < div className='table-row-item table-order-1' >
                                        <span className='completed-header-text-color' >Invoice No</span>
                                    </div>
                                    <div className='completed-table-row-item completed-table-order-1'>
                                        <span className='completed-header-text-color'>Order ID</span>
                                    </div>
                                    <div className='completed-table-row-item completed-table-order-2'>
                                        <span className='completed-header-text-color'>Customer Name</span>
                                    </div>
                                    <div className='completed-table-row-item completed-table-order-1'>
                                        <span className='completed-header-text-color'>Amount</span>
                                    </div>
                                    <div className='completed-table-row-item completed-table-order-1'>
                                        <span className='completed-header-text-color'>Status</span>
                                    </div>
                                    <div className='completed-table-row-item completed-table-order-1'>
                                        <span className='completed-header-text-color'>Action</span>
                                    </div>

                                </div>
                            </thead>

                            <tbody className='bordered'>
                            {invoiceList && invoiceList.length > 0 ? (
                            invoiceList.map((invoice, i) => (
                                    <div className='completed-table-row-container'>
                                        <div className='completed-table-row-item completed-table-order-1'>
                                            <div className='completed-table-text-color'>{invoice.invoice_no}</div>
                                        </div>

                                        <div className='completed-table-row-item completed-table-order-1'>
                                            <div className='completed-table-text-color'>{invoice.order_id}</div>
                                        </div>
                                        <div className='completed-table-row-item  completed-table-order-2'>
                                            <div className='table-text-color'>{invoice.buyer_name}</div>
                                        </div>
                                        <div className='completed-table-row-item completed-table-order-1'>
                                            <div className='completed-table-text-color'>{invoice.total_payable_amount} AED</div>
                                        </div>
                                        <div className='completed-table-row-item completed-table-order-1'>
                                            <div className='completed-table-text-color'>{invoice.status?.charAt(0).toUpperCase() + invoice?.status?.slice(1) }</div>
                                        </div>
                                        <div className='completed-table-row-item  completed-order-table-btn completed-table-order-1'>
                                            <Link to={`/supplier/invoice-design/${invoice.invoice_id}`}>
                                                <div className='completed-order-table completed-order-table-view '><RemoveRedEyeOutlinedIcon className="table-icon" /></div>
                                            </Link>
                                            <div className='invoice-details-button-column-download'>
                                                            <CloudDownloadOutlinedIcon className='invoice-view' />
                                                        </div>
                                        </div>
                                    </div>
                               ))
                            ) : (
                              
                                <div className='pending-products-no-orders'>
                                    No Pending Invoices Available
                                </div>
                               
                            )}
                            </tbody>
                        </Table>
                        <div className='completed-pagi-container'>
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={ordersPerPage}
                                totalItemsCount={totalInvoices || invoiceList.length}
                                pageRangeDisplayed={5}
                                onChange={handlePageChange}
                                itemClass="page-item"
                                linkClass="page-link"
                                prevPageText={<KeyboardDoubleArrowLeftIcon style={{ fontSize: '15px' }} />}
                                nextPageText={<KeyboardDoubleArrowRightIcon style={{ fontSize: '15px' }} />}
                                hideFirstLastPages={true}
                            />
                            <div className='completed-pagi-total'>
                                <div className='completed-pagi-total'>
                                    Total Items: {totalInvoices || invoiceList.length}
                                </div>
                            </div>
                        </div>
                        {
                            modal === true ? <OrderCancel setModal={setModal} orderId = {selectedOrderId} activeLink = {'completed'} /> : ''
                        }
                    </div>
                </div>
            </div>
       )}
        </>
    )
}

export default PendingInvoicesList







