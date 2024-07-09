import React from 'react'
import Table from '../../Components/Table/Table'
import RatioList from '../../Components/RatioList/RatioList'
import { TestDataCompany } from '../../Components/Table/testData'

type Props = {}

const data = TestDataCompany;

const tableConfig = [
  {
    label: "Market Cap",
    render: (company: any) => company.marketCapTTM,
    subTitle: "Total value of all a company's shares of stock"
  }
];
const DesignPage = (props: Props) => {
  return (
    <>
    <h1>
        Design guide- This is the design guide for Fin Shark. These are reuable
        components of the app with brief instructions on how to use them.
      </h1>
    <RatioList data={data} config={tableConfig}/>
    <Table data={data} config={tableConfig}/>
    <h3>
        Table - Table takes in a configuration object and company data as
        params. Use the config to style your table.
      </h3>
    </>
  )
}

export default DesignPage