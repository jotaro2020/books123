/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import Tooltip from '@reach/tooltip'
import {FaSearch, FaTimes} from 'react-icons/fa'
import * as colors from 'styles/colors'
import {useBookSearch, useRefetchBookSearchQuery} from 'utils/books'
import {BookRow} from 'components/book-row'
import {BookListUL, Spinner, Input} from 'components/lib'

function DiscoverBooksScreen() {
  const [query, setQuery] = React.useState('')
  const [queried, setQueried] = React.useState()
  const {books, error, isLoading, isError, isSuccess} = useBookSearch(query)
  const refetchBookSearchQuery = useRefetchBookSearchQuery()

  React.useEffect(() => {
    return () => refetchBookSearchQuery()
  }, [refetchBookSearchQuery])

  function handleSearchClick(event) {
    event.preventDefault()
    setQueried(true)
    setQuery(event.target.elements.search.value)
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSearchClick}>
          <Input
            placeholder="Search books..."
            id="search"
            type="search"
            css={{width: '100%'}}
          />
          <Tooltip label="Search Books">
            <label htmlFor="search">
              <button
                type="submit"
                css={{
                  border: '0',
                  position: 'relative',
                  marginLeft: '-35px',
                  background: 'transparent',
                }}
              >
                {isLoading ? (
                  <Spinner />
                ) : isError ? (
                  <FaTimes aria-label="error" css={{color: colors.danger}} />
                ) : (
                  <FaSearch aria-label="search" />
                )}
              </button>
            </label>
          </Tooltip>
        </form>

        {isError ? (
          <div css={{color: colors.danger}}>
            <p>There was an error:</p>
            <pre>{error.message}</pre>
          </div>
        ) : null}
      </div>
      <div>
        {queried ? null : (
          <div css={{marginTop: 20, fontSize: '1.2em', textAlign: 'center'}}>
            {isLoading ? (
              <div css={{width: '100%', margin: 'auto'}}>
                <Spinner />
              </div>
            ) : isSuccess && books.length ? (
              <p>Добро пожаловать в наш скромный книжный уголок</p>
            ) : isSuccess && !books.length ? (
              <p>Упс, произошла странная ошибка, приносим свои извинения!</p>
            ) : null}
          </div>
        )}
        {books.length ? (
          <BookListUL css={{marginTop: 20}}>
            {books.map(book => (
              <li key={book.id} aria-label={book.title}>
                <BookRow key={book.id} book={book} />
              </li>
            ))}
          </BookListUL>
        ) : queried ? (
          <div css={{marginTop: 20, fontSize: '1.2em', textAlign: 'center'}}>
            {isLoading ? (
              <div css={{width: '100%', margin: 'auto'}}>
                <Spinner />
              </div>
            ) : (
              <p>
                Мне не удалось найти "{query}." Пожалуйста, попробуйте
                что-нибудь еще.
              </p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export {DiscoverBooksScreen}
