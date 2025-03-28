import React from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  IconArrowRightDashed,
  IconDeviceLaptop,
  IconMoon,
  IconSun,
} from '@tabler/icons-react'
import { sidebarData } from '@/entities/layout'
import { FormattedMessage, useIntl } from 'react-intl'
import { useSearch } from '@/hooks/use-search-context.tsx'
import { useTheme } from '@/hooks/use-theme-context.tsx'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/(admin)/ui/command.tsx'
import { ScrollArea } from './ui/scroll-area.tsx'

export function CommandMenu() {
  const navigate = useNavigate()
  const { setTheme } = useTheme()
  const { open, setOpen } = useSearch()
  const intl = useIntl()

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setOpen(false)
      command()
    },
    [setOpen]
  )

  return (
    <CommandDialog modal open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder={intl.formatMessage({
          id: 'common.commandMenuSearchPlaceholder',
        })}
      />
      <CommandList>
        <ScrollArea type='hover' className='h-72 pr-1'>
          <CommandEmpty>
            <FormattedMessage id='common.noResult' />
          </CommandEmpty>
          {sidebarData.navGroups.map((group) => (
            <CommandGroup
              key={group.title}
              heading={intl.formatMessage({ id: group.title })}
            >
              {group.items.map((navItem, i) => {
                if (navItem.url)
                  return (
                    <CommandItem
                      key={`${navItem.url}-${i}`}
                      value={navItem.title}
                      onSelect={() => {
                        runCommand(() => navigate({ to: navItem.url }))
                      }}
                    >
                      <div className='mr-2 flex h-4 w-4 items-center justify-center'>
                        <IconArrowRightDashed className='size-2 text-muted-foreground/80' />
                      </div>
                      <FormattedMessage id={navItem.title} />
                    </CommandItem>
                  )

                return navItem.items?.map((subItem, i) => (
                  <CommandItem
                    key={`${subItem.url}-${i}`}
                    value={subItem.title}
                    onSelect={() => {
                      runCommand(() => navigate({ to: subItem.url }))
                    }}
                  >
                    <div className='mr-2 flex h-4 w-4 items-center justify-center'>
                      <IconArrowRightDashed className='size-2 text-muted-foreground/80' />
                    </div>
                    <FormattedMessage id={subItem.title} />
                  </CommandItem>
                ))
              })}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading='Theme'>
            <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
              <IconSun />
              <span>
                <FormattedMessage id='common.light' />
              </span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
              <IconMoon className='scale-90' />
              <span>
                <FormattedMessage id='common.dark' />
              </span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
              <IconDeviceLaptop />
              <span>
                <FormattedMessage id='common.system' />
              </span>
            </CommandItem>
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  )
}
