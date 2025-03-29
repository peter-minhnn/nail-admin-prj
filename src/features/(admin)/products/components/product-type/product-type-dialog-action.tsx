import { Dispatch, FC, SetStateAction, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { IconCancel, IconDeviceFloppy } from '@tabler/icons-react'
import { ProductType } from '@/types'
import { DialogType, ResultType } from '@/types/base.type.ts'
import { handleServerResponse } from '@/utils'
import { FormattedMessage, IntlShape } from 'react-intl'
import { toast } from 'sonner'
import { cn } from '@/lib/utils.ts'
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
  Switch,
  Textarea,
} from '@/components/(admin)/ui'
import {
  ProductTypeData,
  productTypeSchema,
} from '@/features/(admin)/products/data/schema.ts'
import {
  usePostProductType,
  usePutProductType,
} from '@/features/(admin)/products/hooks/use-queries.ts'

type CommonDialogsProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<DialogType>>
  title: string
  description?: string
  intl: IntlShape
}

type ProductTypeAddDialogsProps = {
  type: 'create'
  maxOrder: number
} & CommonDialogsProps

type ProductTypeEditDialogsProps = {
  type: 'update'
  currentRow: ProductTypeData | null
} & CommonDialogsProps

type ProductTypeDialogsProps =
  | ProductTypeAddDialogsProps
  | ProductTypeEditDialogsProps

const defaultValues: ProductTypeData = {
  nameEn: '',
  nameVi: '',
  descEn: '',
  descVi: '',
  id: 0,
}

export const ProductTypeDetailDialog: FC<ProductTypeDialogsProps> = (props) => {
  const queryClient = useQueryClient()
  const isEdit = props.type === 'update' && !!props.currentRow

  const form = useForm<ProductTypeData>({
    resolver: zodResolver(productTypeSchema),
    defaultValues: isEdit
      ? {
          ...props.currentRow,
        }
      : defaultValues,
  })

  const [showContentEn, setShowContentEn] = useState<boolean>(false)

  const onSuccess = async (response: ResultType) => {
    handleServerResponse(response)
    if (response.type === 'success') {
      await queryClient.invalidateQueries({ queryKey: ['product-types'] })
      props.setOpen('')
    }
  }

  const onError = (error: Error) => {
    console.log(error.message)
    toast.error('common.messages.errorOccurred')
  }

  const { mutateAsync, status } = usePostProductType({ onSuccess, onError })
  const { mutateAsync: updateMutateAsync, status: updateStatus } =
    usePutProductType({
      onSuccess,
      onError,
    })

  const loading = useMemo(
    () => status === 'pending' || updateStatus === 'pending',
    [status, updateStatus]
  )

  const onSubmit = async (data: ProductTypeData) => {
    const objData: ProductType = {
      nameVi: String(data.nameVi),
      nameEn: String(data.nameEn),
      descVi: String(data.descVi),
      descEn: String(data.descEn),
    }

    if (!isEdit) {
      await mutateAsync(objData)
    } else {
      await updateMutateAsync({ ...objData, id: data.id })
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
        <ScrollArea className='-mr-4 h-[20.25rem] w-full py-1 pr-4'>
          <Form {...form}>
            <form
              id='albums-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col gap-2 space-y-4 p-0.5'
            >
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
                    name='nameVi'
                    render={({ field }) => (
                      <FormItem
                        className={cn('flex flex-col', {
                          'w-full': !showContentEn,
                        })}
                      >
                        <FormLabel required>
                          <FormattedMessage id='products.nameVi' />
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={props.intl.formatMessage({
                              id: 'products.nameViPlaceholder',
                            })}
                            className='w-full'
                            autoComplete='off'
                            hasError={!!form.formState.errors?.nameVi?.message}
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
                    name='descVi'
                    render={({ field }) => (
                      <FormItem
                        className={cn('flex flex-col', {
                          'w-full': !showContentEn,
                        })}
                      >
                        <FormLabel required>
                          <FormattedMessage id='products.descVi' />
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder={props.intl.formatMessage({
                              id: 'products.descViPlaceholder',
                            })}
                            rows={5}
                            hasError={!!form.formState.errors?.descVi?.message}
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
                    name='nameEn'
                    render={({ field }) => (
                      <FormItem className='flex w-full flex-col'>
                        <FormLabel>
                          <FormattedMessage id='products.nameEn' />
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={props.intl.formatMessage({
                              id: 'products.nameEnPlaceholder',
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
                    name='descEn'
                    render={({ field }) => (
                      <FormItem className='flex w-full flex-col'>
                        <FormLabel>
                          <FormattedMessage id='products.descEn' />
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder={props.intl.formatMessage({
                              id: 'products.descEnPlaceholder',
                            })}
                            rows={5}
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
        <DialogFooter>
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
