import React, { useEffect, useState } from 'react';
import '../style/invoiceDesign.css'
import html2pdf from 'html2pdf.js';
import { useNavigate, useParams } from 'react-router-dom';
import { postRequestWithToken } from '../api/Requests';

function ProformaDetailsPage() {
    const { orderId } = useParams()
    const navigate    = useNavigate()

    const buyerIdSessionStorage = sessionStorage.getItem("buyer_id");
    const buyerIdLocalStorage   = localStorage.getItem("buyer_id");

    const [orderDetails, setOrderDetails] = useState()

    useEffect(() => {
        if (!buyerIdSessionStorage && !buyerIdLocalStorage) {
            navigate("/buyer/login");
            return;
        }
        const obj = {
            buyer_id   : buyerIdSessionStorage || buyerIdLocalStorage,
            order_id : orderId,
        }
        
        postRequestWithToken('order/order-details', obj, async (response) => {
            if (response.code === 200) {
                setOrderDetails(response.result)
            } else {
               console.log('error in buyer-order-details api',response);
            }
        })
    },[])

    const orderItems = orderDetails?.items?.map(item => ({
        ...item,
        unit_price: parseFloat(item.unit_price),
        unit_tax: parseFloat(item?.unit_tax || '0') ,
        total_amount: parseFloat(item.total_amount)
    })) || [];

    const totalAmount = orderItems.reduce((sum, item) => sum + item.total_amount, 0);
    const totalTaxAmount = orderItems.reduce((sum, item) => {
        const unitTaxRate     = parseFloat(item.unit_tax || '0') / 100;
        const itemTotalAmount = parseFloat(item.total_amount);
        return sum + (itemTotalAmount * unitTaxRate);
    }, 0);
    const grandTotal = totalAmount + totalTaxAmount;

    const handleDownload = () => {
        const element = document.getElementById('invoice-content');
        const options = {
            margin: 0.5,
            filename: 'invoice.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().from(element).set(options).save()
    };

    return (
        <div className='invoice-template-design'>
            <div className='scroll-wrapper'>
                <div className='invoice-template-download'>
                    <div className='invoice-template-button' onClick={handleDownload}>Download</div>
                </div>
                <div id='invoice-content'>
                    <div style={{ maxWidth: '800px', margin: 'auto auto 10rem', padding: '30px', border: '1px solid #eee', fontSize: '16px', lineHeight: '24px', color: '#555', backgroundColor: '#FFFFFF' }}>
                        <div style={{ textAlign: 'center', fontWeight: '500', fontSize: '30px', margin: '0px 0px 20px 0px' }}>Proforma Invoice</div>
                        <table style={{ fontSize: '12px' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px dotted #99a0ac' }}>
                                    <td style={{ display: 'flex', justifyContent: 'end' }}>
                                        <p style={{ fontSize: '16px', fontWeight: '500' }}>Invoice Number : </p>
                                        <p style={{ fontSize: '16px', fontWeight: '500' }}>&nbsp;{orderDetails?.invoice_no}</p>
                                    </td>
                                    <td style={{ display: 'flex', justifyContent: 'end' }}>
                                        <p style={{ fontSize: '16px', fontWeight: '500' }}>Payment Due date : </p>
                                        <p style={{ fontSize: '16px', fontWeight: '500' }}>&nbsp;{orderDetails?.payment_due_date}</p>
                                    </td>
                                    <td style={{ display: 'flex', justifyContent: 'end', paddingBottom: '10px' }}>
                                        <p style={{ fontSize: '15px', fontWeight: '500' }}>Invoice Generated Date : </p>
                                        <p style={{ fontSize: '15px', fontWeight: '500' }}>&nbsp;{orderDetails?.invoice_date}</p>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <table style={{ padding: '20px 16px', width: '100%', borderRadius: '12px', tableLayout: 'fixed', marginTop: '20px' }}>
                                            <tbody>
                                                <tr style={{ borderBottom: '1px dotted #99a0ac' }}>
                                                    <td style={{ verticalAlign: 'top', width: '60%', paddingRight: '20px', paddingBottom: '20px' }}>
                                                        <h1 style={{ fontSize: '14px', fontWeight: 500, paddingBottom: '3px' }}>From :</h1>
                                                        <p style={{ fontSize: '16px', fontWeight: 500, paddingBottom: '6px' }}>{orderDetails?.supplier_name}</p>
                                                        <p style={{ fontSize: '13px', lineHeight: '16px', color: '#99a0ac' }}>{orderDetails?.supplier_address}</p>
                                                        {/* <p style={{ fontSize: '13px', lineHeight: '16px', color: '#99a0ac', paddingTop: '6px' }}>United Arab Emirates</p> */}
                                                        <td style={{ display: 'flex', justifyContent: 'start' }}>
                                                            <p style={{ fontSize: '13px', lineHeight: '16px', color: '#99a0ac', paddingTop: '6px' }}>Mobile No. :</p>
                                                            <p style={{ fontSize: '13px', lineHeight: '16px', color: '#99a0ac', paddingTop: '6px' }}>&nbsp;{orderDetails?.supplier_mobile}</p>
                                                        </td>
                                                        <td style={{ display: 'flex', justifyContent: 'start' }}>
                                                            <p style={{ fontSize: '13px', lineHeight: '16px', color: '#99a0ac', paddingTop: '6px' }}>Email ID :</p>
                                                            <p style={{ fontSize: '13px', lineHeight: '16px', color: '#99a0ac', paddingTop: '6px' }}>&nbsp;{orderDetails?.supplier_email}</p>
                                                        </td>
                                                    </td>
                                                    <td style={{ verticalAlign: 'top', width: '40%', paddingBottom: '20px' }}>
                                                        <h1 style={{ fontSize: '14px', fontWeight: 500, paddingBottom: '3px', textAlign: 'end' }}>To :</h1>
                                                        <p style={{ fontSize: '16px', fontWeight: 500, paddingBottom: '6px', textAlign: 'end' }}>{orderDetails?.buyer_name}</p>
                                                        <p style={{ fontSize: '13px', lineHeight: '16px', color: '#99a0ac', lineHeight: '16px', textAlign: 'end' }}>{orderDetails?.buyer_address}</p>
                                                        {/* <p style={{ fontSize: '13px', color: '#99a0ac', lineHeight: '16px', textAlign: 'end', paddingTop: '6px' }}>Dubai (United Arab Emirates)</p> */}
                                                        <td style={{ display: 'flex', justifyContent: 'end' }}>
                                                            <p style={{ fontSize: '13px', lineHeight: '16px', color: '#99a0ac', paddingTop: '6px' }}>Mobile No. :</p>
                                                            <p style={{ fontSize: '13px', lineHeight: '16px', color: '#99a0ac', paddingTop: '6px' }}>&nbsp;{orderDetails?.buyer_mobile}9</p>
                                                        </td>
                                                        <td style={{ display: 'flex', justifyContent: 'end' }}>
                                                            <p style={{ fontSize: '13px', lineHeight: '16px', color: '#99a0ac', paddingTop: '6px' }}>Email ID :</p>
                                                            <p style={{ fontSize: '13px', lineHeight: '16px', color: '#99a0ac', paddingTop: '6px' }}>&nbsp; {orderDetails?.buyer_email}</p>
                                                        </td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="3">
                                                        <table style={{ width: '100%', borderSpacing: 0, }}>
                                                            <thead>
                                                                <tr style={{ textTransform: 'uppercase' }}>
                                                                    <td style={{ padding: '8px 0', fontWeight: 500, borderBottom: '1px dotted rgb(153, 160, 172)', width: '40px' }}>S.No</td>
                                                                    <td style={{ padding: '8px 0', fontWeight: 500, borderBottom: '1px dotted rgb(153, 160, 172)', width: '150px' }}>Name</td>
                                                                    <td style={{ padding: '8px 0', fontWeight: 500, borderBottom: '1px dotted rgb(153, 160, 172)', width: '40px' }}>Qty</td>
                                                                    <td style={{ padding: '8px 0', fontWeight: 500, borderBottom: '1px dotted rgb(153, 160, 172)', textAlign: 'end', width: '100px' }}>Price</td>
                                                                    <td style={{ padding: '8px 0', fontWeight: 500, borderBottom: '1px dotted rgb(153, 160, 172)', textAlign: 'end', width: '100px' }}>Tax%</td>
                                                                    <td style={{ padding: '8px 0', fontWeight: 500, borderBottom: '1px dotted rgb(153, 160, 172)', textAlign: 'end', width: '120px' }}>Total Amount</td>
                                                                </tr>
                                                            </thead>
                                                            {orderItems.map((item, index) => (
                                                            <tbody>
                                                            
                                                                <tr>
                                                                    <td style={{ paddingBlock: '12px', display: 'flex', alignItems: 'baseline' }}>
                                                                        <p style={{ fontWeight: 500, fontSize: '14px' }}>{index + 1}.</p>
                                                                    </td>
                                                                    <td style={{ paddingBlock: '12px' }}>
                                                                        <p style={{ fontWeight: 500, fontSize: '14px' }}>{item.medicine_name} ({item?.medicine_details?.strength || '150mg'})</p>
                                                                    </td>
                                                                    <td style={{ paddingBlock: '12px' }}>
                                                                        <p style={{ fontWeight: 500, fontSize: '13px' }}>{item.quantity_required}</p>
                                                                    </td>
                                                                    <td style={{ paddingBlock: '12px', textAlign: 'end' }}>
                                                                        <p style={{ fontWeight: 500, fontSize: '13px' }}>{item.unit_price.toFixed(2)} AED</p>
                                                                    </td>
                                                                    <td style={{ paddingBlock: '12px', textAlign: 'end' }}>
                                                                        <p style={{ fontWeight: 500, fontSize: '13px' }}>{item.unit_tax}%</p>
                                                                    </td>
                                                                    <td style={{ paddingBlock: '12px', textAlign: 'end' }}>
                                                                        <p style={{ fontWeight: 500, fontSize: '13px' }}>{item.total_amount.toFixed(2)} AED </p>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        ))}
                                                        </table>
                                                        <table>
                                                            <tbody style={{ borderTop: '1px dotted rgb(153, 160, 172)', borderBottom: '1px dotted rgb(153, 160, 172)' }}>
                                                                <tr>
                                                                    <td style={{ width: '750px' }} >
                                                                        <table style={{ width: '100%', borderSpacing: 0, }}>
                                                                            <tbody>
                                                                                {/* <tr style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', columnGap: '10px', marginTop: '8px' }}>
                                                                                    <p style={{ textAlign: 'end', fontSize: '14px', fontWeight: '500' }}>Subtotal :</p>
                                                                                    <p style={{ textAlign: 'end', fontWeight: '500', fontSize: '14px', width: '150px' }}>{totalAmount.toFixed(2)} AED</p>
                                                                                </tr>
                                                                                <tr style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', columnGap: '10px', paddingTop: '8px' }}>
                                                                                    <p style={{ textAlign: 'end', fontSize: '14px', fontWeight: '500' }}>Tax % :</p>
                                                                                    <p style={{ textAlign: 'end', fontWeight: '500', fontSize: '14px', width: '150px' }}>{totalTaxAmount.toFixed(2)} </p>
                                                                                </tr> */}
                                                                                <tr style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', columnGap: '10px', paddingTop: '6px' }}>
                                                                                    <p style={{ textAlign: 'end', fontSize: '14px', fontWeight: '500', paddingBottom: '10px' }}>Grand Total  :</p>
                                                                                    <p style={{ textAlign: 'end', fontWeight: '500', fontSize: '14px', paddingBottom: '10px', width: '150px' }}>{totalAmount.toFixed(2)} AED</p>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>

                                                                </tr>
                                                            </tbody>

                                                            <tbody style={{ borderTop: '1px dotted rgb(153, 160, 172)', borderBottom: '1px dotted rgb(153, 160, 172)' }}>
                                                                <tr>
                                                                    <td style={{ width: '750px' }} >
                                                                        <table style={{ width: '100%', borderSpacing: 0, }}>
                                                                            <tbody>
                                                                                <tr style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', columnGap: '10px', marginTop: '8px' }}>
                                                                                    <p style={{ textAlign: 'end', fontSize: '14px', fontWeight: '500' }}>Deposit Requested :</p>
                                                                                    <p style={{ textAlign: 'end', fontWeight: '500', fontSize: '14px', width: '100px' }}>{orderDetails?.deposit_requested} AED</p>
                                                                                </tr>
                                                                                <tr style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', columnGap: '10px', paddingTop: '8px' }}>
                                                                                    <p style={{ textAlign: 'end', fontSize: '14px', fontWeight: '500' }}>Deposit Due :</p>
                                                                                    <p style={{ textAlign: 'end', fontWeight: '500', fontSize: '14px', width: '100px' }}>{orderDetails?.deposit_due} AED</p>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>

                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tbody style={{ width: '100%', borderBottom: '1px dotted rgb(153, 160, 172)' }}>
                                    <tr>
                                        <td style={{ verticalAlign: 'top', width: '100vw', paddingRight: '20px', paddingBottom: '20px' }}>
                                            <h1 style={{ fontSize: '16px', fontWeight: '500', marginTop: '16px' }}>Payment Terms :</h1>
                                            <div style={{ fontSize: '13px', lineHeight: '20px', marginTop: '4px', color: '#99a0ac' }}>
                                            {
                                                orderDetails?.enquiry?.payment_terms?.map((data, i) => {
                                                    return (
                                                <p style={{ position: 'relative', paddingLeft: '20px' }}>
                                                    <span style={{ position: 'absolute', left: '0', top: '0', fontSize: '22px' }}>•</span>
                                                    {data || '50% advance'}
                                                </p>
                                                 )
                                                })
                                            }
                                                
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>

                            </tfoot>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProformaDetailsPage;



