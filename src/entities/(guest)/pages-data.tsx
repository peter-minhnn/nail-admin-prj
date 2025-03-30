import AboutUsComponent from '@/features/(guest)/about'
import ActivitiesComponent from '@/features/(guest)/activity'
import ContactComponent from '@/features/(guest)/contact'
import ProductsComponent from '@/features/(guest)/products'
import ServicesComponent from '@/features/(guest)/services'
import TrainingComponent from '@/features/(guest)/training'
import PostDetailComponent from '@/features/(guest)/post-detail'
import ProductDetailComponent from '@/features/(guest)/product-detail'

export const pageComponents = {
  've-chung-toi': <AboutUsComponent />,
  'dich-vu': <ServicesComponent />,
  'dao-tao': <TrainingComponent />,
  'san-pham': <ProductsComponent />,
  'lien-he': <ContactComponent />,
  'hoat-dong': <ActivitiesComponent />,
  'post': <PostDetailComponent />,
  'product': <ProductDetailComponent />
}
