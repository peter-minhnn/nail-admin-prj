import { FormattedMessage, useIntl } from 'react-intl'
import AdminPageContainer from '@/components/(admin)/layout/admin-page-container.tsx'
import { Main } from '@/components/(admin)/layout/main.tsx'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/(admin)/ui'
import ProductListComponent from '@/features/(admin)/products/components/product-list.tsx'
import ProductTypeList from '@/features/(admin)/products/components/product-type/product-type-list.tsx'

export default function ProductComponent() {
  const intl = useIntl()

  return (
    <Main>
      <AdminPageContainer
        title={intl.formatMessage({ id: 'products.headerTitle' })}
      >
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              <FormattedMessage id='products.headerTitle' />
            </h2>
            <p className='text-muted-foreground'>
              <FormattedMessage id='products.headerDescription' />
            </p>
          </div>
        </div>
        <Tabs defaultValue='list' className='w-auto'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='list'>
              <FormattedMessage id='products.headerProductList' />
            </TabsTrigger>
            <TabsTrigger value='productType'>
              <FormattedMessage id='products.headerProductTypeList' />
            </TabsTrigger>
          </TabsList>
          <TabsContent value='list'>
            <ProductListComponent />
          </TabsContent>
          <TabsContent value='productType'>
            <ProductTypeList />
          </TabsContent>
        </Tabs>
      </AdminPageContainer>
    </Main>
  )
}
