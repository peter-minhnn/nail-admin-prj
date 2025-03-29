import { GuestProductTypeType, GuestProductTypeListSchema } from "@/entities/(guest)/product"
import { useEffect, useState } from "react"
import { useGetProductTypes } from "../../hook/use-guest-queries"
import get from "lodash/get";
import ProductSlider from "./product-slider";

export default function () {

    const [productTypes, setProductTypes] = useState<GuestProductTypeType[]>([])

    const { data, status, isRefetching } = useGetProductTypes();

    useEffect(() => {
        if (status === 'pending' || isRefetching) return
        const list = get(data, ['data'], [])
        const productTypes = GuestProductTypeListSchema.parse(list);
        setProductTypes(productTypes);
    }, [data, status, isRefetching])

    return (<div>
        {((productTypes ?? []).map((item, index) => {
            const isRightSide = index % 2 == 0;
            return (<ProductSlider
                leftSide={!isRightSide}
                item={item}
            />)
        }))}
    </div>);
}