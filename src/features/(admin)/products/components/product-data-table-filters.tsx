import * as React from 'react'
import { Dispatch, SetStateAction } from 'react'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { Column } from '@tanstack/react-table'
import { ProductFilterParams } from '@/types'
import { FormattedMessage, useIntl } from 'react-intl'
import { Badge } from '@/components/(admin)/ui/badge.tsx'
import { Button } from '@/components/(admin)/ui/button.tsx'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/(admin)/ui/command.tsx'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/(admin)/ui/popover.tsx'
import { Separator } from '@/components/(admin)/ui/separator.tsx'

interface ProductDataTableFiltersProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
  isStatic?: boolean
  setFilterParams: Dispatch<SetStateAction<ProductFilterParams>>
}

export function ProductDataTableFilters<TData, TValue>({
  column,
  title,
  options,
  isStatic = true,
  setFilterParams,
}: Readonly<ProductDataTableFiltersProps<TData, TValue>>) {
  const selectedValues = new Set(column?.getFilterValue() as string)
  const intl = useIntl()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='h-8 border-dashed'>
          <PlusCircledIcon className='mr-2 h-4 w-4' />
          <FormattedMessage id={title} />
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation='vertical' className='mx-2 h-4' />
              <Badge
                variant='secondary'
                className='rounded-sm px-1 font-normal lg:hidden'
              >
                {selectedValues.size}
              </Badge>
              <div className='hidden space-x-1 lg:flex'>
                {selectedValues.size > 2 ? (
                  <Badge
                    variant='secondary'
                    className='rounded-sm px-1 font-normal'
                  >
                    {selectedValues.size}{' '}
                    <FormattedMessage id='common.selected' />
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant='secondary'
                        key={option.value}
                        className='rounded-sm px-1 font-normal'
                      >
                        {isStatic ? (
                          <FormattedMessage id={option.label} />
                        ) : (
                          option.label
                        )}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0' align='start'>
        <Command>
          <CommandInput placeholder={intl.formatMessage({ id: title })} />
          <CommandList>
            <CommandEmpty>
              <FormattedMessage id='common.noResult' />
            </CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value)
                      } else {
                        if (selectedValues.size > 0) return
                        selectedValues.add(option.value)
                        setFilterParams((prev) => ({
                          ...prev,
                          productType: Number(option.value),
                        }))
                      }
                      const filterValues = Array.from(selectedValues)
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      )
                    }}
                  >
                    <span>
                      {isStatic ? (
                        <FormattedMessage id={option.label} />
                      ) : (
                        option.label
                      )}
                    </span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      column?.setFilterValue(undefined)
                      setFilterParams((prev) => ({
                        ...prev,
                        productType: undefined,
                        content: '',
                      }))
                    }}
                    className='justify-center text-center'
                  >
                    <FormattedMessage id='common.clearFilters' />
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
