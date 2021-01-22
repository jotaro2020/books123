import * as React from 'react'
import {Link} from 'components/lib'
import {ListItemList} from 'components/list-item-list'

function CartScreen() {
  return (
    <ListItemList
      filterListItems={li => !li.finishDate}
      noFilteredListItems={
        <p>
          Карзина пуста
        </p>
      }
    />
  )
}

export {CartScreen}
