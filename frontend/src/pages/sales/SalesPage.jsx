import React from 'react'
import SalesTable from '../../components/sales/sales/SalesTable'
import { getCurrentUser } from '../../store/hooks/useUser';
import AuthControl from '../../components/layout/AuthControl'

const SalesPage = () => {
  const user = getCurrentUser();
    if(!user){
      return(
        <AuthControl
          message="로그인 후 판매 정보 조회 가능합니다."
        />
      )
    }
  return (
    <div>
      <SalesTable/>
    </div>
  )
}

export default SalesPage
