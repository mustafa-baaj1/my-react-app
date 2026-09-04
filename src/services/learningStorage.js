import { readStorage, writeStorage } from './storageService.js'

const LEARNING_STORAGE_KEY = 'coursePlatform.learningProgress'
const STORAGE_VERSION = 1

function createEmptyStore() {
  return { version: STORAGE_VERSION, users: {} }
}

function readStore() {
  const storedValue = readStorage(LEARNING_STORAGE_KEY, null)
  return storedValue?.version === STORAGE_VERSION && storedValue.users
    ? storedValue
    : createEmptyStore()
}

export function getStoredCourseProgress(userKey, courseId) {
  return readStore().users[userKey]?.[courseId] ?? null
}

export function saveStoredCourseProgress(userKey, courseId, progress) {
  const store = readStore()
  store.users[userKey] = { ...store.users[userKey], [courseId]: progress }
  writeStorage(LEARNING_STORAGE_KEY, store)
  return progress
}
