import React ,{ useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import axios from 'axios'
import ChartComponent from '../components/ChartComponent'
import DonutChartComponent from '../components/DonutChart'


const DetailsPage = () => {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [currdata, setCurrData] = useState(null)
  const [holdhistorydata, sethistoryData] = useState(null)
  const [transferdata, setTransferData] = useState(null)
  const [tabledata, setTabledata] =useState(null)
  const [time, setTime] = useState('MAX')
  const[CAGR, setCAGR] = useState(null)


  useEffect(() => {
    const handleExplore = async () => {
    
        try {
        const response = await axios.get(`https://dev.mf.ones.money/api/ms/bo/schemes/${id}?type=undefined&type=SIP&type=undefined`)
          setData(response.data)
          setTabledata(response.data.schemeDetails.portfolioBeanList)


          const listn = response.data.schemeDetails.portfolioBeanList
          const cagrData = (listn[0].value / listn[listn.length - 1]) - 1

          if (response.data?.schemeDetails?.isin) {
            const liveDataResponse = await axios.get(`https://dev.mf.ones.money/api/ms/bo/navs/${response.data.schemeDetails.isin}`)
            setCurrData(liveDataResponse.data)

            
            const history = await axios.get(`https://dev.mf.ones.money/api/ms/bo/navs/${response.data.schemeDetails.isin}/history`)
            sethistoryData(history.data) 
            
          const cagrData = (history.data[0].value / history.data[history.data.length - 1].value) - 1
          setCAGR(cagrData.toFixed())
          setTime('MAX')

          } else {
            console.log('ISIN not found in scheme details')
          }

    
        } catch (error) {
          console.log(error)
          alert('Failed to fetch data. Please try again later.');
        } 
      }
  handleExplore()
  

    
  }, [])


  useEffect(() => {
    if (holdhistorydata) {
     
      setTransferData(holdhistorydata)
    }
  }, [holdhistorydata])

  const totalInvestment = Math.floor(data?.schemeDetails.portfolioBeanList?.reduce((sum, item) => sum + (item.investment || 0), 0))


  const handleMax = () => {
    setTransferData(holdhistorydata)
    const cagrData = (holdhistorydata[0].value / holdhistorydata[holdhistorydata.length - 1].value) - 1
        console.log(cagrData)
          setCAGR(cagrData.toFixed(3))
          setTime('MAX ')
  }


    
        
  

  const handle3M = () => {
    const currentDate = new Date();
    const threeMonthsAgo = new Date(currentDate.setMonth(currentDate.getMonth() - 3));
  
    const filteredData = holdhistorydata.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= threeMonthsAgo;
    }); 

    setTransferData(filteredData)
    const cagrData = (filteredData[0].value / filteredData[filteredData.length - 1].value) - 1

          setCAGR(cagrData.toFixed(3))
          setTime('3 M ')
   }
  const handle6M = () => {
    const currentDate = new Date();
    const threeMonthsAgo = new Date(currentDate.setMonth(currentDate.getMonth() - 6));
  
    const filteredData = holdhistorydata.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= threeMonthsAgo;
    }); 

    setTransferData(filteredData)
    const cagrData = (filteredData[0].value / filteredData[filteredData.length - 1].value) - 1

          setCAGR(cagrData.toFixed(3))
          setTime('6 M ')

  }
  const handle1Y = () => {
    const currentDate = new Date();
    const threeMonthsAgo = new Date(currentDate.setMonth(currentDate.getMonth() - 12));
  
    const filteredData = holdhistorydata.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= threeMonthsAgo;
      
    }); 

    setTransferData(filteredData)
    const cagrData = (filteredData[0].value / filteredData[filteredData.length - 1].value) - 1
        console.log(cagrData)
          setCAGR(cagrData.toFixed(3))
          setTime('1 Y ')

  }
  const handle2Y = () => {
    const currentDate = new Date();
    const threeMonthsAgo = new Date(currentDate.setMonth(currentDate.getMonth() - 24));
  
    const filteredData = holdhistorydata.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= threeMonthsAgo;
    }); 

    setTransferData(filteredData)
    const cagrData = (filteredData[0].value / filteredData[filteredData.length - 1].value) - 1
    console.log(cagrData)
      setCAGR(cagrData.toFixed(3))
      setTime('2 Y ')
  }

  const handle3Y = () => {
    const currentDate = new Date();
    const threeMonthsAgo = new Date(currentDate.setMonth(currentDate.getMonth() - 36));
  
    const filteredData = holdhistorydata.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= threeMonthsAgo;
    }); 

    setTransferData(filteredData)
    const cagrData = (filteredData[0].value / filteredData[filteredData.length - 1].value) - 1
        console.log(cagrData)
          setCAGR(cagrData.toFixed(3))
          setTime('3 Y ')

  }





  const formatDate = (dateString) => {

    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const monthName = months[date.getMonth()]
    const year = date.getFullYear()
    return `${day}-${monthName}-${year}`

  }

  return (
<div>
    <div className=' min-h-screen  p-7 pt-20'>
        <div className=' rounded-3xl flex flex-col  shadow-2xl '>
        <div className='h-2/3 p-3 rounded-3xl '>
            <div className='flex'>
            <div className=" w-12 h-12 mr-5 rounded-full bg-gradient-to-r from-blue-500 to-green-500 aspect-square">
            </div>
            <div>
                <p className='font-semibold text-lg'>{data?.schemeName}</p>
                <p className='font-thin text-xs'>{data?.schemeDetails?.category}</p>
            </div >
            
            </div>
            <div className='h-1/3 p-3'>
                {data?.schemeDetails?.objective}
            </div>

            
            </div>
            <div className='h-1/3 p-3 flex justify-end gap-4 border border-t-gray-100 '>
                 <button className='bg-black text-sm text-white rounded-md hover:scale-110 transition pl-5 pr-5'  >SIP</button>
                 <button className='bg-black text-sm text-white rounded-md hover:scale-110 transition  pl-5 pr-5 p-1'  >BUY</button>
            </div>


        </div>
        <div className=' mt-7  rounded-3xl flex flex-col md:flex-row  shadow-2xl '>
            
            <div className=' flex-1 p-4'>
                <div className=''>
                    <p className='m-2  mb-0'>Current NAV</p>
                    <h5 className='ml-2 text-xl font-bold'>{currdata?.navValue}</h5>
                    <h5 className='font-semibold text-xs text-gray-400 '>
                        Last Updated on:
                        <span className='ml-2'>{currdata?.lastModifiedDate ? formatDate(currdata.lastModifiedDate) : ''}</span>
                    </h5>
                </div>
                
                
            </div>
            <div className=' flex-1 '>
            <div class="grid grid-cols-1  p-5 gap-4 md:grid-cols-2">
            <div
  className={`bg-gradient-to-r p-4 rounded-lg ${
    data?.schemeDetails.riskometerLaunch === 'Moderate'
      ? 'from-orange-400 to-orange-600' // Moderate: orange to dark orange
      : data?.schemeDetails.riskometerLaunch === 'Low'
      ? 'from-green-400 to-green-600' // Low: green shades
      : data?.schemeDetails.riskometerLaunch === 'High'
      ? 'from-red-400 to-red-600' // High: red shades
      : 'from-gray-400 to-gray-600' // Default for any other values
  }`}> <div>
    <p className='text-white'>Riskometer</p>
    <h5 className='text-white font-bold'>{data?.schemeDetails.riskometerLaunch}</h5>
  </div>
            </div>     
            <div
  className={`bg-gradient-to-r p-4 rounded-lg ${
    data?.minimumPurchaseAmount === 'Moderate'
      ? 'from-orange-400 to-orange-600' // Moderate: orange to dark orange
      : data?.minimumPurchaseAmount === 1000
      ? 'from-green-400 to-green-600' // Low: green shades
      : data?.minimumPurchaseAmount === 'High'
      ? 'from-red-400 to-red-600' // High: red shades
      : 'from-gray-400 to-gray-600' // Default for any other values
  }`}> <div>
    <p className='text-white'>AUM</p>
    <h5 className='text-white font-bold'>{totalInvestment}.00 Cr.</h5>
  </div>
            </div> 
            <div
  className='bg-gradient-to-r p-4 rounded-lg 
      from-gray-400 to-gray-600'> <div>
    <p className='text-white'>CAGR ({time})</p>
    <h5 className='text-white font-bold'>{CAGR}%</h5>
  </div>
            </div>  <div
  className='bg-gradient-to-r p-4 rounded-lg from-gray-400 to-gray-600'> <div>
    <p className='text-white'>Min. Investment</p>
    <h5 className='text-white font-bold'>{data?.minimumPurchaseAmount}.00 Rs</h5>
  </div>
            </div> 
             </div>
             </div>

        </div>
        <div className='mt-7 bg-transparent  rounded-3xl flex flex-col md:flex-row  '> 
<div className=' flex-1 m-5 rounded-3xl  shadow-2xl  '>
<div className=' flex flex-row '>
  <div className='sm:w-1/2 flex w-1/3 justify-start items-center ml-2 font-semibold'>
  Nav History
  </div>
<div className=' sm:w-1/2 p-5 w-2/3 flex justify-center items-center gap-3 '>
<div className='bg-gray-600 p-3 flex gap-2 rounded-lg'>
  <button onClick={handle3M} className="bg-black text-white font-semibold text-xs p-1 hover:text-black rounded-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">3M</button>
  <button onClick={handle6M} className="bg-black text-white font-semibold text-sm p-1 hover:text-black rounded-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">6M</button>
  <button onClick={handle1Y} className="bg-black text-white font-semibold text-sm p-1 hover:text-black rounded-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">1Y</button>
  <button onClick={handle2Y} className="bg-black text-white font-semibold text-sm p-1 hover:text-black rounded-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">2Y</button>
  <button onClick={handle3Y} className="bg-black text-white font-semibold text-sm p-1 hover:text-black rounded-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">3Y</button>
  <button onClick={handleMax}  className="bg-black text-white font-semibold text-sm p-1 hover:text-black rounded-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">MAX</button>
  </div>
  </div>
  
  
</div>
<div className='w-full h-full p-5'>
  <ChartComponent data={transferdata}/>
</div>
</div>
<div className='flex-1 m-5 shadow-2xl rounded-3xl'>
  <div className='w-full flex  p-5 pl-3 justify-start items-center ml-2 font-semibold'>
    Sector Allocation
  </div>
  <div className='w-full h-full  flex justify-center items-center]'>
    <DonutChartComponent data={data?.schemeDetails.portfolioBeanList}/>
  </div>

</div>
<div>

</div>
        </div>
        <div className='rounded-3xl  flex md:flex-row flex-col shadow-2xl gap-4'>
          <div className=' md:w-1/3 w-full flex justify-center items-center  flex-col p-5  rounded-3xl'>
          <img src={data?.amcDetails.amcImgUrl}></img>
          </div>
          <div className=' md:w-1/3  w-full flex flex-col justify-center items-center p-8 rounded-3xl'>
  <p className=' font-md text-lg mb-2'>Fund Managers</p>
  <h5 className=' font-bold text-md'>{data?.schemeDetails.fundManager || 'No Data Available'}</h5>
</div>

          <div className=' md:w-1/3 w-full flex justify-around items-center rounded-3xl'>
          <button className='font-semibold'>Scheme Documents</button>
          <button className='font-semibold'>Disclaimer</button>
          </div>
        </div>
        <div className=' mt-7'>
          <div className='font-bold bg-white p-3 pl-7 text-lg'>
              Scheme Holdings
          </div>
          <div className="overflow-x-auto">
  <table className="table-auto w-full border-collapse border border-gray-300">
    <thead className="bg-gray-200">
      <tr>
        <th className="border border-gray-300 px-4 py-2 text-left">Company</th>
        <th className="border border-gray-300 px-4 py-2 text-left">Allocation</th>
        <th className="border border-gray-300 px-4 py-2 text-left">Sector</th>
        <th className="border border-gray-300 px-4 py-2 text-left">Asset Class</th>
        <th className="border border-gray-300 px-4 py-2 text-left">Other</th>
        <th className="border border-gray-300 px-4 py-2 text-left">Rating</th>
      </tr>
    </thead>
    <tbody>
      {tabledata && tabledata.length > 0 ? (
        tabledata.map((item, index) => (
          <tr key={index} className="hover:bg-gray-100">
            <td className="border border-gray-300 px-4 py-2">{item.instrumentName || 'N/A'}</td>
            <td className="border border-gray-300 px-4 py-2">{item.allocation ? item.allocation.toFixed(2) : 'N/A'}</td>
            <td className="border border-gray-300 px-4 py-2">{item.sector || 'N/A'}</td>
            <td className="border border-gray-300 px-4 py-2">{item.assetClass || 'N/A'}</td>
            <td className="border border-gray-300 px-4 py-2">{item.other || 'N/A'}</td>
            <td className="border border-gray-300 px-4 py-2">{item.rating || 'N/A'}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="6" className="border border-gray-300 px-4 py-2 text-center">
            No Data Available
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>






        </div>

    </div>

    </div>  )
}

export default DetailsPage