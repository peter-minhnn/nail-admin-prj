import AboutUsComponent from '@/features/(guest)/about'
import ActivitiesComponent from '@/features/(guest)/activity'
import AlbumComponent from '@/features/(guest)/albums'
import ContactComponent from '@/features/(guest)/contact'
import GuestNotFound from '@/features/(guest)/errors/not-found'
import PostDetailComponent from '@/features/(guest)/post-detail'
import ProductDetailComponent from '@/features/(guest)/product-detail'
import ProductsComponent from '@/features/(guest)/products'
import ServicesComponent from '@/features/(guest)/services'
import TrainingComponent from '@/features/(guest)/training'

export const pageComponents = (pageId: string) =>
  ({
    've-chung-toi': <AboutUsComponent />,
    'dich-vu': <ServicesComponent />,
    'dao-tao': <TrainingComponent />,
    'san-pham': <ProductsComponent />,
    'lien-he': <ContactComponent />,
    'hoat-dong': <ActivitiesComponent />,
    'bo-suu-tap': <AlbumComponent />,
  })[pageId] ?? <GuestNotFound />

export const pageDetailComponents = (pageId: string, id: string) =>
  ({
    'san-pham': <ProductDetailComponent id={Number(id)} />,
    'bai-viet': <PostDetailComponent id={Number(id)} />,
  })[pageId] ?? <GuestNotFound />
