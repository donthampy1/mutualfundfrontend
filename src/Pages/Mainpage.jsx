import React, { useState , useEffect } from "react"
import CustomSelect from "../components/Custom"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'



const Mainpage = () => {
  const [ selectedfund, setSelectedFund ] = useState('')
  const [ settypes, setSelectTypes ] = useState('')
  const [ setoptions, setOptions ] = useState('')
  const [ data, setData ] = useState(null)
  const [ loading, setLoading ] = useState(false)
  const [ schemData, setSchemedata ] = useState([])
  const [ option, setOptionData ] = useState({})
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ storeJsonData, setstoreJsonData ] = useState(null)
  const [ storeJson, setStoreJson ] = useState(null)
  const navigate = useNavigate()
  
 
  const handleExplore = async () => {
    if (!selectedfund || !settypes || !setoptions) {
      console.warn('Please select all filters before exploring.')
      alert('Please select all required filters before exploring.');
      return
    }
    setLoading(true)
    try {
    const response = await axios.get(`http://dev.mf.ones.money/api/ms/bo/amcs/${mutualfund[selectedfund]}/types/${settypes}/gdos/${option[setoptions]}/schemes?pageNo=0&pageSize=10&sortBy=schemeName&direction=ASC`)
    setData(response.data.userProducts)
    setLoading(false)
    setstoreJsonData(response.data.userProducts)
    console.log(response.data)


    const jsonpagedata = {
      currentPage: response.data.currentPage + 1,
      start: response.data.currentPage * 10 + 1,
      end:  response.data.currentPage * 10 + response.data.userProducts.length,
      totalentries: response.data.totalElements,
      totalPagesArray: Array.from({ length: response.data.totalPages },(_,index) => index+1 )
    }
    console.log(jsonpagedata)
    setStoreJson(jsonpagedata)

    } catch (error) {
      console.log(error)
      alert('Failed to fetch data. Please try again later.');
      setData([])
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    Cookies.remove('klogin', { path: '/' })
        navigate('/')  

  }
  const handleSortDescend = () => {
    const sortedProductsDescend = [...data].sort((a, b) => b.minimumPurchaseAmount - a.minimumPurchaseAmount)
    setData(sortedProductsDescend)
  }
  const handleSortAscend = () => {
    const sortedProductsAescend = [...data.sort((a,b) => a.minimumPurchaseAmount - b.minimumPurchaseAmount)]
    setData(sortedProductsAescend)
  }
  const handleSearch = () => {
    if (!searchTerm) {
      setData(storeJsonData)
      return
    }
    
    const searchData = [...data].filter((item) => item.schemeName.toLowerCase().includes(searchTerm))
    if (searchData.length === 0) {
      setData(storeJsonData);
    } else {
      setData(searchData)
    }

  }

  const onPageChange = async (pagenumber) => {
    console.log(pagenumber)
    
    setLoading(true);
    try{

    const response = await axios.get(`http://dev.mf.ones.money/api/ms/bo/amcs/${mutualfund[selectedfund]}/types/${settypes}/gdos/${option[setoptions]}/schemes?pageNo=${pagenumber}&pageSize=10&sortBy=schemeName&direction=ASC`)
    console.log(response.data)
    
    setLoading(false)
    setData(response.data.userProducts)
    setstoreJsonData(response.data.userProducts)


    const jsonpagedata = {
      currentPage: response.data.currentPage + 1,
      start: response.data.currentPage * 10 + 1,
      end:  response.data.currentPage * 10 + response.data.userProducts.length,
      totalentries: response.data.totalElements,
      totalPagesArray: Array.from({ length: response.data.totalPages },(_,index) => index+1 )
    }
    console.log(jsonpagedata)
    setStoreJson(jsonpagedata)
    window.scrollTo({ top: 0, behavior: 'smooth' })

  }catch(error){
    console.error('Error fetching page data:', error);

    alert('Failed to fetch data. Please try again later.');

    setData([])
  }finally {
    setLoading(false)
  }
  }

  const mutualfund = {
    '360 ONE MUTUAL FUND': '360_ONE_MUTUALFUND_MF',
    'BANDHAN MUTUAL FUND': 'BANDHANMUTUALFUND_MF',
    'BANK OF INDIA MUTUAL FUND': 'BANKOFINDIAMUTUALFUND_MF',
    'BIRLA SUNLIFE MUTUAL FUND': 'BirlaSunLifeMutualFund_MF',
    'CANARA ROBECO MUTUAL FUND' : 'CANARAROBECOMUTUALFUND_MF',
    'DSP MUTUAL FUND' : 'DSP_MF',
    'EDELWEISS MUTUAL FUND' : 'EDELWEISSMUTUALFUND_MF',
    'FRANKLIN TEMPLETON MUTUAL FUND' : 'FRANKLINTEMPLETON',
    'HDFC MUTUAL FUND' : 'HDFCMutualFund_MF',
    'HSBC MUTUAL FUND' : 'HSBCMUTUALFUND_MF',
    'ICICI MUTUAL FUND' : 'ICICIPrudentialMutualFund_MF',
    'ITI MUTUAL FUND' : 'ITI%20MUTUAL%20FUND_MF',
  }

  const typeN = [
    ['DEBT', 'EQUITY', 'HYBRID (NC)', 'LIQUID'],
    ['DEBT', 'ELSS', 'EQUITY', 'FOF', 'HYBRID (C)', 'HYBRID (NC)', 'LIQUID'],
    ['DEBT', 'ELSS', 'EQUITY', 'HYBRID (C)', 'LIQUID'],
    ['DEBT', 'ELSS', 'EQUITY', 'FOF', 'LIQUID'],
    ['DEBT', 'ELSS', 'EQUITY', 'HYBRID (C)', 'HYBRID (NC)', 'LIQUID'],
    ['DEBT', 'ELSS', 'EQUITY', 'FOF', 'GILT', 'HYBRID (C)', 'LIQUID'],
    ['DEBT', 'ELSS', 'EQUITY', 'FOF', 'GILT', 'HYBRID (C)', 'HYBRID (NC)', 'LIQUID'],



  ]

  const optionN = [
    {
    'DIVIDEND PAYOUT': 'N',
    'DIVIDEND REINVESTMENT': 'Y',
    'GROWTH': 'Z'
    },
    {
    'DIVIDEND PAYOUT': 'N',
    'GROWTH': 'Z'
    }
  ]

  useEffect(() => {
    const fundList0 = ['360 ONE MUTUAL FUND']
    const fundList1 = ['BANDHAN MUTUAL FUND']
    if(fundList0.includes(selectedfund)){
      setSchemedata(typeN[0])
      setSelectTypes('')
      setOptions('')
    }else if (fundList1.includes(selectedfund)){
      setSchemedata(typeN[1])
      setSelectTypes('')
      setOptions('')
    }
    
  }, [selectedfund])

  useEffect(() => {
    if(settypes == 'ELSS'){
      setOptionData(optionN[1])
      setOptions('')
    }else {
      setOptionData(optionN[0])
      setOptions('')
    }
  
    
  }, [settypes])
  




  return (
    <div>
      
      <div className="">
        
    <div className=" flex p-10 justify-around items-center ">
     
      <div className="flex gap-5  justify-between items-center w-4/5">
      <CustomSelect  options={Object.keys(mutualfund)} onOptionselect={(option) => setSelectedFund(option)} displayData={selectedfund} category ={'MUTUAL FUND'} disabled={false} width={'w-2/5'}/>

      <CustomSelect options={schemData} onOptionselect={(option) => setSelectTypes(option)} category ={'SCHEME TYPES'} width={'w-1/5'} displayData={settypes} disabled={!selectedfund}/>

      <CustomSelect options={Object.keys(option)} onOptionselect={(option)=> setOptions(option)} category={'OPTIONS'} width={'w-1/5'} displayData={setoptions} disabled={!settypes}/>

      </div>
      <button onClick={handleExplore}
  type="button"
  className="  rounded-lg p-3 transition duration-300 ease-in-out bg-black text-white hover:bg-white hover:text-black  focus:outline-none focus:ring-2 focus:ring-black"
>
  Explore
</button>
</div>

    </div>
    <div className="flex justify-end">
      <div className="pr-700 ">
      <input placeholder="Search..."  onChange={(event)=> setSearchTerm(event.target.value)} className='border-2 border-black rounded-lg p-2 font-thin text-sm w-48 text-left bg-white text-gray-500 mr-5'></input>
      <button  type="button" onClick={handleSearch}
  className=" p-3 rounded-lg mb-5 mr-5 transition duration-300 ease-in-out bg-black text-white hover:bg-white hover:text-black  focus:outline-none focus:ring-2 focus:ring-black">search</button>
  </div>

    </div>
    <div className="w-full p-4">
      <div className=" border-b-gray-300  flex justify-center items-center  rounded-lg">
        {/* Table Header */}
        <div className="flex  items-center w-2/3   font font-bold font text-xs border-b border-gray-300 py-2 px-4  text-gray-400">
          <p className="w-2/3">SCHEME NAME </p>
          <div className="flex w-1/5  justify-center  items-center">
            <div className="flex flex-col   cursor-pointer">
              <span  className="  opacity-60 hover:opacity-100"  onClick={handleSortDescend} >&#9650;</span>
              <span  className="  opacity-60 hover:opacity-100" onClick={handleSortAscend} >&#9660;</span> 
            </div>
            <p className="w-full  text-center">MINIMUM AMOUNT</p>
          </div>
          <p className="w-1/4 text-center">ACTIONS</p>
        </div> 
        </div>
        {/* Table Rows */}

        {/* Spinner */}
    {loading && (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300  border-b-black ">
        </div>
      </div>
    )}
    <div className="flex flex-col justify-center items-center">  

    
    {!loading && data && data.length > 0 && (
  data.map((item, index) => {
    const [part1, part2] = item.schemeName.split('-', 2); 
    return (
      <div
        key={index}
        className="flex  justify-center items-center w-2/3  border-b last:border-b-0 border-gray-300 py-2 px-4"
      >
        <div className="w-2/3 ">
        <p className="text-gray-800 font-medium">
          {part1} 
        </p>
        <p className="font-light">{part2}</p>
        </div>
        <div className="w-1/4 items-center flex justify-center text-gray-700">
          <div className="w-1/4 items-center flex justify-start text-gray-700">
            ₹ <p className="ml-1">{item.minimumPurchaseAmount}.00</p>
          </div>
        </div>
        <div onClick={() => navigate(`/details/${item.uniqueNo}`)} className="w-1/4 text-center hover:scale-110 hover:transition font-semibold  text-pink-900">
          Details
        </div>
      </div>
    )
  })
)}

        </div>
        
        
      </div>
      
      {!loading && data && data.length > 0 && (
  <div className="flex justify-around font-light text-xl text-gray-500 ">
   
      <p className="mr-20  pt-4">
        Showing {storeJson.start} to {storeJson.end} of {storeJson.totalentries} entries
      </p>
      <div className="flex flex-row">
      {storeJson.totalPagesArray.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`w-10 h-10 rounded-full flex  items-center justify-center mx-1 text-white ${
            storeJson.currentPage === pageNumber
              ? 'bg-black' 
              : 'bg-gray-300 hover:bg-gray-400' 
          }`}
          onClick={() => onPageChange(pageNumber - 1)} 
        >
          {pageNumber}
        </button>
      ))}
      </div>
   
  </div>
)}



<div className="flex mt-5 justify-around">
<button onClick={handleLogout}
  type="button"
  className=" p-3  rounded-lg mb-5 transition duration-300 ease-in-out bg-black text-white hover:bg-white hover:text-black  focus:outline-none focus:ring-2 focus:ring-black" >
  Logout
</button>

</div>
    </div>

   
  )
}

export default Mainpage
