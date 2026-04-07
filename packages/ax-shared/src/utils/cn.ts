import classnames, { type ArgumentArray } from 'classnames'

/** Shorthand for classnames — merges class strings conditionally. */
export const cn: (...args: ArgumentArray) => string = classnames
