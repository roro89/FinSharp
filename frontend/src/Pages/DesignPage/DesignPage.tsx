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
    <h1>FinShark design page</h1>
    <h2>This is FinShark's design page. This is where we will house various design aspects of the app.</h2>
    <RatioList data={data} config={tableConfig}/>
    <Table/>
    </>
  )
}

export default DesignPage