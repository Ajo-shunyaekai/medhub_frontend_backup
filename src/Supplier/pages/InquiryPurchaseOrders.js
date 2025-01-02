import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../style/inquirypurchaseorder.css';
import order_list from '../assest/dashboard/order_list.svg';
import OnGoingOrder from './inquiry/OnGoingOrder';
import PurchasedOrder from './inquiry/PurchasedOrder'
import { postRequestWithToken } from '../api/Requests';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { apiRequests } from '../../api';


const InquiryPurchaseOrder = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [inquiryList, setInquiryList]       = useState([])
    const [totalInquiries, setTotalInquiries] = useState()
    const [currentPage, setCurrentPage]       = useState(1); 
    const inquiryPerPage = 5;

    const [poList, setPOList]           = useState([])
    const [totalPoList, setTotalPoList] = useState()

    const getActiveLinkFromPath = (path) => {
        switch (path) {
            case '/supplier/inquiry-purchase-orders/ongoing':
                return 'ongoing';
            case '/supplier/inquiry-purchase-orders/purchased':
                return 'purchased';
            default:
                return 'ongoing';
        }
    };

    const activeLink = getActiveLinkFromPath(location.pathname);

    const handleLinkClick = (link) => {
        setCurrentPage(1)
        switch (link) {
            case 'ongoing':
                navigate('/supplier/inquiry-purchase-orders/ongoing');
                break;
            case 'purchased':
                navigate('/supplier/inquiry-purchase-orders/purchased');
                break;
            default:
                navigate('/supplier/inquiry-purchase-orders/ongoing');
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const fetchData = async ()=>{const supplierIdSessionStorage = sessionStorage.getItem("supplier_id");
        const supplierIdLocalStorage   = localStorage.getItem("supplier_id");

        if (!supplierIdSessionStorage && !supplierIdLocalStorage) {
            navigate("/supplier/login");
            return;
        }
        const status = activeLink === 'ongoing' ? 'pending' : 'completed'
        const obj = {
            supplier_id : supplierIdSessionStorage || supplierIdLocalStorage,
            status      : status,
            pageNo      : currentPage, 
            pageSize    : inquiryPerPage,
            user_type   : 'Supplier'
        }

        // postRequestWithToken('supplier/enquiry/enquiry-list', obj, async (response) => {
        //     if (response.code === 200) {
        //         setInquiryList(response.result.data)
        //         setTotalInquiries(response.result.totalItems)
        //     } else {
        //         toast(response.message, {type:'error'})
        //        console.log('error in order list api',response);
        //     }
        //     setLoading(false);
        // })
                            
        try {
            // const response = await  apiRequests.postRequest('enquiry/get-enquiry-list-all-users', obj)
            // if (response.code === 200) {
            //     setInquiryList(response.result.data)
            //     setTotalInquiries(response.result.totalItems)
            // }
            postRequestWithToken('enquiry/get-enquiry-list-all-users', obj, async (response) => {
                if (response.code == 200) {
                    setInquiryList(response.result.data)
                    setTotalInquiries(response.result.totalItems)
                }
            })     
        } catch (error) {
            console.log('Error fetching inquiry list', error);
        } finally{
            setLoading(false);
        }
        if (activeLink === 'purchased') {
            obj.status = 'active'
            postRequestWithToken('supplier/purchaseorder/get-po-list', obj, async (response) => {
                if (response.code === 200) {
                    setPOList(response.result.data)
                    setTotalPoList(response.result.totalItems)
                } else {
                    toast(response.message, {type:'error'})
                    console.log('error in purchased order list api', response);
                }
                setLoading(false);
            });
        } 
    }

    useEffect(() => {
        fetchData()
    },[activeLink, currentPage])

    return (
        <>
            {loading ? (
                <Loader />
        ) : (
            <div className='inquiry-purchase-main-container'>
                <div className="inquiry-purchase-name">
                    Inquiry & Purchased Orders
                </div>
                <div className="inquiry-purchase-container">
                    <div className="inquiry-purchase-container-left">
                        <div
                            onClick={() => handleLinkClick('ongoing')}
                            className={activeLink === 'ongoing' ? 'active inquiry-purchase-left-wrapper' : 'inquiry-purchase-left-wrapper'}
                        >
                            <img src={order_list} alt="inquiry-purchase icon" />
                            <div>Inquiry Request</div>
                        </div>
                        <div
                            onClick={() => handleLinkClick('purchased')}
                            className={activeLink === 'purchased' ? 'active inquiry-purchase-left-wrapper' : 'inquiry-purchase-left-wrapper'}
                        >
                            <img src={order_list} alt="inquiry-purchase icon" />
                            <div>Purchased Orders</div>
                        </div>
                    </div>
                    <div className="inquiry-purchase-container-right">
                        <div responsive="xl" className='inquiry-purchase-table-responsive'>
                            {activeLink === 'ongoing' &&
                            <OnGoingOrder
                                inquiryList       = {inquiryList} 
                                totalInquiries    = {totalInquiries} 
                                currentPage       = {currentPage}
                                inquiryPerPage    = {inquiryPerPage}
                                handlePageChange  = {handlePageChange}
                                activeLink        = {activeLink}
                            />}
                            {activeLink === 'purchased' && 
                            <PurchasedOrder
                                poList           = {poList}
                                totalPoList      = {totalPoList} 
                                currentPage      = {currentPage}
                                inquiryPerPage   = {inquiryPerPage}
                                handlePageChange = {handlePageChange}
                                activeLink       = {activeLink}
                            />}
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>
    );
}

export default InquiryPurchaseOrder;