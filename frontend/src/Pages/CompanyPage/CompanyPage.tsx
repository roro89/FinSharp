import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CompanyProfile } from '../../company';
import { getCompanyProfile } from '../../api';

interface Props {}

const CompanyPage = (props: Props) => {
  let { ticker } = useParams();
  const [company, setCompany] = useState<CompanyProfile>();

  useEffect(()=>{
    const getProfileInit = async () =>{
      const result = await getCompanyProfile(ticker!);
      setCompany(result?.data[0]);
    }
    getProfileInit();
  }, [])
  return <>
  {company ? (
    <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
    <nav className="block py-4 px-6 top-0 bottom-0 w-64 bg-white shadow-xl left-0 absolute flex-row flex-nowrap md:z-10 z-9999 transition-all duration-300 ease-in-out transform md:translate-x-0 -translate-x-full">
      <button className="md:hidden flex items-center justify-center cursor-pointer text-blueGray-700 w-6 h-10 border-l-0 border-r border-t border-b border-solid border-blueGray-100 text-xl leading-none bg-white rounded-r border border-solid border-transparent absolute top-1/2 -right-24-px focus:outline-none z-9998">
        <i className="fas fa-ellipsis-v"></i>
      </button>
      <div className="flex-col min-h-full px-0 flex flex-wrap items-center justify-between w-full mx-auto overflow-y-auto overflow-x-hidden">
        <div className="flex bg-white flex-col items-stretch opacity-100 relative mt-4 overflow-y-auto overflow-x-hidden h-auto z-40 items-center flex-1 rounded w-full">
          <div className="md:flex-col md:min-w-full flex flex-col list-none">
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Home
            </h6>
          </div>
        </div>
      </div>
    </nav>
    <div className="relative md:ml-64 bg-blueGray-100 w-full">
      <div className="relative pt-20 pb-32 bg-lightBlue-500">
        <div className="px-4 md:px-6 mx-auto w-full">
          <div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                          Traffic
                        </h5>
                        <span className="font-bold text-xl">350,897</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                          NEW USERS
                        </h5>
                        <span className="font-bold text-xl">2,356</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                          SALES
                        </h5>
                        <span className="font-bold text-xl">924</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                          PERFORMANCE
                        </h5>
                        <span className="font-bold text-xl">49,65%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  ) : (<div>Company not found!</div>)}
  </>
}

export default CompanyPage