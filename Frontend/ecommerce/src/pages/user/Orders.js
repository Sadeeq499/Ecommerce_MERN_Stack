import React from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'

function Orders() {
  return (

    <>
    <Layout>
    <div className="container-fluid grid grid-cols-12">
    <div className="col-span-2">
      <UserMenu />
    </div>
    <div className="col-span-10 ">
      <h1>Orders</h1>
    </div>
  </div>
  </Layout>
    </>

  )

}

export default Orders
