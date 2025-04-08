import { Dispatch, FC, SetStateAction, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { IconCancel, IconDeviceFloppy } from '@tabler/icons-react'
import { DialogType, ResultType } from '@/types/base.type.ts'
import { handleServerResponse } from '@/utils'
import { FormattedMessage, IntlShape } from 'react-intl'
import { toast } from 'sonner'
import { cn } from '@/lib/utils.ts'
import { updateSpanBackgrounds } from '@/utils/common.ts'
import { NumberInput } from '@/components/(admin)/number-input.tsx'
import QuillEditor from '@/components/(admin)/quill-editor.tsx'
import { SelectDropdown } from '@/components/(admin)/select-dropdown.tsx'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  ScrollArea,
  Separator,
  Switch,
  Textarea,
} from '@/components/(admin)/ui'
import FileUpload from '@/components/(admin)/upload.tsx'
import {
  ProductData,
  productSchema,
} from '@/features/(admin)/products/data/schema.ts'
import {
  usePostProduct,
  usePutProduct,
} from '@/features/(admin)/products/hooks/use-queries.ts'

type CommonDialogsProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<DialogType>>
  title: string
  description?: string
  intl: IntlShape
  productTypeOptions: { label: string; value: string }[]
}

type ProductAddDialogsProps = {
  type: 'create'
  maxOrder: number
} & CommonDialogsProps

type ProductEditDialogsProps = {
  type: 'update'
  currentRow: ProductData | null
} & CommonDialogsProps

type ProductDialogsProps = ProductAddDialogsProps | ProductEditDialogsProps

const defaultValues: ProductData = {
  thumbnail: '',
  productNameVi: '',
  productNameEn: '',
  descriptionVi: '',
  descriptionEn: '',
  productType: 0,
  price: 0,
  contentVi: '',
  contentEn: '',
  sortOrder: 1,
  id: 0,
}

