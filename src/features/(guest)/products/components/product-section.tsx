import { useEffect, useState } from 'react'
import {
  GuestProductTypeType,
} from '@/entities/(guest)/product'
import get from 'lodash/get'
import { useGetProductTypes } from '../../hook/use-guest-queries'
import ProductSlider from './product-slider'

export default function ProductSection() {
  const [productTypes, setProductTypes] = useState<GuestProductTypeType[]>([])

  const { data, status, isRefetching } = useGetProductTypes()

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const list = get(data, ['data'], [])
    const productTypes: GuestProductTypeType[] = list;
    setProductTypes(productTypes)
  }, [data, status, isRefetching])

  return (
    <>
      {(productTypes ?? []).map((item, index) => {
        const isRightSide = index % 2 == 0
        return <ProductSlider leftSide={!isRightSide} item={item} />
      })}
    </>
  )
}
