'use client'
import React from 'react'
import { Provider } from 'react-redux'
import { makeStore } from '@/store/store'
function ComponentProvider({children}:any) {
    const store = makeStore()
  return (
    <Provider store={store}>{children}</Provider>
  )
}

export default ComponentProvider