export const ProductDetailDialog: FC<ProductDialogsProps> = (props) => {
  const queryClient = useQueryClient()
  const isEdit = props.type === 'update' && !!props.currentRow

  const form = useForm<ProductData>({
    resolver: zodResolver(productSchema),
    defaultValues: isEdit
      ? {
          ...props.currentRow,
        }
      : {
          ...defaultValues,
          productType: props.productTypeOptions.length
            ? Number(props.productTypeOptions[0].value)
            : 0,
          sortOrder: props.type === 'create' ? props.maxOrder + 1 : 0,
        },
  })
  const [thumbnailFiles, setThumbnailFiles] = useState<File[]>([])
  const [showContentEn, setShowContentEn] = useState<boolean>(false)

  const onSuccess = async (response: ResultType) => {
    handleServerResponse(response)
    if (response.type === 'success') {
      await queryClient.invalidateQueries({ queryKey: ['products'] })
      props.setOpen('')
    }
  }

  const onError = (error: Error) => {
    console.log(error.message)
    toast.error('common.messages.errorOccurred')
  }

  const { mutateAsync, status } = usePostProduct({ onSuccess, onError })
  const { mutateAsync: updateMutateAsync, status: updateStatus } =
    usePutProduct({
      onSuccess,
      onError,
    })

  const loading = useMemo(
    () => status === 'pending' || updateStatus === 'pending',
    [status, updateStatus]
  )

  const validate = () => {
    let check = true
    if (!thumbnailFiles.length && !isEdit) {
      toast.error(
        props.intl.formatMessage({ id: 'products.errors.thumbnailRequired' })
      )
      check = false
    }
    return check
  }

  const onSubmit = async (data: ProductData) => {
    if (!validate()) return
    if (!isEdit) {
      await mutateAsync({
        ...data,
        thumbnail: thumbnailFiles[0],
        price: Number(data.price),
        contentVi: updateSpanBackgrounds(data.contentVi),
        contentEn: updateSpanBackgrounds(data.contentEn),
      })
    } else {
      await updateMutateAsync({
        ...data,
        thumbnail: thumbnailFiles.length ? thumbnailFiles[0] : data.thumbnail,
        price: Number(data.price),
        contentVi: updateSpanBackgrounds(data.contentVi),
        contentEn: updateSpanBackgrounds(data.contentEn),
      })
    }
  }

  return (
    <Dialog
      open={props.open}
      onOpenChange={() => {
        props.setOpen('')
        form.reset()
      }}
    >
      <DialogContent className='max-w-7xl'>
        <DialogHeader className='text-left'>
          <DialogTitle>
            <FormattedMessage id={props.title} />
          </DialogTitle>
          <DialogDescription>
            {props.description && <FormattedMessage id={props.description} />}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='-mr-4 h-[35.25rem] w-full py-1 pr-4'>
          <Form {...form}>
            <form
              id='albums-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col gap-2 space-y-4 p-0.5'
            >
              <div className='flex flex-col gap-4 md:flex-row md:justify-between'>
                <FormField
                  control={form.control}
                  name='thumbnail'
                  render={() => (
                    <FormItem className='w-full'>
                      <FormLabel required={!isEdit}>
                        <FormattedMessage id='products.thumbnail' />
                      </FormLabel>
                      <FormControl>
                        <FileUpload
                          files={thumbnailFiles}
                          onValueChange={(files) =>
                            setThumbnailFiles(files ?? [])
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <NumberInput
                  form={form}
                  name='price'
                  label={props.intl.formatMessage({ id: 'products.price' })}
                  placeholder={props.intl.formatMessage({
                    id: 'products.pricePlaceholder',
                  })}
                />
                <div className='flex w-full flex-col gap-2'>
                  <FormField
                    control={form.control}
                    name='productType'
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel required>
                          <FormattedMessage id='products.productType' />
                        </FormLabel>
                        <SelectDropdown
                          defaultValue={String(field.value)}
                          items={props.productTypeOptions}
                          onValueChange={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <NumberInput
                    form={form}
                    name='sortOrder'
                    label={props.intl.formatMessage({
                      id: 'products.sortOrder',
                    })}
                    placeholder={props.intl.formatMessage({
                      id: 'products.sortOrderPlaceholder',
                    })}
                  />
                </div>
              </div>
              <Separator />
              <div className='flex flex-row items-center gap-2'>
                <Switch
                  checked={showContentEn}
                  onCheckedChange={(value) => setShowContentEn(value)}
                />
                <Label
                  onClick={() => setShowContentEn(!showContentEn)}
                  className='cursor-pointer'
                >
                  <FormattedMessage
                    id={
                      showContentEn
                        ? 'products.showContentEn'
                        : 'products.hideContentEn'
                    }
                  />
                </Label>
              </div>
              <div className='flex flex-col gap-3 md:flex-row md:justify-between'>
                <div
                  className={cn('flex w-1/2 flex-col gap-4', {
                    'w-full': !showContentEn,
                  })}
                >
                  <FormField
                    control={form.control}
                    name='productNameVi'
                    render={({ field }) => (
                      <FormItem className='flex w-full flex-col'>
                        <FormLabel required>
                          <FormattedMessage id='products.productNameVi' />
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={props.intl.formatMessage({
                              id: 'products.productNameViPlaceholder',
                            })}
                            className='w-full'
                            autoComplete='off'
                            hasError={
                              !!form.formState.errors?.productNameVi?.message
                            }
                            autoFocus
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='descriptionVi'
                    render={({ field }) => (
                      <FormItem className='flex w-full flex-col'>
                        <FormLabel required>
                          <FormattedMessage id='products.descriptionVi' />
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={props.intl.formatMessage({
                              id: 'products.descriptionViPlaceholder',
                            })}
                            className='w-full'
                            autoComplete='off'
                            rows={5}
                            hasError={
                              !!form.formState.errors?.descriptionVi?.message
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='contentVi'
                    render={({ field }) => (
                      <FormItem className='flex w-full flex-col'>
                        <FormLabel required>
                          <FormattedMessage id='products.contentVi' />
                        </FormLabel>
                        <FormControl>
                          <QuillEditor
                            onChange={field.onChange}
                            value={field.value}
                            placeholder={props.intl.formatMessage({
                              id: 'products.contentViPlaceholder',
                            })}
                            hasError={
                              !!form.formState.errors?.contentVi?.message
                            }
                            helperText={
                              form.formState.errors?.contentVi?.message
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div
                  className={cn(
                    'mt-20 flex w-1/2 flex-col items-center gap-4 md:mt-0',
                    { hidden: !showContentEn }
                  )}
                >
                  <FormField
                    control={form.control}
                    name='productNameEn'
                    render={({ field }) => (
                      <FormItem className='flex w-full flex-col'>
                        <FormLabel>
                          <FormattedMessage id='products.productNameEn' />
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={props.intl.formatMessage({
                              id: 'products.productNameEnPlaceholder',
                            })}
                            className='w-full'
                            autoComplete='off'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='descriptionEn'
                    render={({ field }) => (
                      <FormItem className='flex w-full flex-col'>
                        <FormLabel required>
                          <FormattedMessage id='products.descriptionEn' />
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={props.intl.formatMessage({
                              id: 'products.descriptionEnPlaceholder',
                            })}
                            className='w-full'
                            autoComplete='off'
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='contentEn'
                    render={({ field }) => (
                      <FormItem className='flex flex-col'>
                        <FormLabel>
                          <FormattedMessage id='products.contentEn' />
                        </FormLabel>
                        <FormControl>
                          <QuillEditor
                            onChange={field.onChange}
                            value={field.value}
                            placeholder={props.intl.formatMessage({
                              id: 'products.contentEnPlaceholder',
                            })}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter className='gap-2'>
          <Button
            type='button'
            variant='outline'
            onClick={() => props.setOpen('')}
            disabled={loading}
            loading={loading}
          >
            <IconCancel size={18} />
            <FormattedMessage id='common.btnCancel' />
          </Button>
          <Button
            type='submit'
            form='albums-form'
            variant='save'
            disabled={loading}
            loading={loading}
          >
            <IconDeviceFloppy size={18} />
            <FormattedMessage id='common.btnSaveChanges' />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
