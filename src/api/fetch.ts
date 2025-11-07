import axios from 'axios'

export async function getCategories() {
  const res = await axios('https://opentdb.com/api.php?amount=10')
  return res.data.results
}

export async function getCategoryList() {
  const res = await axios('https://opentdb.com/api_category.php')
  return res.data.trivia_categories
}

export async function getCategoryID(id: number) {
  try {
    const res = await axios(
      `https://opentdb.com/api.php?amount=30&category=${id}`,
    )
    if (res.data.response_code !== 0) {
      throw new Error('Failed to fetch quiz questions')
    }
    return res.data.results
  } catch (error) {
    console.error('Error fetching category:', error)
    throw error
  }
}
