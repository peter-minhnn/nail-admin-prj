import { useEffect, useState } from 'react'
import { GuestProductTypeType } from '@/types/(guest)'
import get from 'lodash/get'
import { useGetProductTypes } from '../../../../hooks/use-guest-queries.ts'
import ProductSlider from './product-slider'

export default function ProductSection() {
  const [productTypes, setProductTypes] = useState<GuestProductTypeType[]>([])

  const { data, status, isRefetching } = useGetProductTypes()
  const [loadedCounts, setLoadedCounts] = useState<{ [key: string]: number }>(
    {}
  )
  const allLoaded =
    productTypes.length > 0 &&
    Object.keys(loadedCounts).length === productTypes.length
  const allEmpty =
    allLoaded && Object.values(loadedCounts).every((e) => e === 0)

  useEffect(() => {
    if (status === 'pending' || isRefetching) return
    const productTypes: GuestProductTypeType[] = get(data, ['data'], [])
    setProductTypes(productTypes)
  }, [data, status, isRefetching])

  const handleDataLoaded = (typeId: number, count: number) => {
    setLoadedCounts((prev) => ({ ...prev, [typeId]: count }))
  }

  if (allLoaded && allEmpty) {
    return (
      <div className='flex min-h-screen items-center justify-center text-center text-lg font-semibold'>
        DJV sẽ sớm cập nhật sản phẩm chất lượng - giá cả hợp lý đến khách hàng
      </div>
    )
  }

  return (
    <>
      {(productTypes ?? []).map((item, index) => {
        const isRightSide = index % 2 == 0
        return (
          <ProductSlider
            leftSide={isRightSide}
            item={item}
            key={item.id}
            onDataLoaded={handleDataLoaded}
          />
        )
      })}
    </>
  )
}
