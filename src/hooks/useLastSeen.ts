import { useCallback, useEffect, useState } from 'react'

// Define an interface for items that must have an id
interface WithId {
  id: number | string
}

export default function useLastSeen<T extends WithId>() {
  const STORAGE_KEY = 'LastSeenItems'
  const [lastSeen, setLastSeen] = useState<Array<T>>([])

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      setLastSeen(JSON.parse(saved))
    }
  }, [])

  const saveToStorage = (items: Array<T>) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    setLastSeen(items)
  }

  const add = useCallback(
    (item: T) => {
      if (!lastSeen.some((existing) => existing.id === item.id)) {
        saveToStorage([...lastSeen, item])
      }
    },
    [lastSeen],
  )

  return {
    lastSeen,
    add,
  }
}
