import { readStorage, writeStorage } from './storageService.js'

const ENROLLMENTS_STORAGE_KEY = 'coursePlatform.enrollments'
const STORAGE_VERSION = 1

function createEmptyStore() {
  return { version: STORAGE_VERSION, users: {} }
}

function readStore() {
  const storedValue = readStorage(ENROLLMENTS_STORAGE_KEY, null)
  if (storedValue?.version !== STORAGE_VERSION || !storedValue.users) {
    return createEmptyStore()
  }
  return storedValue
}

export function getStoredEnrollments(userKey) {
  const enrollments = readStore().users[userKey]
  return Array.isArray(enrollments) ? enrollments : []
}

export function saveStoredEnrollments(userKey, enrollments) {
  const store = readStore()
  store.users[userKey] = enrollments
  writeStorage(ENROLLMENTS_STORAGE_KEY, store)
  return enrollments
}
