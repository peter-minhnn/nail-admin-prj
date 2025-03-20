import AboutUsComponent from '@/features/(guest)/about'
import ContactComponent from '@/features/(guest)/contact'
import ProductsComponent from '@/features/(guest)/products'
import ServicesComponent from '@/features/(guest)/services'
import TrainingComponent from '@/features/(guest)/training'

export const pageComponents = {
  've-chung-toi': <AboutUsComponent />,
  'dich-vu': <ServicesComponent />,
  'dao-tao': <TrainingComponent />,
  'san-pham': <ProductsComponent />,
  'lien-he': <ContactComponent />
}