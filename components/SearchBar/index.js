import { useState, useMemo } from 'react'
import styles from './index.module.css'
import { Search } from '../Icons'
import { debounce } from './utils'
import axiosClient from '../../config/axiosClient'

const SEARCH_AFTER_500_MS = 500

export default function SearchBar() {
  const debounced = useMemo(() => debounce(handleSearch, SEARCH_AFTER_500_MS), [])
  const [search, setSearch] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])
  const [isFocused, setIsFocused] = useState(false)

  function handleSearch({ value }) {
    const ALL = '*'

    axiosClient('/users').then(data => {
      const { users } = data.data

      const filteredUsers = users.filter(user => {
        const { firstName, lastName } = user
        if (value === ALL) {
          return true
        }

        return (
          firstName.toLowerCase().includes(value.toLowerCase()) ||
          lastName.toLowerCase().includes(value.toLowerCase()) ||
          `${firstName} ${lastName}`.toLowerCase().includes(value.toLowerCase())
        )
      })

      if (users.length === filteredUsers.length && value !== ALL) {
        setFilteredUsers([])
      } else {
        setFilteredUsers(filteredUsers)
      }
    })
  }

  const handleInputChange = ({ target: { value } }) => {
    const parsedValue = value.trim()

    setSearch(value)
    if (parsedValue === '' && filteredUsers.length === 0) return
    debounced({ value: parsedValue })
  }

  function handleBlur() {
    setIsFocused(false)
  }

  function handleFocus() {
    setIsFocused(true)
  }

  return (
    <div style={{ position: 'relative' }}>
      <div className={styles.inputContainer}>
        <label className={styles.searchIconLabel} htmlFor="search">
          <Search />
        </label>
        <input
          onChange={handleInputChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={styles.input}
          value={search}
          id="search"
          placeholder="User search"
        />
      </div>
      {filteredUsers.length > 0 && isFocused && (
        <ul className={styles.resultsList}>
          {filteredUsers.map(({ firstName, lastName, _id }, index) => (
            <li className={styles.listItem} key={_id}>
              <span className={styles.userIndex}>{index + 1}</span> {firstName} {lastName}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
