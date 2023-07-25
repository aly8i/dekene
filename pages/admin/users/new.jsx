import React from 'react';
import dynamic from 'next/dynamic';
const NewUser = dynamic(
  () => import("../../../components/admin/NewUser"),
  {ssr: false}
)
function newuser() {
  return (
    <NewUser />
  )
}

export default newuser