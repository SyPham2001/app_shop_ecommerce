import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'

// component
import IconifyIcon from 'src/components/Icon'

// mui
import { Collapse, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import List from '@mui/material/List'

// layout
import { VerticalItems } from 'src/configs/layout'

type TProps = {
  open: boolean
}

type TListItems = {
  level: number
  openItems: {
    [key: string]: boolean
  }
  items: any
  setOpenItems: React.Dispatch<
    React.SetStateAction<{
      [key: string]: boolean
    }>
  >
  disabled: boolean
}

const RecursiveListItems: NextPage<TListItems> = ({ items, level, disabled }) => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({})

  const handleClick = (title: string) => {
    if (!disabled) {
      setOpenItems(prev => ({
        ...prev,
        [title]: !prev[title]
      }))
    }
  }

  return (
    <>
      {items?.map((item: any) => {
        return (
          <React.Fragment key={item.title}>
            <ListItemButton
              sx={{
                paddingLeft: `${level * 20}px`
              }}
              onClick={() => {
                if (item.childrens) {
                  handleClick(item.title)
                }
              }}
            >
              <ListItemIcon>
                <IconifyIcon icon={item.icon} />
              </ListItemIcon>

              {!disabled && <ListItemText primary={item?.title} />}
              {item?.childrens && item.childrens.length > 0 && (
                <>
                  {openItems[item.title] ? (
                    <IconifyIcon
                      icon='ic:twotone-expand-less'
                      style={{
                        transform: 'rotate(180deg)'
                      }}
                    />
                  ) : (
                    <IconifyIcon icon='ic:twotone-expand-less' />
                  )}
                </>
              )}
            </ListItemButton> 
            {item.childrens && item.childrens.length > 0 && (
              <>
                {item.childrens.map((child: any) => {
                  return (
                    <Collapse key={child.icon} in={openItems[item.title]} timeout='auto' unmountOnExit>
                      <RecursiveListItems
                        disabled={!open}
                        openItems={openItems}
                        setOpenItems={setOpenItems}
                        items={item.childrens}
                        level={level + 1}
                      />
                    </Collapse>
                  )
                })}
              </>
            )}
          </React.Fragment>
        )
      })}
    </>
  )
}
const ListVerticalLayout: NextPage<TProps> = ({ open }) => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({})
  useEffect(() => {
    if (!open) {
      setOpenItems({})
    }
  }, [open])

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component='nav'
      aria-labelledby='nested-list-subheader'
    >
      <RecursiveListItems
        items={VerticalItems}
        level={1}
        disabled={!open}
        openItems={openItems}
        setOpenItems={setOpenItems}
      />
    </List>
  )
}

export default ListVerticalLayout
