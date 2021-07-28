import { makeVar } from '@apollo/client'

export const favouriteVar = makeVar([])
export const createdQuizVar = makeVar({})
export const showPageVar = makeVar("createQuiz")
export const collectionVar = makeVar({})
export const questionVar = makeVar({})
export const loginVar = makeVar(false)
export const answerVar = makeVar('')